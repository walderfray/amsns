from pydantic import BaseModel, EmailStr, Field, ConfigDict
from enum import Enum
from typing import Optional, List, Dict
from datetime import datetime
import uuid

class PaymentStatus(str, Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    FAILED = "failed"

class ApplicationStatus(str, Enum):
    NOT_APPLIED = "not_applied"
    PENDING = "pending"
    APPROVED = "approved"
    REJECTED = "rejected"

class ServiceType(str, Enum):
    NONE = "none"
    AFFIDAVIT = "affidavit"
    TRUST = "trust"

class UserBase(BaseModel):
    email: EmailStr = Field(..., description="User email address")
    first_name: str = Field(..., min_length=2, max_length=50, alias="firstName")
    last_name: str = Field(..., min_length=2, max_length=50, alias="lastName")
    
    model_config = ConfigDict(populate_by_name=True)

class UserCreate(UserBase):
    password: str = Field(..., min_length=6, description="User password")

class UserLogin(BaseModel):
    email: EmailStr
    password: str

from models.kyc import KYCStatus

class ServiceState(BaseModel):
    status: ApplicationStatus = Field(default=ApplicationStatus.NOT_APPLIED)
    payment_status: PaymentStatus = Field(default=PaymentStatus.PENDING)
    uploaded_documents: List[int] = Field(default=[])
    document_files: Dict[str, Dict] = Field(default={})
    payment_reference: Optional[str] = Field(default=None, alias="paymentReference")
    payment_method: Optional[str] = Field(default=None, alias="paymentMethod")
    payment_date: Optional[datetime] = Field(default=None, alias="paymentDate")
    payment_asset: Optional[str] = Field(default=None, alias="paymentAsset")
    
    model_config = ConfigDict(populate_by_name=True)

class UserInDB(UserBase):
    uid: str = Field(default_factory=lambda: str(uuid.uuid4()))
    password_hash: str = Field(..., alias="passwordHash")
    kyc_status: KYCStatus = Field(default=KYCStatus.NOT_STARTED, alias="kycStatus")
    selected_service: ServiceType = Field(default=ServiceType.NONE, alias="selectedService")
    services: Dict[str, ServiceState] = Field(
        default_factory=lambda: {
            "affidavit": ServiceState(),
            "trust": ServiceState()
        }
    )
    created_at: datetime = Field(default_factory=datetime.utcnow, alias="createdAt")
    updated_at: datetime = Field(default_factory=datetime.utcnow, alias="updatedAt")
    is_active: bool = Field(default=True, alias="isActive")
    is_admin: bool = Field(default=False, alias="isAdmin")
    
    model_config = ConfigDict(populate_by_name=True)

class UserResponse(UserBase):
    uid: str
    kyc_status: KYCStatus = Field(..., alias="kycStatus")
    selected_service: ServiceType = Field(..., alias="selectedService")
    services: Dict[str, ServiceState]
    created_at: datetime = Field(..., alias="createdAt")
    is_admin: bool = Field(default=False, alias="isAdmin")
    
    model_config = ConfigDict(populate_by_name=True)

class ChangePassword(BaseModel):
    old_password: str = Field(..., alias="oldPassword")
    new_password: str = Field(..., min_length=6, alias="newPassword")
    
    model_config = ConfigDict(populate_by_name=True)

class ForgotPassword(BaseModel):
    email: EmailStr
