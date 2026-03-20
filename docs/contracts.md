# GetDistributors.com - Backend Integration Contracts

## Overview
This document outlines the API contracts, data models, and integration plan for replacing mock data with real backend functionality.

---

## 1. MongoDB Collections & Models

### 1.1 Categories Collection
```json
{
  "_id": ObjectId,
  "name": "Food & Beverage",
  "slug": "food-beverage",
  "icon": "UtensilsCrossed",
  "description": "Food and beverage products",
  "created_at": ISODate,
  "is_active": true
}
```

### 1.2 Distributors Collection
```json
{
  "_id": ObjectId,
  "name": "Epsilon Petrochem",
  "category_id": ObjectId,
  "category_name": "Automobile",
  "logo": "url",
  "investment_range": "₹ 5Lac - ₹10Lac",
  "established": 1993,
  "products": ["product1", "product2"],
  "phone": "08071793082",
  "email": "info@company.com",
  "description": "Company description",
  "location": "Mumbai, Maharashtra",
  "experience": "30+ years",
  "territories": ["Maharashtra", "Gujarat"],
  "is_featured": true,
  "status": "active",
  "created_at": ISODate,
  "updated_at": ISODate
}
```

### 1.3 Blog Posts Collection
```json
{
  "_id": ObjectId,
  "title": "Post title",
  "slug": "post-slug",
  "excerpt": "Short description",
  "content": "Full content",
  "image": "url",
  "category": "Business Opportunities",
  "author": "GetDistributors Team",
  "published_date": ISODate,
  "is_published": true,
  "created_at": ISODate,
  "updated_at": ISODate
}
```

### 1.4 Testimonials Collection
```json
{
  "_id": ObjectId,
  "name": "Mr Subhash Gangadhar Chandane",
  "designation": "General Manager",
  "company": "Greensense Energy Systems Pvt. Ltd.",
  "image": "url",
  "testimonial": "Text content",
  "rating": 5,
  "is_featured": true,
  "created_at": ISODate
}
```

### 1.5 Requirements Collection
```json
{
  "_id": ObjectId,
  "business_type": "distributor",
  "category_id": ObjectId,
  "product_name": "Organic Food Products",
  "company_name": "ABC Foods",
  "contact_person": "John Doe",
  "email": "john@company.com",
  "phone": "+91 9876543210",
  "location": "Mumbai, Maharashtra",
  "investment_range": "1lac-2lac",
  "territories": "Maharashtra, Gujarat",
  "description": "Detailed requirements",
  "status": "pending",
  "created_at": ISODate
}
```

### 1.6 Contact Submissions Collection
```json
{
  "_id": ObjectId,
  "name": "John Doe",
  "email": "john@email.com",
  "phone": "+91 9876543210",
  "subject": "Inquiry",
  "message": "Message content",
  "status": "new",
  "created_at": ISODate
}
```

### 1.7 Newsletter Subscriptions Collection
```json
{
  "_id": ObjectId,
  "email": "user@email.com",
  "subscribed_at": ISODate,
  "is_active": true
}
```

---

## 2. API Endpoints

### 2.1 Categories API
- `GET /api/categories` - Get all categories
- `GET /api/categories/{slug}` - Get category by slug

### 2.2 Distributors API
- `GET /api/distributors` - Get all distributors (with filters)
  - Query params: `category`, `investment_range`, `location`, `sort_by`, `limit`, `skip`
- `GET /api/distributors/{id}` - Get distributor by ID
- `GET /api/distributors/featured` - Get featured distributors
- `POST /api/distributors/search` - Search distributors

### 2.3 Blog API
- `GET /api/blog/posts` - Get all blog posts (with pagination)
  - Query params: `category`, `limit`, `skip`
- `GET /api/blog/posts/{id}` - Get blog post by ID
- `GET /api/blog/posts/slug/{slug}` - Get blog post by slug

### 2.4 Testimonials API
- `GET /api/testimonials` - Get all testimonials
- `GET /api/testimonials/featured` - Get featured testimonials

### 2.5 Requirements API
- `POST /api/requirements` - Submit a requirement

### 2.6 Contact API
- `POST /api/contact` - Submit contact form

### 2.7 Newsletter API
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

---

## 3. Mock Data to Replace

### Frontend Mock Data (src/data/mockData.js):
- ✅ `categories` - Replace with API call to `/api/categories`
- ✅ `distributors` - Replace with API call to `/api/distributors`
- ✅ `testimonials` - Replace with API call to `/api/testimonials`
- ✅ `blogPosts` - Replace with API call to `/api/blog/posts`
- ✅ `videoTestimonials` - Keep as static (YouTube embeds)

---

## 4. Backend Implementation Plan

### Phase 1: Database Models & Seed Data
1. Create Pydantic models for all collections
2. Create seed data script to populate initial data
3. Test MongoDB connections

### Phase 2: API Endpoints
1. Implement Categories endpoints
2. Implement Distributors endpoints (with search/filter)
3. Implement Blog endpoints
4. Implement Testimonials endpoints
5. Implement Forms endpoints (Requirements, Contact, Newsletter)

### Phase 3: Frontend Integration
1. Create API service layer in frontend (src/services/api.js)
2. Replace mock data imports with API calls
3. Add loading states and error handling
4. Update components to use real data

---

## 5. Frontend-Backend Integration

### API Service Structure (frontend/src/services/api.js):
```javascript
const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const categoriesAPI = {
  getAll: () => axios.get(`${API}/categories`),
  getBySlug: (slug) => axios.get(`${API}/categories/${slug}`)
};

export const distributorsAPI = {
  getAll: (params) => axios.get(`${API}/distributors`, { params }),
  getById: (id) => axios.get(`${API}/distributors/${id}`),
  getFeatured: () => axios.get(`${API}/distributors/featured`)
};

// ... similar for other endpoints
```

### Components to Update:
1. **Home.jsx** - Fetch featured distributors, testimonials, blog posts
2. **Distributors.jsx** - Fetch all distributors with filters
3. **DistributorDetail.jsx** - Fetch single distributor
4. **Blog.jsx** - Fetch blog posts
5. **CategorySidebar.jsx** - Fetch categories
6. **PostRequirement.jsx** - Submit to API
7. **Contact.jsx** - Submit to API
8. **Footer.jsx** - Newsletter subscription to API

---

## 6. Error Handling & Loading States

### Frontend:
- Add loading spinners while fetching data
- Add error messages for failed requests
- Add empty states when no data available
- Add retry mechanisms

### Backend:
- Proper HTTP status codes
- Consistent error response format
- Request validation
- Rate limiting for forms

---

## 7. Search & Filter Implementation

### Distributor Search:
- Text search in name, products, description
- Filter by category
- Filter by investment range
- Filter by location
- Sort by: newest, investment (low-high, high-low), established year

### Implementation:
- Backend: MongoDB text indexes and aggregation
- Frontend: Query params in URL for bookmarkable searches

---

This contract ensures seamless integration between frontend mock data and real backend APIs.
