import sys
import os
import json
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
from datetime import datetime

# Load MongoDB connection from .env
load_dotenv()
MONGO_URL = os.getenv('MONGO_URL', 'mongodb://localhost:27017')
DB_NAME = os.getenv('DB_NAME', 'dealerdistributors')

# Target SQL file
SQL_FILE = '../php-backend/full_site_data.sql'

def escape_sql(val):
    if val is None:
        return "NULL"
    if isinstance(val, (int, float, bool)):
        return str(int(val)) if isinstance(val, bool) else str(val)
    if isinstance(val, (list, dict)):
        val = json.dumps(val)
    
    # Simple escape for SQL
    val = str(val).replace("'", "''")
    return f"'{val}'"

async def migrate():
    print(f"Connecting to MongoDB at {MONGO_URL}...")
    client = AsyncIOMotorClient(MONGO_URL)
    db = client[DB_NAME]
    
    sql_script = []
    sql_script.append("-- DealerDistributors Database Dump")
    sql_script.append("-- Generated on: " + datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    sql_script.append("SET NAMES utf8mb4;\n")

    # 1. Categories
    print("Extracting categories...")
    sql_script.append("-- Table: categories")
    sql_script.append("TRUNCATE TABLE `categories`;")
    cursor = db.categories.find({})
    async for doc in cursor:
        fields = ["name", "slug", "icon", "description", "is_active"]
        vals = [escape_sql(doc.get(f)) for f in fields]
        sql_script.append(f"INSERT INTO `categories` ({', '.join(['`'+f+'`' for f in fields])}) VALUES ({', '.join(vals)});")
    sql_script.append("")

    # 2. Distributors
    print("Extracting distributors...")
    sql_script.append("-- Table: distributors")
    sql_script.append("TRUNCATE TABLE `distributors`;")
    cursor = db.distributors.find({})
    async for doc in cursor:
        cols = ["name", "category_name", "logo", "investment_range", "established", "products", "phone", "email", "description", "location", "experience", "territories", "is_featured", "status"]
        vals = [escape_sql(doc.get(c)) for c in cols]
        sql_script.append(f"INSERT INTO `distributors` ({', '.join(['`'+c+'`' for c in cols])}) VALUES ({', '.join(vals)});")
    sql_script.append("")

    # 3. Blog Posts
    print("Extracting blog posts...")
    sql_script.append("-- Table: blog_posts")
    sql_script.append("TRUNCATE TABLE `blog_posts`;")
    cursor = db.blog_posts.find({})
    async for doc in cursor:
        cols = ["title", "slug", "excerpt", "content", "image", "category", "author", "published_date", "is_published"]
        vals = [escape_sql(doc.get(c)) for c in cols]
        sql_script.append(f"INSERT INTO `blog_posts` ({', '.join(['`'+c+'`' for c in cols])}) VALUES ({', '.join(vals)});")
    sql_script.append("")

    # 4. Testimonials
    print("Extracting testimonials...")
    sql_script.append("-- Table: testimonials")
    sql_script.append("TRUNCATE TABLE `testimonials`;")
    cursor = db.testimonials.find({})
    async for doc in cursor:
        cols = ["name", "designation", "company", "image", "testimonial", "rating", "is_featured"]
        vals = [escape_sql(doc.get(c)) for c in cols]
        sql_script.append(f"INSERT INTO `testimonials` ({', '.join(['`'+c+'`' for c in cols])}) VALUES ({', '.join(vals)});")
    sql_script.append("")

    # Load existing schema from setup.sql and prepend it
    with open('../php-backend/setup.sql', 'r') as f:
        schema = f.read()

    full_sql = schema + "\n\n-- DATA DUMP --\n\n" + "\n".join(sql_script)

    with open(SQL_FILE, 'w') as f:
        f.write(full_sql)
    
    print(f"Successfully generated {SQL_FILE}")
    client.close()

if __name__ == "__main__":
    asyncio.run(migrate())
