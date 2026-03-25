# cPanel Deployment Guide

## 🚀 Quick Re-deploy (Latest Changes)
To update the website with the new **Authentication** and **Forms** features:
1. **Frontend**: `cd frontend`, set `.env` to production, `npm run build`, zip/upload `build/` contents to `public_html/`.
2. **Backend**: Upload `php-backend/` files to `public_html/api/` (Override existing).
3. **Database**: Run new `CREATE TABLE` commands in `php-backend/setup.sql` via phpMyAdmin.

---

## Folder Structure on cPanel

```
public_html/
├── index.html          ← React build files
├── static/             ← React JS/CSS/images
├── .htaccess           ← React SPA routing (already have this)
└── api/                ← Upload php-backend/ contents HERE
    ├── .htaccess       ← PHP URL routing
    ├── db.php          ← DB credentials ⚠️ EDIT THIS
    ├── index.php
    ├── cors.php
    ├── categories.php
    ├── distributors.php
    ├── blog.php
    ├── testimonials.php
    ├── requirements.php
    ├── contact.php
    ├── newsletter.php
    ├── join.php            ← NEW (User Registration)
    ├── signin.php          ← NEW (User Sign In)
    └── callback.php        ← NEW (Callback Requests)
```

---

## Step-by-Step Deployment

### 1. Set up the Database (MySQL)
1. Login to **cPanel** → go to **MySQL Databases**
2. Create a new database, e.g. `cpanelusername_dealerdb`
3. Create a database user with a strong password
4. Add the user to the database (give **All Privileges**)
5. Go to **phpMyAdmin** → select your database → click **SQL** tab
6. Paste the contents of `php-backend/setup.sql` → click **Go**

### 2. Configure `db.php`
Open `php-backend/db.php` and edit these 4 lines:
```php
$DB_NAME = 'cpanelusername_dealerdb';  // Your database name
$DB_USER = 'cpanelusername_dbuser';    // Your DB username
$DB_PASS = 'your_strong_password';     // Your DB password
$DB_HOST = 'localhost';                // Keep as localhost
```

### 3. Build & Upload Frontend
```bash
# In your local terminal:
cd frontend
yarn build
```
Then upload everything inside `frontend/build/` → to `public_html/` via:
- **cPanel File Manager** → Upload zip → Extract, OR
- **FTP** (FileZilla) → drag and drop

### 4. Upload PHP Backend
Upload all files from `php-backend/` folder → to `public_html/api/` (create the `api` folder if it doesn't exist)

> ⚠️ Make sure `.htaccess` is uploaded too — cPanel File Manager hides dot files. Enable "Show Hidden Files" in File Manager settings.

### 5. Update Frontend Environment Variable
Edit `frontend/.env` **before building**:
```
REACT_APP_BACKEND_URL=https://dealerdistributors.com
```
The React app will then call `https://dealerdistributors.com/api/distributors` etc. — which are handled by the PHP files.

### 6. Verify It Works
Open these URLs in your browser — each should return JSON:
- `https://dealerdistributors.com/api/` → health check
- `https://dealerdistributors.com/api/categories` → categories list
- `https://dealerdistributors.com/api/distributors` → distributors list
- `https://dealerdistributors.com/api/blog/posts` → blog posts

---

## Adding Content (Data Entry)

Since there's no admin panel yet, add data directly via **phpMyAdmin**:
1. cPanel → phpMyAdmin → select your database
2. Click on a table (e.g. `distributors`) → **Insert** tab
3. Fill in the fields and click **Go**

**Products and territories fields** must be valid JSON arrays, e.g.:
```json
["Product A", "Product B", "Product C"]
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 500 error on API | Check `db.php` credentials |
| 404 on `/api/distributors` | Make sure `api/.htaccess` was uploaded |
| React page shows blank | Check `public_html/.htaccess` exists |
| CORS error in browser | `cors.php` is included in every file — verify upload |
| `.htaccess` not working | cPanel → Apache → Enable `mod_rewrite` (usually enabled by default) |
