from fastapi import APIRouter, HTTPException, status, Depends, Body
from models.user import UserCreate, UserLogin, UserResponse, UserInDB, ChangePassword, ForgotPassword
from models.kyc import KYCStatus
from config.database import get_database
from config.settings import get_settings
from utils.security import hash_password, verify_password, access_security, refresh_security
from utils.logging import init_logger
from datetime import datetime, timedelta
from pymongo.collection import Collection
import uuid
import secrets

router = APIRouter(prefix="/auth", tags=["Authentication"])
logger = init_logger()

@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(user: UserCreate, db=Depends(get_database)):
    users_collection: Collection = db["users"]
    
    # Check if user already exists
    existing_user = await users_collection.find_one({"email": user.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Hash password
    hashed_password = hash_password(user.password)
    if not hashed_password:
        raise HTTPException(status_code=500, detail="Error hashing password")
    
    # Create user document
    user_dict = user.model_dump()
    del user_dict["password"]
    user_dict["uid"] = str(uuid.uuid4())
    user_dict["password_hash"] = hashed_password
    user_dict["kyc_status"] = KYCStatus.NOT_STARTED
    user_dict["selected_service"] = "none"
    user_dict["services"] = {
        "affidavit": {
            "status": "not_applied",
            "payment_status": "pending",
            "uploaded_documents": []
        },
        "trust": {
            "status": "not_applied",
            "payment_status": "pending",
            "uploaded_documents": []
        }
    }
    user_dict["created_at"] = datetime.utcnow()
    user_dict["updated_at"] = datetime.utcnow()
    user_dict["is_active"] = True
    
    await users_collection.insert_one(user_dict)
    if "_id" in user_dict:
        del user_dict["_id"]
        
    return user_dict

@router.post("/login")
async def login(user_credentials: UserLogin, db=Depends(get_database)):
    users_collection: Collection = db["users"]
    
    user = await users_collection.find_one({"email": user_credentials.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    if not verify_password(user_credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    subject = {"id": user["uid"], "email": user["email"]}
    access_token = access_security.create_access_token(subject=subject)
    refresh_token = refresh_security.create_refresh_token(subject=subject)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
        "user": {
            "uid": user["uid"],
            "email": user["email"],
            "firstName": user.get("first_name"),
            "lastName": user.get("last_name"),
            "kycStatus": user.get("kyc_status", "not_started"),
            "selectedService": user.get("selected_service", "none"),
            "services": user.get("services", {
                "affidavit": {"status": "not_applied", "payment_status": "pending", "uploaded_documents": []},
                "trust": {"status": "not_applied", "payment_status": "pending", "uploaded_documents": []}
            }),
            "createdAt": user.get("created_at"),
            "isActive": user.get("is_active", True)
        }
    }

@router.get("/me")
async def get_current_user(token: dict = Depends(access_security), db=Depends(get_database)):
    users_collection: Collection = db["users"]
    user_uid = token["id"]
    
    user = await users_collection.find_one({"uid": user_uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    return {
        "uid": user["uid"],
        "email": user["email"],
        "firstName": user.get("first_name"),
        "lastName": user.get("last_name"),
        "kycStatus": user.get("kyc_status", "not_started"),
        "selectedService": user.get("selected_service", "none"),
        "services": user.get("services", {
            "affidavit": {"status": "not_applied", "payment_status": "pending", "uploaded_documents": []},
            "trust": {"status": "not_applied", "payment_status": "pending", "uploaded_documents": []}
        }),
        "createdAt": user.get("created_at"),
        "isActive": user.get("is_active", True),
        "rejectionReason": user.get("rejection_reason")
    }

@router.post("/change-password")
async def change_password(
    password_data: ChangePassword, 
    token: dict = Depends(access_security),
    db=Depends(get_database)
):
    users_collection: Collection = db["users"]
    user_uid = token["id"] # This is now the uid
    
    user = await users_collection.find_one({"uid": user_uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if not verify_password(password_data.old_password, user["password_hash"]):
        raise HTTPException(status_code=400, detail="Invalid old password")
        
    new_password_hash = hash_password(password_data.new_password)
    if not new_password_hash:
        raise HTTPException(status_code=500, detail="Error hashing password")
    
    await users_collection.update_one(
        {"uid": user_uid},
        {"$set": {"password_hash": new_password_hash, "updated_at": datetime.utcnow()}}
    )
    
    return {"message": "Password updated successfully"}

@router.post("/forgot-password")
async def forgot_password(data: ForgotPassword, db=Depends(get_database), settings=Depends(get_settings)):
    users_collection: Collection = db["users"]
    user = await users_collection.find_one({"email": data.email})
    
    if user:
        # Generate reset token
        reset_token = secrets.token_urlsafe(32)
        reset_token_expires = datetime.utcnow() + timedelta(hours=1)
        
        # Store reset token in database
        await users_collection.update_one(
            {"uid": user["uid"]},
            {"$set": {
                "reset_token": reset_token,
                "reset_token_expires": reset_token_expires
            }}
        )
        
        # Generate reset link using frontend_url from settings
        reset_link = f"{settings.frontend_url}/reset-password?token={reset_token}"
        
        # Log the reset link (in production, this would be sent via email)
        logger.info(f"Password reset requested for email: {data.email}")
        logger.info(f"Reset link: {reset_link}")
        logger.info(f"Token expires at: {reset_token_expires}")
        
    # Always return success to prevent email enumeration
    return {"message": "If the email exists, a password reset link has been sent."}

@router.post("/reset-password")
async def reset_password(
    token: str,
    new_password: str,
    db=Depends(get_database)
):
    users_collection: Collection = db["users"]
    
    # Find user with valid reset token
    user = await users_collection.find_one({
        "reset_token": token,
        "reset_token_expires": {"$gt": datetime.utcnow()}
    })
    
    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token"
        )
    
    # Hash new password
    new_password_hash = hash_password(new_password)
    if not new_password_hash:
        raise HTTPException(status_code=500, detail="Error hashing password")
    
    # Update password and clear reset token
    await users_collection.update_one(
        {"uid": user["uid"]},
        {
            "$set": {
                "password_hash": new_password_hash,
                "updated_at": datetime.utcnow()
            },
            "$unset": {
                "reset_token": "",
                "reset_token_expires": ""
            }
        }
    )
    
    return {"message": "Password has been reset successfully"}
