#!/bin/bash
# ============================================================
# local-start.sh — Start Local PHP/MySQL Dev Environment
# ============================================================

echo "🚀 Starting Local PHP/MySQL Dev Environment..."

# 1. Start MySQL via Homebrew
if ! brew services list | grep -q "mysql.*started"; then
    echo "📦 Starting MySQL service..."
    brew services start mysql
else
    echo "✅ MySQL is already running."
fi

# 2. Check if database exists
DB_EXISTS=$(mysql -u root -e "SHOW DATABASES LIKE 'dealerdistributors';" | grep dealerdistributors)
if [ -z "$DB_EXISTS" ]; then
    echo "🗄️ Database missing. Creating and importing data..."
    mysql -u root -e "CREATE DATABASE dealerdistributors;"
    mysql -u root dealerdistributors < php-backend/full-site-data.sql
fi

# 3. Start PHP Server
echo "🐘 Starting PHP Local Server on http://localhost:8001..."
cd php-backend && php -S localhost:8001 router.php
