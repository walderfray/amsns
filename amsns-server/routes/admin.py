from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from config.database import get_database
from utils.security import access_security
from models.user import UserResponse, ApplicationStatus
from models.kyc import KYCStatus
from pymongo.collection import Collection
from pydantic import BaseModel

router = APIRouter(prefix="/admin", tags=["Admin"])

class KYCUpdate(BaseModel):
    approved: bool
    rejection_reason: Optional[str] = None

class StatusUpdate(BaseModel):
    status: ApplicationStatus

async def get_admin_user(token: dict = Depends(access_security), db=Depends(get_database)):
    user_uid = token["id"]
    users_collection: Collection = db["users"]
    user = await users_collection.find_one({"uid": user_uid})
    
    if not user or not user.get("is_admin", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin privileges required"
        )
    return user

@router.get("/users", response_model=List[UserResponse])
async def get_all_users(
    skip: int = 0,
    limit: int = 100,
    admin=Depends(get_admin_user),
    db=Depends(get_database)
):
    users_collection: Collection = db["users"]
    cursor = users_collection.find({}).sort("created_at", -1).skip(skip).limit(limit)
    users = await cursor.to_list(length=limit)
    return users

@router.get("/users/{uid}", response_model=UserResponse)
async def get_user_details(
    uid: str,
    admin=Depends(get_admin_user),
    db=Depends(get_database)
):
    users_collection: Collection = db["users"]
    user = await users_collection.find_one({"uid": uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/users/{uid}/approve-kyc")
async def approve_kyc(
    uid: str,
    data: KYCUpdate,
    admin=Depends(get_admin_user),
    db=Depends(get_database)
):
    users_collection: Collection = db["users"]
    
    new_status = KYCStatus.APPROVED if data.approved else KYCStatus.REJECTED
    
    update_data = {"kyc_status": new_status}
    if data.rejection_reason:
        update_data["rejection_reason"] = data.rejection_reason
        
    result = await users_collection.update_one(
        {"uid": uid},
        {"$set": update_data}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="User not found")
        
    return {"status": "success", "message": f"KYC status updated to {new_status}"}

@router.post("/users/{uid}/services/{service}/update-status")
async def update_application_status(
    uid: str,
    service: str,
    data: StatusUpdate,
    admin=Depends(get_admin_user),
    db=Depends(get_database)
):
    users_collection: Collection = db["users"]
    
    # Verify user exists
    user = await users_collection.find_one({"uid": uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    if service not in ["affidavit", "trust"]:
        raise HTTPException(status_code=400, detail="Invalid service")
        
    await users_collection.update_one(
        {"uid": uid},
        {"$set": {f"services.{service}.status": data.status}}
    )
    
    return {"status": "success", "message": f"Application status updated to {data.status}"}
