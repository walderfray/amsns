from fastapi import APIRouter, HTTPException, status, Depends, UploadFile, File, Form
from config.database import get_database
from utils.security import access_security
from datetime import datetime
from pymongo.collection import Collection
from models.user import PaymentStatus
from typing import List

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])

from pydantic import BaseModel
from models.user import ServiceType, ApplicationStatus
from utils.cloudinary_helper import upload_file_to_cloudinary

class SelectServiceRequest(BaseModel):
    service: ServiceType

class PaymentRequest(BaseModel):
    reference: str
    method: str
    asset: str

@router.post("/select-service")
async def select_service(
    data: SelectServiceRequest,
    token: dict = Depends(access_security),
    db=Depends(get_database)
):
    user_uid = token["id"]
    users_collection: Collection = db["users"]
    
    await users_collection.update_one(
        {"uid": user_uid},
        {"$set": {"selected_service": data.service}}
    )
    
    return {"status": "success", "message": "Service selected successfully"}

@router.post("/payment")
async def process_payment(
    payment_data: PaymentRequest,
    token: dict = Depends(access_security),
    db=Depends(get_database)
):
    user_uid = token["id"]
    users_collection: Collection = db["users"]
    
    user = await users_collection.find_one({"uid": user_uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    service = user.get("selected_service", "none")
    if service == "none":
        raise HTTPException(status_code=400, detail="No service selected")
    
    await users_collection.update_one(
        {"uid": user_uid},
        {"$set": {
            f"services.{service}.payment_status": PaymentStatus.COMPLETED, 
            f"services.{service}.payment_reference": payment_data.reference,
            f"services.{service}.payment_method": payment_data.method,
            f"services.{service}.payment_asset": payment_data.asset,
            f"services.{service}.payment_date": datetime.utcnow()
        }}
    )
    
    return {"status": "success", "message": "Payment processed successfully"}

@router.post("/upload-document")
async def upload_document(
    document_id: int = Form(...),
    file: UploadFile = File(...),
    token: dict = Depends(access_security),
    db=Depends(get_database)
):
    user_uid = token["id"]
    users_collection: Collection = db["users"]
    
    user = await users_collection.find_one({"uid": user_uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    service = user.get("selected_service", "none")
    if service == "none":
        # Try to infer service from doc ID if needed, or fail
        # For now, let's require selection
        if document_id > 100:
            service = "trust"
        else:
            service = "affidavit"
            
    # Add document_id to uploaded_documents list if not present
    # Upload to Cloudinary

    
    upload_result = await upload_file_to_cloudinary(file, folder=f"amsns/{user_uid}/{service}")
    
    if not upload_result:
        raise HTTPException(status_code=500, detail="File upload failed")
        
    file_data = {
        "url": upload_result.get("secure_url"),
        "public_id": upload_result.get("public_id"),
        "format": upload_result.get("format"),
        "original_filename": file.filename,
        "uploaded_at": datetime.utcnow()
    }

    await users_collection.update_one(
        {"uid": user_uid},
        {
            "$addToSet": {f"services.{service}.uploaded_documents": document_id},
            "$set": {f"services.{service}.document_files.{document_id}": file_data}
        }
    )
    
    return {"status": "success", "message": f"Document {document_id} uploaded successfully", "url": file_data["url"]}

@router.post("/submit-application")
async def submit_application(
    token: dict = Depends(access_security),
    db=Depends(get_database)
):
    user_uid = token["id"]
    users_collection: Collection = db["users"]
    
    user = await users_collection.find_one({"uid": user_uid})
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
        
    service_name = user.get("selected_service", "none")
    if service_name == "none":
        raise HTTPException(status_code=400, detail="No service selected")
        
    service_data = user.get("services", {}).get(service_name, {})
    
    if service_data.get("payment_status") != PaymentStatus.COMPLETED:
        raise HTTPException(status_code=400, detail="Payment required")
        
    uploaded_docs = service_data.get("uploaded_documents", [])
    
    # Determine required docs based on service
    if service_name == "trust":
        required_docs = list(range(101, 116)) # 101 to 115
    else:
        required_docs = list(range(1, 8)) # 1 to 7
    
    if not all(doc_id in uploaded_docs for doc_id in required_docs):
        raise HTTPException(status_code=400, detail="All documents must be uploaded")
        

    
    await users_collection.update_one(
        {"uid": user_uid},
        {"$set": {
            f"services.{service_name}.status": ApplicationStatus.PENDING,
            f"services.{service_name}.application_submitted_at": datetime.utcnow()
        }}
    )
    
    return {"status": "success", "message": "Application submitted successfully"}
