from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from enum import Enum
from datetime import datetime
import uuid

class KYCStatus(str, Enum):
    NOT_STARTED = "not_started"
    SUBMITTED = "submitted"
    REJECTED = "rejected"
    APPROVED = "approved"

class KYCBase(BaseModel):
    full_name: str = Field(..., min_length=2, alias="fullName")
    date_of_birth: Optional[str] = Field(None, alias="dateOfBirth")
    address: Optional[str] = None
    phone_number: Optional[str] = Field(None, alias="phoneNumber")
    id_document_type: Optional[str] = Field("SSN", alias="idDocumentType")
    id_document_number: str = Field(..., alias="idDocumentNumber")
    occupation: Optional[str] = None
    
    model_config = ConfigDict(populate_by_name=True)

class KYCCreate(KYCBase):
    pass

class KYCInDB(KYCBase):
    uid: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_uid: str = Field(..., alias="userUid")
    status: KYCStatus = Field(default=KYCStatus.SUBMITTED)
    submitted_at: datetime = Field(default_factory=datetime.utcnow, alias="submittedAt")
    updated_at: datetime = Field(default_factory=datetime.utcnow, alias="updatedAt")
    rejection_reason: Optional[str] = Field(None, alias="rejectionReason")
    
    model_config = ConfigDict(populate_by_name=True)

class KYCResponse(KYCBase):
    uid: str
    user_uid: str = Field(..., alias="userUid")
    status: KYCStatus
    submitted_at: datetime = Field(..., alias="submittedAt")
    rejection_reason: Optional[str] = Field(None, alias="rejectionReason")
    
    model_config = ConfigDict(populate_by_name=True)
