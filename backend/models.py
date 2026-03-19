from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Annotated
from datetime import datetime
from bson import ObjectId


class PyObjectId(str):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, _):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return str(v)


# Category Models
class Category(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    slug: str
    icon: str
    description: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class CategoryResponse(BaseModel):
    id: str
    name: str
    slug: str
    icon: str


# Distributor Models
class Distributor(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    category_name: str
    logo: str
    investment_range: str
    established: int
    products: List[str]
    phone: str
    email: Optional[str] = None
    description: str
    location: str
    experience: str
    territories: List[str]
    is_featured: bool = False
    status: str = "active"
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class DistributorResponse(BaseModel):
    id: str
    name: str
    category: str
    logo: str
    investmentRange: str
    established: int
    products: List[str]
    phone: str
    email: Optional[str] = None
    description: str
    location: str
    experience: str
    territories: List[str]
    is_featured: bool = False


# Blog Models
class BlogPost(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    title: str
    slug: str
    excerpt: str
    content: str
    image: str
    category: str
    author: str = "DealerDistributors Team"
    published_date: datetime = Field(default_factory=datetime.utcnow)
    is_published: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class BlogPostResponse(BaseModel):
    id: str
    title: str
    excerpt: str
    image: str
    date: str
    author: str
    category: str


# Testimonial Models
class Testimonial(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    designation: str
    company: str
    image: str
    testimonial: str
    rating: int = 5
    is_featured: bool = False
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


class TestimonialResponse(BaseModel):
    id: str
    name: str
    designation: str
    company: str
    image: str
    testimonial: str


# Requirement Models
class RequirementCreate(BaseModel):
    businessType: str
    category: str
    productName: str
    companyName: str
    contactPerson: str
    email: EmailStr
    phone: str
    location: str
    investment: str
    territories: str
    description: str


class Requirement(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    business_type: str
    category: str
    product_name: str
    company_name: str
    contact_person: str
    email: str
    phone: str
    location: str
    investment_range: str
    territories: str
    description: str
    status: str = "pending"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


# Contact Models
class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    subject: str
    message: str


class Contact(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    name: str
    email: str
    phone: str
    subject: str
    message: str
    status: str = "new"
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}


# Newsletter Models
class NewsletterSubscribe(BaseModel):
    email: EmailStr


class Newsletter(BaseModel):
    id: Optional[str] = Field(default=None, alias="_id")
    email: str
    subscribed_at: datetime = Field(default_factory=datetime.utcnow)
    is_active: bool = True

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
