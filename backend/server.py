from fastapi import FastAPI, APIRouter, HTTPException, Query
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from bson import ObjectId
from datetime import datetime

from models import (
    CategoryResponse, DistributorResponse, BlogPostResponse, TestimonialResponse,
    RequirementCreate, ContactCreate, NewsletterSubscribe
)

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="GetDistributors API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Helper function to convert ObjectId to string
def serialize_doc(doc):
    if doc and "_id" in doc:
        doc["id"] = str(doc["_id"])
        del doc["_id"]
    return doc


# ============= CATEGORIES ENDPOINTS =============
@api_router.get("/categories", response_model=List[CategoryResponse])
async def get_categories():
    """Get all active categories"""
    categories = await db.categories.find({"is_active": True}).to_list(100)
    return [serialize_doc(cat) for cat in categories]


@api_router.get("/categories/{slug}")
async def get_category_by_slug(slug: str):
    """Get category by slug"""
    category = await db.categories.find_one({"slug": slug, "is_active": True})
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    return serialize_doc(category)


# ============= DISTRIBUTORS ENDPOINTS =============
@api_router.get("/distributors", response_model=List[DistributorResponse])
async def get_distributors(
    category: Optional[str] = None,
    location: Optional[str] = None,
    limit: int = Query(50, le=100),
    skip: int = 0
):
    """Get distributors with optional filters"""
    query = {"status": "active"}
    
    if category and category != "all":
        query["category_name"] = {"$regex": category, "$options": "i"}
    
    if location:
        query["location"] = {"$regex": location, "$options": "i"}
    
    distributors = await db.distributors.find(query).skip(skip).limit(limit).to_list(limit)
    
    result = []
    for dist in distributors:
        result.append({
            "id": str(dist["_id"]),
            "name": dist["name"],
            "category": dist["category_name"],
            "logo": dist["logo"],
            "investmentRange": dist["investment_range"],
            "established": dist["established"],
            "products": dist["products"],
            "phone": dist["phone"],
            "email": dist.get("email"),
            "description": dist["description"],
            "location": dist["location"],
            "experience": dist["experience"],
            "territories": dist["territories"],
            "is_featured": dist.get("is_featured", False)
        })
    
    return result


@api_router.get("/distributors/featured", response_model=List[DistributorResponse])
async def get_featured_distributors(limit: int = 6):
    """Get featured distributors"""
    distributors = await db.distributors.find({"is_featured": True, "status": "active"}).limit(limit).to_list(limit)
    
    result = []
    for dist in distributors:
        result.append({
            "id": str(dist["_id"]),
            "name": dist["name"],
            "category": dist["category_name"],
            "logo": dist["logo"],
            "investmentRange": dist["investment_range"],
            "established": dist["established"],
            "products": dist["products"],
            "phone": dist["phone"],
            "email": dist.get("email"),
            "description": dist["description"],
            "location": dist["location"],
            "experience": dist["experience"],
            "territories": dist["territories"],
            "is_featured": dist.get("is_featured", False)
        })
    
    return result


@api_router.get("/distributors/{distributor_id}")
async def get_distributor_by_id(distributor_id: str):
    """Get distributor by ID"""
    try:
        distributor = await db.distributors.find_one({"_id": ObjectId(distributor_id)})
        if not distributor:
            raise HTTPException(status_code=404, detail="Distributor not found")
        
        return {
            "id": str(distributor["_id"]),
            "name": distributor["name"],
            "category": distributor["category_name"],
            "logo": distributor["logo"],
            "investmentRange": distributor["investment_range"],
            "established": distributor["established"],
            "products": distributor["products"],
            "phone": distributor["phone"],
            "email": distributor.get("email"),
            "description": distributor["description"],
            "location": distributor["location"],
            "experience": distributor["experience"],
            "territories": distributor["territories"],
            "is_featured": distributor.get("is_featured", False)
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid ID format: {str(e)}")


# ============= BLOG ENDPOINTS =============
@api_router.get("/blog/posts", response_model=List[BlogPostResponse])
async def get_blog_posts(
    category: Optional[str] = None,
    limit: int = Query(10, le=50),
    skip: int = 0
):
    """Get blog posts with optional category filter"""
    query = {"is_published": True}
    
    if category:
        query["category"] = category
    
    posts = await db.blog_posts.find(query).sort("published_date", -1).skip(skip).limit(limit).to_list(limit)
    
    result = []
    for post in posts:
        result.append({
            "id": str(post["_id"]),
            "title": post["title"],
            "excerpt": post["excerpt"],
            "image": post["image"],
            "date": post["published_date"].strftime("%Y-%m-%d"),
            "author": post["author"],
            "category": post["category"]
        })
    
    return result


@api_router.get("/blog/posts/{post_id}")
async def get_blog_post_by_id(post_id: str):
    """Get blog post by ID"""
    try:
        post = await db.blog_posts.find_one({"_id": ObjectId(post_id)})
        if not post:
            raise HTTPException(status_code=404, detail="Blog post not found")
        
        return {
            "id": str(post["_id"]),
            "title": post["title"],
            "excerpt": post["excerpt"],
            "content": post.get("content", ""),
            "image": post["image"],
            "date": post["published_date"].strftime("%Y-%m-%d"),
            "author": post["author"],
            "category": post["category"]
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid ID format: {str(e)}")


# ============= TESTIMONIALS ENDPOINTS =============
@api_router.get("/testimonials", response_model=List[TestimonialResponse])
async def get_testimonials(limit: int = 10):
    """Get all testimonials"""
    testimonials = await db.testimonials.find().limit(limit).to_list(limit)
    
    result = []
    for test in testimonials:
        result.append({
            "id": str(test["_id"]),
            "name": test["name"],
            "designation": test["designation"],
            "company": test["company"],
            "image": test["image"],
            "testimonial": test["testimonial"]
        })
    
    return result


@api_router.get("/testimonials/featured", response_model=List[TestimonialResponse])
async def get_featured_testimonials(limit: int = 3):
    """Get featured testimonials"""
    testimonials = await db.testimonials.find({"is_featured": True}).limit(limit).to_list(limit)
    
    result = []
    for test in testimonials:
        result.append({
            "id": str(test["_id"]),
            "name": test["name"],
            "designation": test["designation"],
            "company": test["company"],
            "image": test["image"],
            "testimonial": test["testimonial"]
        })
    
    return result


# ============= REQUIREMENTS ENDPOINT =============
@api_router.post("/requirements")
async def create_requirement(requirement: RequirementCreate):
    """Submit a new requirement"""
    requirement_doc = {
        "business_type": requirement.businessType,
        "category": requirement.category,
        "product_name": requirement.productName,
        "company_name": requirement.companyName,
        "contact_person": requirement.contactPerson,
        "email": requirement.email,
        "phone": requirement.phone,
        "location": requirement.location,
        "investment_range": requirement.investment,
        "territories": requirement.territories,
        "description": requirement.description,
        "status": "pending",
        "created_at": datetime.utcnow()
    }
    
    result = await db.requirements.insert_one(requirement_doc)
    
    return {
        "success": True,
        "message": "Requirement submitted successfully",
        "id": str(result.inserted_id)
    }


# ============= CONTACT ENDPOINT =============
@api_router.post("/contact")
async def create_contact(contact: ContactCreate):
    """Submit contact form"""
    contact_doc = {
        "name": contact.name,
        "email": contact.email,
        "phone": contact.phone,
        "subject": contact.subject,
        "message": contact.message,
        "status": "new",
        "created_at": datetime.utcnow()
    }
    
    result = await db.contacts.insert_one(contact_doc)
    
    return {
        "success": True,
        "message": "Thank you for contacting us. We will get back to you soon.",
        "id": str(result.inserted_id)
    }


# ============= NEWSLETTER ENDPOINT =============
@api_router.post("/newsletter/subscribe")
async def subscribe_newsletter(subscription: NewsletterSubscribe):
    """Subscribe to newsletter"""
    # Check if email already exists
    existing = await db.newsletter.find_one({"email": subscription.email})
    
    if existing:
        return {
            "success": True,
            "message": "You are already subscribed to our newsletter"
        }
    
    subscription_doc = {
        "email": subscription.email,
        "subscribed_at": datetime.utcnow(),
        "is_active": True
    }
    
    result = await db.newsletter.insert_one(subscription_doc)
    
    return {
        "success": True,
        "message": "Successfully subscribed to newsletter",
        "id": str(result.inserted_id)
    }


# Health check endpoint
@api_router.get("/")
async def root():
    return {
        "message": "GetDistributors API is running",
        "version": "1.0.0",
        "status": "healthy"
    }


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
