-- ============================================================
-- setup.sql — Full MySQL Database Schema
-- Run this in cPanel > phpMyAdmin:
--   1. Create a new database (e.g. cpanelusername_dealerdb)
--   2. Select the database
--   3. Click "SQL" tab → paste this → click Go
-- ============================================================

SET NAMES utf8mb4;
SET time_zone = '+00:00';

-- ── Categories ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `categories` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(255) NOT NULL,
  `slug`       VARCHAR(255) NOT NULL UNIQUE,
  `icon`       VARCHAR(255),
  `description` TEXT,
  `is_active`  TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Sample categories (matching original seed data)
INSERT INTO `categories` (`name`, `slug`, `icon`) VALUES
  ('Electronics',     'electronics',   '💻'),
  ('Fashion',         'fashion',       '👗'),
  ('Food & Beverage', 'food-beverage', '🍔'),
  ('Healthcare',      'healthcare',    '🏥'),
  ('Home Appliances', 'home-appliances','🏠'),
  ('Automobiles',     'automobiles',   '🚗'),
  ('Education',       'education',     '📚'),
  ('Sports',          'sports',        '⚽');


-- ── Distributors ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `distributors` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `name`             VARCHAR(255) NOT NULL,
  `category_name`    VARCHAR(255),
  `logo`             TEXT,
  `investment_range` VARCHAR(100),
  `established`      INT,
  `products`         TEXT  COMMENT 'JSON array of product names',
  `phone`            VARCHAR(50),
  `email`            VARCHAR(255),
  `description`      TEXT,
  `location`         VARCHAR(255),
  `experience`       VARCHAR(100),
  `territories`      TEXT  COMMENT 'JSON array of territory names',
  `is_featured`      TINYINT(1) DEFAULT 0,
  `status`           VARCHAR(50) DEFAULT 'active',
  `created_at`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX (`status`),
  INDEX (`is_featured`),
  INDEX (`category_name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ── Blog Posts ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `blog_posts` (
  `id`             INT AUTO_INCREMENT PRIMARY KEY,
  `title`          VARCHAR(500),
  `slug`           VARCHAR(500) UNIQUE,
  `excerpt`        TEXT,
  `content`        LONGTEXT,
  `image`          TEXT,
  `category`       VARCHAR(255),
  `author`         VARCHAR(255) DEFAULT 'DealerDistributors Team',
  `published_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_published`   TINYINT(1) DEFAULT 1,
  `created_at`     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (`is_published`),
  INDEX (`published_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ── Testimonials ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `testimonials` (
  `id`          INT AUTO_INCREMENT PRIMARY KEY,
  `name`        VARCHAR(255),
  `designation` VARCHAR(255),
  `company`     VARCHAR(255),
  `image`       TEXT,
  `testimonial` TEXT,
  `rating`      INT DEFAULT 5,
  `is_featured` TINYINT(1) DEFAULT 0,
  `created_at`  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (`is_featured`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ── Requirements (from Post Requirement form) ────────────────
CREATE TABLE IF NOT EXISTS `requirements` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `business_type`    VARCHAR(100),
  `category`         VARCHAR(255),
  `product_name`     VARCHAR(255),
  `company_name`     VARCHAR(255),
  `contact_person`   VARCHAR(255),
  `email`            VARCHAR(255),
  `phone`            VARCHAR(50),
  `location`         VARCHAR(255),
  `investment_range` VARCHAR(100),
  `territories`      TEXT,
  `description`      TEXT,
  `status`           VARCHAR(50) DEFAULT 'pending',
  `created_at`       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ── Contact Form Submissions ─────────────────────────────────
CREATE TABLE IF NOT EXISTS `contacts` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(255),
  `email`      VARCHAR(255),
  `phone`      VARCHAR(50),
  `subject`    VARCHAR(500),
  `message`    TEXT,
  `status`     VARCHAR(50) DEFAULT 'new',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ── Newsletter Subscribers ───────────────────────────────────
CREATE TABLE IF NOT EXISTS `newsletter` (
  `id`            INT AUTO_INCREMENT PRIMARY KEY,
  `email`         VARCHAR(255) NOT NULL UNIQUE,
  `subscribed_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `is_active`     TINYINT(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
