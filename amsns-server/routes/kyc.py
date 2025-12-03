from fastapi import APIRouter, HTTPException, status, Depends, BackgroundTasks
from models.kyc import KYCCreate, KYCResponse, KYCInDB, KYCStatus
from config.database import get_database
from utils.security import access_security
from datetime import datetime
from pymongo.collection import Collection
import uuid

router = APIRouter(prefix="/kyc", tags=["KYC"])

@router.post("/submit", response_model=KYCResponse, status_code=status.HTTP_201_CREATED)
async def submit_kyc(
    kyc_data: KYCCreate, 
    background_tasks: BackgroundTasks,
    token: dict = Depends(access_security),
    db=Depends(get_database)
):
    user_uid = token["id"]
    users_collection: Collection = db["users"]
    kyc_collection: Collection = db["kyc"]

    # Check if user exists
    user = await users_collection.find_one({"uid": user_uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Check if KYC already exists/submitted
    existing_kyc = await kyc_collection.find_one({"user_uid": user_uid})
    if existing_kyc:
        # For now, let's not allow re-submission if already submitted or approved
        # You might want to allow update if rejected
        if existing_kyc["status"] in [KYCStatus.SUBMITTED, KYCStatus.APPROVED]:
             raise HTTPException(status_code=400, detail="KYC already submitted")
        
        # If rejected, we might want to update the existing record instead of creating new
        # For simplicity, let's assume we create a new one or update. 
        # Let's update the existing one if it exists but is not approved/submitted (e.g. rejected or draft)
        # But for this initial implementation, let's just update the existing one.
        
        update_data = kyc_data.model_dump()
        update_data["status"] = KYCStatus.SUBMITTED
        update_data["submitted_at"] = datetime.utcnow()
        update_data["updated_at"] = datetime.utcnow()
        
        await kyc_collection.update_one(
            {"user_uid": user_uid},
            {"$set": update_data}
        )
        kyc_doc = await kyc_collection.find_one({"user_uid": user_uid})
    else:
        # Create new KYC record
        kyc_dict = kyc_data.model_dump()
        kyc_dict["uid"] = str(uuid.uuid4())
        kyc_dict["user_uid"] = user_uid
        kyc_dict["status"] = KYCStatus.SUBMITTED
        kyc_dict["submitted_at"] = datetime.utcnow()
        kyc_dict["updated_at"] = datetime.utcnow()
        
        await kyc_collection.insert_one(kyc_dict)
        if "_id" in kyc_dict:
            del kyc_dict["_id"]
        kyc_doc = kyc_dict

    # Update user status
    await users_collection.update_one(
        {"uid": user_uid},
        {"$set": {"kyc_status": KYCStatus.SUBMITTED, "updated_at": datetime.utcnow()}}
    )

    background_tasks.add_task(auto_approve_kyc, user_uid, db)

    return kyc_doc

import asyncio

async def auto_approve_kyc(user_uid: str, db):
    await asyncio.sleep(30)
    users_collection = db["users"]
    kyc_collection = db["kyc"]
    
    # Update KYC status
    await kyc_collection.update_one(
        {"user_uid": user_uid},
        {"$set": {
            "status": KYCStatus.APPROVED, 
            "updated_at": datetime.utcnow(),
            "approved_at": datetime.utcnow()
        }}
    )
    
    # Update User status
    await users_collection.update_one(
        {"uid": user_uid},
        {"$set": {"kyc_status": KYCStatus.APPROVED, "updated_at": datetime.utcnow()}}
    )

@router.get("/info", response_model=KYCResponse)
async def get_kyc_info(
    token: dict = Depends(access_security),
    db=Depends(get_database)
):
    user_uid = token["id"]
    kyc_collection: Collection = db["kyc"]

    kyc_doc = await kyc_collection.find_one({"user_uid": user_uid})
    if not kyc_doc:
        raise HTTPException(status_code=404, detail="KYC information not found")
    
    return kyc_doc
