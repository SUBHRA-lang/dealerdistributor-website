# GetDistributors.com - Full-Stack Clone

## 🎉 Complete Full-Stack B2B Platform

An exact replica of GetDistributors.com built with React, FastAPI, and MongoDB.

---

## 🚀 Quick Start

### Access the Live Site
**URL:** https://layout-55.preview.emergentagent.com

### View Code in Editor
1. Click the **VS Code icon** in your Emergent dashboard
2. Browse all files in `/app/frontend` and `/app/backend`

### Download Code
1. Click **"Save to GitHub"** button (requires paid plan)
2. Clone the repository to your local machine
3. Or use the VS Code view to copy files

---

## 📁 Project Structure

```
/app/
├── frontend/                    # React Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # 30+ Shadcn components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── CategorySidebar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Distributors.jsx
│   │   │   ├── DistributorDetail.jsx
│   │   │   ├── Blog.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── PostRequirement.jsx
│   │   │   ├── About.jsx
│   │   │   ├── SignIn.jsx
│   │   │   └── Join.jsx
│   │   ├── services/
│   │   │   └── api.js          # API service layer
│   │   ├── data/
│   │   │   └── mockData.js
│   │   ├── App.js
│   │   └── index.css
│   └── package.json
│
├── backend/                     # FastAPI Application
│   ├── server.py               # Main API server (9 endpoints)
│   ├── models.py               # Pydantic models
│   ├── seed_data.py            # Database seeding
│   └── requirements.txt
│
└── contracts.md                # API contracts & integration plan
```

---

## 🔌 API Endpoints

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{slug}` - Get category by slug

### Distributors
- `GET /api/distributors` - Get distributors (with filters)
- `GET /api/distributors/featured` - Get featured distributors
- `GET /api/distributors/{id}` - Get single distributor

### Blog
- `GET /api/blog/posts` - Get blog posts
- `GET /api/blog/posts/{id}` - Get single post

### Testimonials
- `GET /api/testimonials/featured` - Get featured testimonials

### Forms
- `POST /api/requirements` - Submit requirement
- `POST /api/contact` - Submit contact form
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

---

## 💾 Database Collections

### MongoDB Collections (6 total)
1. **categories** - 16 industry categories
2. **distributors** - 6 featured distributors
3. **blog_posts** - 3 blog articles
4. **testimonials** - 3 client testimonials
5. **requirements** - User submissions
6. **contacts** - Contact form submissions
7. **newsletter** - Email subscriptions

### Re-seed Database
```bash
cd /app/backend
python seed_data.py
```

---

## 🎨 Features Implemented

### Frontend
- ✅ Homepage with hero section
- ✅ Category sidebar (16 categories)
- ✅ Featured distributors section
- ✅ Distributors listing with filters
- ✅ Distributor detail pages with tabs
- ✅ Blog listing and posts
- ✅ Contact form
- ✅ Post requirement form
- ✅ Newsletter subscription
- ✅ About, Sign In, Join pages
- ✅ Responsive design
- ✅ Loading states & error handling
- ✅ Toast notifications

### Backend
- ✅ 9 RESTful API endpoints
- ✅ MongoDB integration
- ✅ CORS enabled
- ✅ Pydantic validation
- ✅ Async operations
- ✅ Error handling

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 19
- **Styling:** Tailwind CSS
- **UI Components:** Shadcn (30+ components)
- **Routing:** React Router DOM v7
- **HTTP Client:** Axios
- **State:** React Hooks

### Backend
- **Framework:** FastAPI
- **Database Driver:** Motor (Async MongoDB)
- **Validation:** Pydantic v2
- **CORS:** Starlette Middleware

### Database
- **Database:** MongoDB
- **Collections:** 6 collections
- **Initial Data:** Seeded with real data

---

## 📝 Environment Variables

### Frontend (`.env`)
```env
REACT_APP_BACKEND_URL=https://layout-55.preview.emergentagent.com
```

### Backend (`.env`)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=getdistributors
```

---

## 🔧 Development

### Backend
```bash
# The backend runs on port 8001
# Managed by supervisor

# View logs
tail -f /var/log/supervisor/backend.out.log

# Restart
sudo supervisorctl restart backend
```

### Frontend
```bash
# The frontend runs on port 3000
# Managed by supervisor

# View logs
tail -f /var/log/supervisor/frontend.out.log

# Restart
sudo supervisorctl restart frontend
```

---

## 🧪 Testing APIs

### Test with curl
```bash
# Get categories
curl http://localhost:8001/api/categories

# Get distributors
curl http://localhost:8001/api/distributors

# Get blog posts
curl http://localhost:8001/api/blog/posts

# Submit requirement
curl -X POST http://localhost:8001/api/requirements \
  -H "Content-Type: application/json" \
  -d '{
    "businessType": "distributor",
    "category": "food-beverage",
    "productName": "Test Product",
    "companyName": "Test Company",
    "contactPerson": "John Doe",
    "email": "john@example.com",
    "phone": "1234567890",
    "location": "Mumbai",
    "investment": "1lac-2lac",
    "territories": "Maharashtra",
    "description": "Test requirement"
  }'
```

---

## 📦 Key Files to Check

### Frontend
- **`/app/frontend/src/App.js`** - Main app with routing
- **`/app/frontend/src/services/api.js`** - API service layer
- **`/app/frontend/src/pages/Home.jsx`** - Homepage
- **`/app/frontend/src/pages/Distributors.jsx`** - Listing page
- **`/app/frontend/src/components/Header.jsx`** - Navigation
- **`/app/frontend/src/components/Footer.jsx`** - Footer with newsletter

### Backend
- **`/app/backend/server.py`** - FastAPI server with all endpoints
- **`/app/backend/models.py`** - Pydantic models
- **`/app/backend/seed_data.py`** - Database seeding script

### Configuration
- **`/app/frontend/package.json`** - Frontend dependencies
- **`/app/backend/requirements.txt`** - Backend dependencies
- **`/app/contracts.md`** - API contracts & integration plan

---

## 🎯 Integration Status

All components are **fully integrated** with backend APIs:

| Component | Status | API |
|-----------|--------|-----|
| Home | ✅ | Featured distributors, testimonials, blog |
| Distributors | ✅ | Get all with filters |
| Distributor Detail | ✅ | Get by ID |
| Blog | ✅ | Get posts |
| Categories | ✅ | Get all categories |
| Contact | ✅ | Submit form |
| Post Requirement | ✅ | Submit requirement |
| Newsletter | ✅ | Subscribe |

---

## 🎨 Design Features

- **Colors:** Navy Blue (#2C3E95), Orange (#FF6B2C)
- **Typography:** Professional B2B fonts
- **Layout:** Card-based, responsive grid
- **Animations:** Smooth hover effects, transitions
- **Icons:** Lucide React icons
- **Images:** Unsplash API for high-quality images

---

## 📱 Pages

1. **Homepage (/)** - Hero, featured distributors, testimonials, blog
2. **Distributors (/distributors)** - Listing with filters
3. **Distributor Detail (/distributor/:id)** - Full profile
4. **Blog (/blog)** - Blog listing
5. **About (/about)** - Company information
6. **Contact (/contact)** - Contact form
7. **Post Requirement (/post-requirement)** - Requirement form
8. **Sign In (/signin)** - Login page
9. **Join (/join)** - Registration page

---

## 🚀 Deployment Ready

This application is **production-ready** with:
- ✅ Complete frontend & backend
- ✅ Database integration
- ✅ Error handling
- ✅ Loading states
- ✅ Form validation
- ✅ Responsive design
- ✅ Professional UI/UX

---

## 📞 Support

For any questions about the code or implementation:
1. Use the VS Code view to explore files
2. Check `/app/contracts.md` for API details
3. Review component code for integration examples

---

**Built with ❤️ - A complete GetDistributors.com clone**
