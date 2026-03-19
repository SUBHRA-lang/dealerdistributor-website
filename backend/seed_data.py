import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Seed data
categories_data = [
    {"name": "Food & Beverage", "slug": "food-beverage", "icon": "UtensilsCrossed", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Health & Beauty", "slug": "health-beauty", "icon": "Heart", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Pharmaceuticals", "slug": "pharmaceuticals", "icon": "Pill", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Apparel & Fashion", "slug": "apparel-fashion", "icon": "Shirt", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Chemicals", "slug": "chemicals", "icon": "Beaker", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Home Supplies", "slug": "home-supplies", "icon": "Home", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Construction & Real Estate", "slug": "construction-real-estate", "icon": "Building2", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Electronics & Electrical Supplies", "slug": "electronics-electrical", "icon": "Zap", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Agriculture", "slug": "agriculture", "icon": "Wheat", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Automobile", "slug": "automobile", "icon": "Car", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Packaging & Paper", "slug": "packaging-paper", "icon": "Package", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Hospital & Medical Supplies", "slug": "hospital-medical", "icon": "Hospital", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Gifts & Crafts", "slug": "gifts-crafts", "icon": "Gift", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Consumer Electronics", "slug": "consumer-electronics", "icon": "Laptop", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Pipes, Tubes & Fittings", "slug": "pipes-tubes", "icon": "Pipette", "is_active": True, "created_at": datetime.utcnow()},
    {"name": "Industrial Supplies", "slug": "industrial-supplies", "icon": "Factory", "is_active": True, "created_at": datetime.utcnow()}
]

distributors_data = [
    {
        "name": "Epsilon Petrochem",
        "category_name": "Automobile",
        "logo": "https://via.placeholder.com/200x200/4F46E5/ffffff?text=EP",
        "investment_range": "₹ 5Lac - ₹10Lac",
        "established": 1993,
        "products": ["BIKE ENGINE OIL - KEMRON FLY 4T 20W40 SN", "KEMRON MOTOBIKE 4T 20W50 SL", "KEMRON AEROFLY 4T 10W30 SL", "KEMRON HYDROTECH AW 68 BERAL"],
        "phone": "08071793082",
        "email": "info@epsilonpetrochem.com",
        "description": "Leading manufacturer and distributor of premium automotive lubricants and engine oils.",
        "location": "Mumbai, Maharashtra",
        "experience": "30+ years",
        "territories": ["Maharashtra", "Gujarat", "Karnataka"],
        "is_featured": True,
        "status": "active",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "name": "Jayant Agro-Organics Limited",
        "category_name": "Health & Beauty",
        "logo": "https://via.placeholder.com/200x200/10B981/ffffff?text=JAO",
        "investment_range": "₹ 1Lac - ₹2Lac",
        "established": 2020,
        "products": ["EriCare Organic Castor Oil 200ML", "EriCare Organic Castor Oil 50ML", "200ML EriCare Cold-Pressed Castor Oil", "500ML EriCare Cold-Pressed Castor Oil"],
        "phone": "08758655303",
        "email": "info@jayant-agro.com",
        "description": "Organic beauty and personal care products manufacturer specializing in natural oils.",
        "location": "New Delhi, Delhi",
        "experience": "5+ years",
        "territories": ["All India"],
        "is_featured": True,
        "status": "active",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "name": "Eagle Plant Protect Pvt. Ltd.",
        "category_name": "Chemicals",
        "logo": "https://via.placeholder.com/200x200/F59E0B/ffffff?text=EPP",
        "investment_range": "₹ 1Lac - ₹2Lac",
        "established": 2009,
        "products": ["Disaster Bio Plant Protector", "Paragle Paraquat Dichloride Herbicide", "Boforce Gold Insecticide", "Bhukamp For all types of Crops"],
        "phone": "07971459539",
        "email": "info@eagleplant.com",
        "description": "Agricultural chemicals and plant protection products for modern farming.",
        "location": "Pune, Maharashtra",
        "experience": "16+ years",
        "territories": ["Maharashtra", "Madhya Pradesh", "Rajasthan"],
        "is_featured": True,
        "status": "active",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "name": "Konya Biotech Private Limited",
        "category_name": "Health & Beauty",
        "logo": "https://via.placeholder.com/200x200/EC4899/ffffff?text=KBL",
        "investment_range": "₹ 1Lac - ₹5Lac",
        "established": 2025,
        "products": ["Tylvalo-WSP TYLVALOSIN 62.5%", "Gentacin-WSP Gentamicin 10%", "Lasalocid-WSP LASALOCID SODIUM 20%", "LincoSpect-WSP LINCOMYCIN 22.2% +SPECTINOMYCIN 44.4%"],
        "phone": "07971459829",
        "email": "info@konyabiotech.com",
        "description": "Biotechnology products for health and wellness applications.",
        "location": "Bangalore, Karnataka",
        "experience": "New Entry",
        "territories": ["Karnataka", "Tamil Nadu", "Andhra Pradesh"],
        "is_featured": True,
        "status": "active",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "name": "Toreto Retail Private Limited",
        "category_name": "Consumer Electronics",
        "logo": "https://via.placeholder.com/200x200/8B5CF6/ffffff?text=TR",
        "investment_range": "₹ 2Lac - ₹5Lac",
        "established": 2014,
        "products": ["Fidget Pop Portable Bluetooth speaker", "Party Rockz Bluetooth speaker", "Twin Magno Magnetic wireless Bluetooth speaker", "Wave Mini Portable Bluetooth speaker"],
        "phone": "07971191167",
        "email": "info@toreto.com",
        "description": "Consumer electronics brand specializing in audio devices and accessories.",
        "location": "Delhi, Delhi",
        "experience": "11+ years",
        "territories": ["North India", "East India"],
        "is_featured": True,
        "status": "active",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "name": "Nutrinest Foods",
        "category_name": "Food & Beverage",
        "logo": "https://via.placeholder.com/200x200/14B8A6/ffffff?text=NF",
        "investment_range": "₹ 2Lac - ₹3Lac",
        "established": 2025,
        "products": ["Peanut Butter Chocolate Flavour 500g [Crunchy]", "Hazelnut Peanut Butter", "Peanut Butter Strawberry 1kg [Crunchy]", "Cookies and Cream"],
        "phone": "07971191219",
        "email": "info@nutrinest.com",
        "description": "Premium health food products focusing on natural nut butters and spreads.",
        "location": "Mumbai, Maharashtra",
        "experience": "New Entry",
        "territories": ["Maharashtra", "Gujarat"],
        "is_featured": True,
        "status": "active",
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]

testimonials_data = [
    {
        "name": "Mr Subhash Gangadhar Chandane",
        "designation": "General Manager",
        "company": "Greensense Energy Systems Pvt. Ltd.",
        "image": "https://via.placeholder.com/100x100/4F46E5/ffffff?text=SC",
        "testimonial": "I am extremely satisfied with the services provided by DealerDistributors. Since I joined them, I have received a good number of inquiries. They have exceeded my expectations and provided exceptional service so far.",
        "rating": 5,
        "is_featured": True,
        "created_at": datetime.utcnow()
    },
    {
        "name": "Mr Saud Dastagir",
        "designation": "General Manager",
        "company": "Soft Touchline Products Pvt. Ltd.",
        "image": "https://via.placeholder.com/100x100/10B981/ffffff?text=SD",
        "testimonial": "DealerDistributors.com is a commercial miracle that impressed us right after we signed up. Our specific needs were promptly met thanks to the dedicated account manager's personalized service.",
        "rating": 5,
        "is_featured": True,
        "created_at": datetime.utcnow()
    },
    {
        "name": "Mr. Sheeju Varghese",
        "designation": "Director",
        "company": "Powertroniks Solar Pvt. Ltd.",
        "image": "https://via.placeholder.com/100x100/F59E0B/ffffff?text=SV",
        "testimonial": "Since we started using DealerDistributors.com, our business has been completely transformed. Our account manager was exceptionally helpful and provided us with guidance every step of the way.",
        "rating": 5,
        "is_featured": True,
        "created_at": datetime.utcnow()
    }
]

blog_posts_data = [
    {
        "title": "How to Become a Distributor of Raj Hing & Peda: A Profitable Business Opportunity",
        "slug": "raj-hing-peda-distributor",
        "excerpt": "According to the current and fast growing Indian FMCG market, the aspect of authentic taste, traditional ingredients as well as reliable quality in the market is defining consumer buying behavior...",
        "content": "Full article content goes here...",
        "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
        "category": "Business Opportunities",
        "author": "DealerDistributors Team",
        "published_date": datetime.utcnow(),
        "is_published": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "Start Your Journey as a Peanut Butter Distributor",
        "slug": "peanut-butter-distributor",
        "excerpt": "The growth of the Health Food Industry around the World is increasing rapidly. Peanut butter has become a dominant product in the Plant Protein category...",
        "content": "Full article content goes here...",
        "image": "https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=250&fit=crop",
        "category": "Food & Beverage",
        "author": "DealerDistributors Team",
        "published_date": datetime.utcnow(),
        "is_published": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    },
    {
        "title": "The Ultimate Guide to Product Distributorships and How They Work",
        "slug": "distributorship-guide",
        "excerpt": "Understanding the distributorship model and how it can help you expand your business reach across multiple territories and markets...",
        "content": "Full article content goes here...",
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
        "category": "Guide",
        "author": "DealerDistributors Team",
        "published_date": datetime.utcnow(),
        "is_published": True,
        "created_at": datetime.utcnow(),
        "updated_at": datetime.utcnow()
    }
]


async def seed_database():
    try:
        print("Starting database seeding...")
        
        # Clear existing data
        await db.categories.delete_many({})
        await db.distributors.delete_many({})
        await db.testimonials.delete_many({})
        await db.blog_posts.delete_many({})
        print("Cleared existing data")
        
        # Insert categories
        result = await db.categories.insert_many(categories_data)
        print(f"Inserted {len(result.inserted_ids)} categories")
        
        # Insert distributors
        result = await db.distributors.insert_many(distributors_data)
        print(f"Inserted {len(result.inserted_ids)} distributors")
        
        # Insert testimonials
        result = await db.testimonials.insert_many(testimonials_data)
        print(f"Inserted {len(result.inserted_ids)} testimonials")
        
        # Insert blog posts
        result = await db.blog_posts.insert_many(blog_posts_data)
        print(f"Inserted {len(result.inserted_ids)} blog posts")
        
        print("Database seeding completed successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {str(e)}")
    finally:
        client.close()


if __name__ == "__main__":
    asyncio.run(seed_database())
