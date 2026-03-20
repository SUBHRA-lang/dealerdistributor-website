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


-- DATA DUMP --

-- DealerDistributors Database Dump
-- Generated on: 2026-03-20 13:10:23
SET NAMES utf8mb4;

-- Table: categories
TRUNCATE TABLE `categories`;
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Food & Beverage', 'food-beverage', 'UtensilsCrossed', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Health & Beauty', 'health-beauty', 'Heart', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Pharmaceuticals', 'pharmaceuticals', 'Pill', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Apparel & Fashion', 'apparel-fashion', 'Shirt', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Chemicals', 'chemicals', 'Beaker', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Home Supplies', 'home-supplies', 'Home', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Construction & Real Estate', 'construction-real-estate', 'Building2', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Electronics & Electrical Supplies', 'electronics-electrical', 'Zap', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Agriculture', 'agriculture', 'Wheat', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Automobile', 'automobile', 'Car', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Packaging & Paper', 'packaging-paper', 'Package', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Hospital & Medical Supplies', 'hospital-medical', 'Hospital', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Gifts & Crafts', 'gifts-crafts', 'Gift', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Consumer Electronics', 'consumer-electronics', 'Laptop', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Pipes, Tubes & Fittings', 'pipes-tubes', 'Pipette', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Industrial Supplies', 'industrial-supplies', 'Factory', NULL, 1);

-- Table: distributors
TRUNCATE TABLE `distributors`;
INSERT INTO `distributors` (`name`, `category_name`, `logo`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES ('Epsilon Petrochem', 'Automobile', 'https://via.placeholder.com/200x200/4F46E5/ffffff?text=EP', '₹ 5Lac - ₹10Lac', 1993, '["BIKE ENGINE OIL - KEMRON FLY 4T 20W40 SN", "KEMRON MOTOBIKE 4T 20W50 SL", "KEMRON AEROFLY 4T 10W30 SL", "KEMRON HYDROTECH AW 68 BERAL"]', '08071793082', 'info@epsilonpetrochem.com', 'Leading manufacturer and distributor of premium automotive lubricants and engine oils.', 'Mumbai, Maharashtra', '30+ years', '["Maharashtra", "Gujarat", "Karnataka"]', 1, 'active');
INSERT INTO `distributors` (`name`, `category_name`, `logo`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES ('Jayant Agro-Organics Limited', 'Health & Beauty', 'https://via.placeholder.com/200x200/10B981/ffffff?text=JAO', '₹ 1Lac - ₹2Lac', 2020, '["EriCare Organic Castor Oil 200ML", "EriCare Organic Castor Oil 50ML", "200ML EriCare Cold-Pressed Castor Oil", "500ML EriCare Cold-Pressed Castor Oil"]', '08758655303', 'info@jayant-agro.com', 'Organic beauty and personal care products manufacturer specializing in natural oils.', 'New Delhi, Delhi', '5+ years', '["All India"]', 1, 'active');
INSERT INTO `distributors` (`name`, `category_name`, `logo`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES ('Eagle Plant Protect Pvt. Ltd.', 'Chemicals', 'https://via.placeholder.com/200x200/F59E0B/ffffff?text=EPP', '₹ 1Lac - ₹2Lac', 2009, '["Disaster Bio Plant Protector", "Paragle Paraquat Dichloride Herbicide", "Boforce Gold Insecticide", "Bhukamp For all types of Crops"]', '07971459539', 'info@eagleplant.com', 'Agricultural chemicals and plant protection products for modern farming.', 'Pune, Maharashtra', '16+ years', '["Maharashtra", "Madhya Pradesh", "Rajasthan"]', 1, 'active');
INSERT INTO `distributors` (`name`, `category_name`, `logo`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES ('Konya Biotech Private Limited', 'Health & Beauty', 'https://via.placeholder.com/200x200/EC4899/ffffff?text=KBL', '₹ 1Lac - ₹5Lac', 2025, '["Tylvalo-WSP TYLVALOSIN 62.5%", "Gentacin-WSP Gentamicin 10%", "Lasalocid-WSP LASALOCID SODIUM 20%", "LincoSpect-WSP LINCOMYCIN 22.2% +SPECTINOMYCIN 44.4%"]', '07971459829', 'info@konyabiotech.com', 'Biotechnology products for health and wellness applications.', 'Bangalore, Karnataka', 'New Entry', '["Karnataka", "Tamil Nadu", "Andhra Pradesh"]', 1, 'active');
INSERT INTO `distributors` (`name`, `category_name`, `logo`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES ('Toreto Retail Private Limited', 'Consumer Electronics', 'https://via.placeholder.com/200x200/8B5CF6/ffffff?text=TR', '₹ 2Lac - ₹5Lac', 2014, '["Fidget Pop Portable Bluetooth speaker", "Party Rockz Bluetooth speaker", "Twin Magno Magnetic wireless Bluetooth speaker", "Wave Mini Portable Bluetooth speaker"]', '07971191167', 'info@toreto.com', 'Consumer electronics brand specializing in audio devices and accessories.', 'Delhi, Delhi', '11+ years', '["North India", "East India"]', 1, 'active');
INSERT INTO `distributors` (`name`, `category_name`, `logo`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES ('Nutrinest Foods', 'Food & Beverage', 'https://via.placeholder.com/200x200/14B8A6/ffffff?text=NF', '₹ 2Lac - ₹3Lac', 2025, '["Peanut Butter Chocolate Flavour 500g [Crunchy]", "Hazelnut Peanut Butter", "Peanut Butter Strawberry 1kg [Crunchy]", "Cookies and Cream"]', '07971191219', 'info@nutrinest.com', 'Premium health food products focusing on natural nut butters and spreads.', 'Mumbai, Maharashtra', 'New Entry', '["Maharashtra", "Gujarat"]', 1, 'active');

-- Table: blog_posts
TRUNCATE TABLE `blog_posts`;
INSERT INTO `blog_posts` (`title`, `slug`, `excerpt`, `content`, `image`, `category`, `author`, `published_date`, `is_published`) VALUES ('How to Become a Distributor of Raj Hing & Peda: A Profitable Business Opportunity', 'raj-hing-peda-distributor', 'According to the current and fast growing Indian FMCG market, the aspect of authentic taste, traditional ingredients as well as reliable quality in the market is defining consumer buying behavior...', 'Full article content goes here...', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop', 'Business Opportunities', 'DealerDistributors Team', '2026-03-20 05:55:53.983000', 1);
INSERT INTO `blog_posts` (`title`, `slug`, `excerpt`, `content`, `image`, `category`, `author`, `published_date`, `is_published`) VALUES ('Start Your Journey as a Peanut Butter Distributor', 'peanut-butter-distributor', 'The growth of the Health Food Industry around the World is increasing rapidly. Peanut butter has become a dominant product in the Plant Protein category...', 'Full article content goes here...', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=250&fit=crop', 'Food & Beverage', 'DealerDistributors Team', '2026-03-20 05:55:53.983000', 1);
INSERT INTO `blog_posts` (`title`, `slug`, `excerpt`, `content`, `image`, `category`, `author`, `published_date`, `is_published`) VALUES ('The Ultimate Guide to Product Distributorships and How They Work', 'distributorship-guide', 'Understanding the distributorship model and how it can help you expand your business reach across multiple territories and markets...', 'Full article content goes here...', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop', 'Guide', 'DealerDistributors Team', '2026-03-20 05:55:53.983000', 1);

-- Table: testimonials
TRUNCATE TABLE `testimonials`;
INSERT INTO `testimonials` (`name`, `designation`, `company`, `image`, `testimonial`, `rating`, `is_featured`) VALUES ('Mr Subhash Gangadhar Chandane', 'General Manager', 'Greensense Energy Systems Pvt. Ltd.', 'https://via.placeholder.com/100x100/4F46E5/ffffff?text=SC', 'I am extremely satisfied with the services provided by DealerDistributors. Since I joined them, I have received a good number of inquiries. They have exceeded my expectations and provided exceptional service so far.', 5, 1);
INSERT INTO `testimonials` (`name`, `designation`, `company`, `image`, `testimonial`, `rating`, `is_featured`) VALUES ('Mr Saud Dastagir', 'General Manager', 'Soft Touchline Products Pvt. Ltd.', 'https://via.placeholder.com/100x100/10B981/ffffff?text=SD', 'DealerDistributors.com is a commercial miracle that impressed us right after we signed up. Our specific needs were promptly met thanks to the dedicated account manager''s personalized service.', 5, 1);
INSERT INTO `testimonials` (`name`, `designation`, `company`, `image`, `testimonial`, `rating`, `is_featured`) VALUES ('Mr. Sheeju Varghese', 'Director', 'Powertroniks Solar Pvt. Ltd.', 'https://via.placeholder.com/100x100/F59E0B/ffffff?text=SV', 'Since we started using DealerDistributors.com, our business has been completely transformed. Our account manager was exceptionally helpful and provided us with guidance every step of the way.', 5, 1);
