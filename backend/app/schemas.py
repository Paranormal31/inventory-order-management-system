from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
from decimal import Decimal
from datetime import datetime

# --- CUSTOMER SCHEMAS ---
class CustomerBase(BaseModel):
    name: str = Field(..., min_length=1, description="Customer Full Name")
    email: Optional[str] = Field(None, description="Optional Email Address")
    phone: Optional[str] = Field(None, description="Contact Number")
    address: Optional[str] = Field(None, description="Customer Address")
    added_by_id: Optional[int] = None

class CustomerCreate(CustomerBase):
    pass

class CreatorResponse(BaseModel):
    id: int
    name: str
    email: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)

class CustomerResponse(CustomerBase):
    id: int
    added_by: Optional[CreatorResponse] = None
    model_config = ConfigDict(from_attributes=True)


# --- PRODUCT SCHEMAS ---
class ProductBase(BaseModel):
    sku: str = Field(..., min_length=1, description="Unique Stock Keeping Unit")
    name: str = Field(..., min_length=1, description="Product Name")
    description: Optional[str] = None
    price: Decimal = Field(..., ge=0, decimal_places=2, description="Unit Price")
    stock: int = Field(..., ge=0, description="Available Stock Quantity")
    added_by_id: Optional[int] = None

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    sku: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = Field(None, ge=0)
    stock: Optional[int] = Field(None, ge=0)
    added_by_id: Optional[int] = None

class ProductResponse(ProductBase):
    id: int
    added_by: Optional[CustomerResponse] = None
    model_config = ConfigDict(from_attributes=True)


# --- ORDER ITEM SCHEMAS ---
class OrderItemBase(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0, description="Quantity ordered")

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(BaseModel):
    id: int
    product_id: int
    quantity: int
    price_at_order: Decimal
    product: ProductResponse

    model_config = ConfigDict(from_attributes=True)


# --- ORDER SCHEMAS ---
class OrderCreate(BaseModel):
    customer_id: int
    items: List[OrderItemCreate] = Field(..., min_length=1, description="At least one item required")
    added_by_id: Optional[int] = None

class OrderUpdateStatus(BaseModel):
    status: str = Field(..., description="New status (pending, completed, cancelled)")

class OrderResponse(BaseModel):
    id: int
    customer_id: int
    status: str
    total_price: Decimal
    created_at: datetime
    customer: CustomerResponse
    items: List[OrderItemResponse]
    added_by_id: Optional[int] = None
    added_by: Optional[CustomerResponse] = None

    model_config = ConfigDict(from_attributes=True)


# --- GOOGLE LOGIN SCHEMAS ---
class GoogleLoginRequest(BaseModel):
    credential: str


# --- PASSWORD AUTH SCHEMAS ---
class SignupRequest(BaseModel):
    name: str = Field(..., min_length=1)
    email: EmailStr
    password: str = Field(..., min_length=6, description="Minimum 6 characters")

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: dict
