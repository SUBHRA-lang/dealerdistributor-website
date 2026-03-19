# Content Management Guide - DealerDistributors.com

## 🎥 How to Change Videos, Images, and Content

---

## 1. Change Video Testimonials

### Current Videos (YouTube IDs in mockData.js):
```javascript
// File: /app/frontend/src/data/mockData.js
export const videoTestimonials = [
  { id: 1, youtubeId: 'kveOfJWz5Qw' },
  { id: 2, youtubeId: 'I6hENYZiRoY' },
  { id: 3, youtubeId: 'vLV9-RqOjUE' }
];
```

### How to Change:
**Option 1: Edit mockData.js directly**
1. Open `/app/frontend/src/data/mockData.js`
2. Replace `youtubeId` with your YouTube video ID
3. To get YouTube ID: From URL `https://www.youtube.com/watch?v=YOUR_VIDEO_ID`
4. Restart frontend: `sudo supervisorctl restart frontend`

**Option 2: Move to Database (Recommended)**
Add video testimonials collection to MongoDB and fetch via API.

---

## 2. Change Images

### Distributor Logos:
```javascript
// In database: distributors collection
{
  "logo": "https://via.placeholder.com/200x200/4F46E5/ffffff?text=EP"
}
```

**To Change:**
```bash
# Connect to MongoDB
mongo

# Switch to database
use getdistributors

# Update distributor logo
db.distributors.updateOne(
  { "name": "Epsilon Petrochem" },
  { $set: { "logo": "https://your-image-url.com/logo.png" } }
)
```

### Blog Post Images:
```bash
db.blog_posts.updateOne(
  { "title": "Your Blog Title" },
  { $set: { "image": "https://images.unsplash.com/photo-xxx" } }
)
```

### Testimonial Images:
```bash
db.testimonials.updateOne(
  { "name": "Client Name" },
  { $set: { "image": "https://your-image-url.com/client.jpg" } }
)
```

---

## 3. Change Text Content

### Update Distributor Information:
```bash
mongo getdistributors

db.distributors.updateOne(
  { "name": "Company Name" },
  { $set: { 
    "description": "New company description",
    "products": ["Product 1", "Product 2", "Product 3"],
    "location": "New City, State",
    "phone": "1234567890"
  }}
)
```

### Update Blog Posts:
```bash
db.blog_posts.updateOne(
  { "slug": "blog-post-slug" },
  { $set: { 
    "title": "New Title",
    "excerpt": "New excerpt...",
    "content": "Full blog content here...",
    "author": "DealerDistributors Team"
  }}
)
```

### Update Testimonials:
```bash
db.testimonials.updateOne(
  { "name": "Client Name" },
  { $set: { 
    "testimonial": "New testimonial text...",
    "company": "New Company Name",
    "designation": "New Designation"
  }}
)
```

---

## 4. Add New Content

### Add New Distributor:
```bash
db.distributors.insertOne({
  "name": "New Company Name",
  "category_name": "Food & Beverage",
  "logo": "https://your-logo-url.com/logo.png",
  "investment_range": "₹ 2Lac - ₹5Lac",
  "established": 2024,
  "products": ["Product 1", "Product 2"],
  "phone": "9876543210",
  "email": "info@company.com",
  "description": "Company description...",
  "location": "City, State",
  "experience": "New Entry",
  "territories": ["State 1", "State 2"],
  "is_featured": true,
  "status": "active",
  "created_at": new Date(),
  "updated_at": new Date()
})
```

### Add New Blog Post:
```bash
db.blog_posts.insertOne({
  "title": "New Blog Post Title",
  "slug": "new-blog-post",
  "excerpt": "Brief description...",
  "content": "Full blog content...",
  "image": "https://images.unsplash.com/photo-xxx",
  "category": "Business Opportunities",
  "author": "DealerDistributors Team",
  "published_date": new Date(),
  "is_published": true,
  "created_at": new Date(),
  "updated_at": new Date()
})
```

### Add New Testimonial:
```bash
db.testimonials.insertOne({
  "name": "Client Name",
  "designation": "CEO",
  "company": "Company Name",
  "image": "https://your-image-url.com/client.jpg",
  "testimonial": "Testimonial text...",
  "rating": 5,
  "is_featured": true,
  "created_at": new Date()
})
```

---

## 5. Delete Content

### Delete Distributor:
```bash
db.distributors.deleteOne({ "name": "Company Name" })
```

### Delete Blog Post:
```bash
db.blog_posts.deleteOne({ "slug": "blog-slug" })
```

### Delete Testimonial:
```bash
db.testimonials.deleteOne({ "name": "Client Name" })
```

---

## 6. Quick MongoDB Commands

### View All Data:
```bash
# Connect to MongoDB
mongo

# Switch to database
use getdistributors

# View all distributors
db.distributors.find().pretty()

# View all blog posts
db.blog_posts.find().pretty()

# View all testimonials
db.testimonials.find().pretty()

# Count documents
db.distributors.count()
```

### Search:
```bash
# Find by name
db.distributors.find({ "name": "Company Name" })

# Find by category
db.distributors.find({ "category_name": "Food & Beverage" })

# Find featured distributors
db.distributors.find({ "is_featured": true })
```

---

## 7. Best Practices for Images

### Recommended Image Sources:
1. **Unsplash** (Free, high-quality)
   - Format: `https://images.unsplash.com/photo-xxx?w=800&h=600&fit=crop`

2. **Your Own Hosting**
   - Upload to your server/CDN
   - Use format: `https://yourdomain.com/images/logo.png`

3. **Placeholder.com** (For testing)
   - Format: `https://via.placeholder.com/200x200/4F46E5/ffffff?text=Logo`

### Image Size Recommendations:
- **Distributor Logos:** 200x200px (square)
- **Blog Images:** 800x500px (16:10 ratio)
- **Testimonial Photos:** 100x100px (square)
- **Hero Images:** 1200x800px (3:2 ratio)

---

## 8. Automatic Updates

After making changes in MongoDB, the website automatically shows updated content because:
- Frontend fetches data from API on page load
- No need to restart services
- Changes reflect immediately on next page refresh

---

## 9. Upload Your Own Images

### Option A: Use Image Hosting Service
1. Upload to **Imgur, Cloudinary, or AWS S3**
2. Get public URL
3. Update MongoDB with new URL

### Option B: Host on Your Server
1. Upload images to `/app/frontend/public/images/`
2. Reference as: `/images/your-image.jpg`
3. Or use full URL after deployment

---

## 10. Video Testimonials - YouTube Setup

### Steps:
1. Upload video to **YouTube**
2. Make video **Public** or **Unlisted**
3. Get video ID from URL: `youtube.com/watch?v=VIDEO_ID`
4. Update in `/app/frontend/src/data/mockData.js`:
   ```javascript
   { id: 1, youtubeId: 'YOUR_VIDEO_ID' }
   ```

### YouTube Video Requirements:
- Must be public or unlisted (not private)
- Embedding must be enabled in video settings
- Video ID is 11 characters long

---

## 🔧 Quick Reference Commands

```bash
# Access MongoDB
mongo

# Use database
use getdistributors

# View collections
show collections

# Count items
db.distributors.count()

# Update single field
db.distributors.updateOne(
  { "name": "Company" },
  { $set: { "phone": "9999999999" } }
)

# Find and display
db.distributors.find({ "category_name": "Food & Beverage" }).pretty()
```

---

## 📝 Summary

**To change content:**
1. **Images/Videos** - Update URLs in MongoDB
2. **Text** - Update via MongoDB commands
3. **YouTube Videos** - Edit mockData.js with new video IDs
4. **New Content** - Insert new documents in MongoDB
5. **Delete Content** - Remove documents from MongoDB

**No restart needed** - Changes reflect on next page refresh!
