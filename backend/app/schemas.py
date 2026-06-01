from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import List, Optional
from decimal import Decimal
from datetime import datetime

# --- PRODUCT SCHEMAS ---
class ProductBase(BaseModel):
    sku: str = Field(..., min_length=1, description="Unique Stock Keeping Unit")
    name: str = Field(..., min_length=1, description="Product Name")
    description: Optional[str] = None
    price: Decimal = Field(..., ge=0, decimal_places=2, description="Unit Price")
    stock: int = Field(..., ge=0, description="Available Stock Quantity")

class ProductCreate(ProductBase):
    pass

class ProductUpdate(BaseModel):
    sku: Optional[str] = None
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[Decimal] = Field(None, ge=0)
    stock: Optional[int] = Field(None, ge=0)

class ProductResponse(ProductBase):
    id: int
    model_config = ConfigDict(from_attributes=True)


# --- CUSTOMER SCHEMAS ---
class CustomerBase(BaseModel):
    name: str = Field(..., min_length=1, description="Customer Full Name")
    email: EmailStr = Field(..., description="Unique Email Address")
    phone: Optional[str] = None

class CustomerCreate(CustomerBase):
    pass

class CustomerResponse(CustomerBase):
    id: int
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

    model_config = ConfigDict(from_attributes=True)


# --- GOOGLE LOGIN SCHEMAS ---
class GoogleLoginRequest(BaseModel):
    credential: str
