-- ============================================================
-- full-site-data.sql — Full MySQL Database Schema + Sample Data
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


-- ── Distributors ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS `distributors` (
  `id`               INT AUTO_INCREMENT PRIMARY KEY,
  `name`             VARCHAR(255) NOT NULL,
  `category_name`    VARCHAR(255),
  `logo`             TEXT,
  `product_image`    TEXT,
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


-- ── Users (Authentication) ───────────────────────────────────
CREATE TABLE IF NOT EXISTS `users` (
  `id`         INT AUTO_INCREMENT PRIMARY KEY,
  `name`       VARCHAR(255) NOT NULL,
  `email`      VARCHAR(255) NOT NULL UNIQUE,
  `phone`      VARCHAR(50),
  `company`    VARCHAR(255),
  `user_type`  VARCHAR(50),
  `password`   VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- ── Callbacks (Request Callback) ──────────────────────────────
CREATE TABLE IF NOT EXISTS `callbacks` (
  `id`           INT AUTO_INCREMENT PRIMARY KEY,
  `company_name` VARCHAR(255),
  `full_name`    VARCHAR(255),
  `phone`        VARCHAR(50),
  `city`         VARCHAR(255),
  `product`      VARCHAR(255),
  `pincode`      VARCHAR(20),
  `email`        VARCHAR(255),
  `type`         VARCHAR(50)  COMMENT 'distributor or franchise',
  `intent`       VARCHAR(50)  COMMENT 'appoint or become',
  `status`       VARCHAR(50)  DEFAULT 'pending',
  `created_at`   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- DATA DUMP --

-- DealerDistributors Database Dump
-- Generated on: 2026-03-25 15:27:00
SET NAMES utf8mb4;

-- Table: categories
TRUNCATE TABLE `categories`;
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('Food & Beverage', 'food-beverage', 'UtensilsCrossed', NULL, 1);
INSERT INTO `categories` (`name`, `slug`, `icon`, `description`, `is_active`) VALUES ('FMCG', 'fmcg', 'ShoppingCart', NULL, 1);
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
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (1, 'Epsilon Petrochem', 'Automobile', 'https://placehold.co/200x200/4F46E5/ffffff?text=EP', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=200&fit=crop&auto=format', '₹ 5Lac - ₹10Lac', 1993, '["BIKE ENGINE OIL - KEMRON FLY 4T 20W40 SN", "KEMRON MOTOBIKE 4T 20W50 SL", "KEMRON AEROFLY 4T 10W30 SL", "KEMRON HYDROTECH AW 68 BERAL"]', '08071793082', 'info@epsilonpetrochem.com', 'Leading manufacturer and distributor of premium automotive lubricants and engine oils.', 'Mumbai, Maharashtra', '30+ years', '["Maharashtra", "Gujarat", "Karnataka"]', 1, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (2, 'Jayant Agro-Organics Limited', 'Health & Beauty', 'https://placehold.co/200x200/10B981/ffffff?text=JAO', 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=200&fit=crop&auto=format', '₹ 1Lac - ₹2Lac', 2020, '["EriCare Organic Castor Oil 200ML", "EriCare Organic Castor Oil 50ML", "200ML EriCare Cold-Pressed Castor Oil", "500ML EriCare Cold-Pressed Castor Oil"]', '08758655303', 'info@jayant-agro.com', 'Organic beauty and personal care products manufacturer specializing in natural oils.', 'New Delhi, Delhi', '5+ years', '["All India"]', 1, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (3, 'Eagle Plant Protect Pvt. Ltd.', 'Chemicals', 'https://placehold.co/200x200/F59E0B/ffffff?text=EPP', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=200&fit=crop&auto=format', '₹ 1Lac - ₹2Lac', 2009, '["Disaster Bio Plant Protector", "Paragle Paraquat Dichloride Herbicide", "Boforce Gold Insecticide", "Bhukamp For all types of Crops"]', '07971459539', 'info@eagleplant.com', 'Agricultural chemicals and plant protection products for modern farming.', 'Pune, Maharashtra', '16+ years', '["Maharashtra", "Madhya Pradesh", "Rajasthan"]', 1, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (4, 'Konya Biotech Private Limited', 'Health & Beauty', 'https://placehold.co/200x200/EC4899/ffffff?text=KBL', 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop&auto=format', '₹ 1Lac - ₹5Lac', 2025, '["Tylvalo-WSP TYLVALOSIN 62.5%", "Gentacin-WSP Gentamicin 10%", "Lasalocid-WSP LASALOCID SODIUM 20%", "LincoSpect-WSP LINCOMYCIN 22.2% +SPECTINOMYCIN 44.4%"]', '07971459829', 'info@konyabiotech.com', 'Biotechnology products for health and wellness applications.', 'Bangalore, Karnataka', 'New Entry', '["Karnataka", "Tamil Nadu", "Andhra Pradesh"]', 1, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (5, 'Toreto Retail Private Limited', 'Consumer Electronics', 'https://placehold.co/200x200/8B5CF6/ffffff?text=TR', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=200&fit=crop&auto=format', '₹ 2Lac - ₹5Lac', 2014, '["Fidget Pop Portable Bluetooth speaker", "Party Rockz Bluetooth speaker", "Twin Magno Magnetic wireless Bluetooth speaker", "Wave Mini Portable Bluetooth speaker"]', '07971191167', 'info@toreto.com', 'Consumer electronics brand specializing in audio devices and accessories.', 'Delhi, Delhi', '11+ years', '["North India", "East India"]', 1, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (6, 'Nutrinest Foods', 'Food & Beverage', 'https://placehold.co/200x200/14B8A6/ffffff?text=NF', 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&h=200&fit=crop&auto=format', '₹ 2Lac - ₹3Lac', 2025, '["Peanut Butter Chocolate Flavour 500g [Crunchy]", "Hazelnut Peanut Butter", "Peanut Butter Strawberry 1kg [Crunchy]", "Cookies and Cream"]', '07971191219', 'info@nutrinest.com', 'Premium health food products focusing on natural nut butters and spreads.', 'Mumbai, Maharashtra', 'New Entry', '["Maharashtra", "Gujarat"]', 1, 'active');

-- Exclusive Brands (Hardcoded IDs to match frontend)
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (101, 'Amul', 'Food & Beverage', 'https://ui-avatars.com/api/?name=Amul&background=E8A020&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1550583726-22482e82a414?w=800&h=400&fit=crop', '₹ 1Lac - ₹ 4Lac', 1946, '["Amul Milk", "Amul Butter", "Amul Cheese", "Amul Ice Cream"]', '1800-258-3333', 'info@amul.coop', 'Amul is an Indian dairy state government cooperative society, based at Anand, Gujarat.', 'Anand, Gujarat', '75+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (102, 'Asian Paints', 'Construction & Real Estate', 'https://ui-avatars.com/api/?name=Asian+Paints&background=EF4444&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1589939705384-5185138a047a?w=800&h=400&fit=crop', '₹ 2Lac - ₹ 5Lac', 1942, '["Apex Ultima", "Royale Luxury Emulsion", "Tractor Emulsion"]', '1800-209-5678', 'customercare@asianpaints.com', 'Asian Paints is an Indian multinational paint company, headquartered in Mumbai.', 'Mumbai, Maharashtra', '80+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (103, 'Berger Paints', 'Chemicals', 'https://ui-avatars.com/api/?name=Berger+Paints&background=8B5CF6&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1562564055-71e051d33c19?w=800&h=400&fit=crop', '₹ 1Lac - ₹ 5Lac', 1923, '["Silk Breathe Easy", "Weathercoat Anti Dust", "Luxury Wall Finishes"]', '1800-103-6030', 'consumerfeedback@bergerindia.com', 'Berger Paints India Ltd is the second largest paint company in India.', 'Kolkata, West Bengal', '100+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (104, 'Havells', 'Consumer Electronics', 'https://ui-avatars.com/api/?name=Havells&background=2C3E95&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=800&h=400&fit=crop', '₹ 3Lac - ₹ 8Lac', 1958, '["LED Bulbs", "Wires & Cables", "Fans", "Switchgear"]', '1800-103-1313', 'marketing@havells.com', 'Havells India Limited is one of the largest electrical equipment companies in India.', 'Noida, Uttar Pradesh', '65+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (105, 'Dabur', 'Health & Beauty', 'https://ui-avatars.com/api/?name=Dabur&background=16A34A&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=800&h=400&fit=crop', '₹ 2Lac - ₹ 5Lac', 1884, '["Dabur Honey", "Chyawanprash", "Real Fruit Juice", "Red Paste"]', '1800-103-1644', 'daburcares@dabur.com', 'Dabur India Ltd is one of India\'s leading FMCG Companies and the World\'s largest Ayurvedic and Natural Health Care Company.', 'Ghaziabad, Uttar Pradesh', '130+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (106, 'Marico', 'FMCG', 'https://ui-avatars.com/api/?name=Marico&background=F97316&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1627483262268-9c2b5b2834b5?w=800&h=400&fit=crop', '₹ 1Lac - ₹ 3Lac', 1990, '["Parachute Coconut Oil", "Saffola Edible Oil", "Set Wet Hair Gel"]', '1800-222-248', 'csc@marico.com', 'Marico Limited is one of India\'s leading consumer goods companies operating in global markets.', 'Mumbai, Maharashtra', '30+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (107, 'Cipla', 'Pharmaceuticals', 'https://ui-avatars.com/api/?name=Cipla&background=0EA5E9&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?w=800&h=400&fit=crop', '₹ 5Lac - ₹ 10Lac', 1935, '["Inhalers", "Antibiotics", "Antivirals", "Generic Medicines"]', '1800-262-6262', 'contactus@cipla.com', 'Cipla Limited is an Indian multinational pharmaceutical company, headquartered in Mumbai.', 'Mumbai, Maharashtra', '85+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (108, 'Himalaya', 'Health & Beauty', 'https://ui-avatars.com/api/?name=Himalaya&background=10B981&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=400&fit=crop', '₹ 1Lac - ₹ 3Lac', 1930, '["Purifying Neem Face Wash", "Liv.52", "Septilin", "Herbals"]', '1800-208-1930', 'customer.service@himalayawellness.com', 'Himalaya Wellness Company is an Indian multinational personal care and pharmaceutical company.', 'Bangalore, Karnataka', '90+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (109, 'Pidilite', 'Chemicals', 'https://ui-avatars.com/api/?name=Pidilite&background=DC2626&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop', '₹ 2Lac - ₹ 5Lac', 1959, '["Fevicol", "Dr. Fixit", "M-Seal", "Fevikwik"]', '1800-266-6066', 'csc@pidilite.com', 'Pidilite Industries Limited is an Indian multinational adhesives manufacturing company.', 'Mumbai, Maharashtra', '60+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (110, 'Haldirams', 'Food & Beverage', 'https://ui-avatars.com/api/?name=Haldirams&background=D97706&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=200&fit=crop', '₹ 5Lac - ₹ 15Lac', 1937, '["Aloo Bhujia", "Gulab Jamun", "Ready to Eat Meals", "Sweets"]', '0120-2581029', 'customercare@haldiram.com', 'Haldiram\'s is an Indian sweets, snacks and restaurant company.', 'Nagpur, Maharashtra', '85+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (111, 'Bajaj Electricals', 'Electronics & Electrical Supplies', 'https://ui-avatars.com/api/?name=Bajaj+Electricals&background=1D4ED8&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&h=400&fit=crop', '₹ 3Lac - ₹ 6Lac', 1938, '["Fans", "Lighting", "Mixer Grinders", "Water Heaters"]', '1800-103-5963', 'consumercare@bajajelectricals.com', 'Bajaj Electricals Ltd is an Indian consumer electrical equipment manufacturing company.', 'Mumbai, Maharashtra', '85+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (112, 'Nestle India', 'Food & Beverage', 'https://ui-avatars.com/api/?name=Nestle+India&background=B91C1C&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1610832309351-c127e858f6a1?w=800&h=400&fit=crop', '₹ 5Lac - ₹ 10Lac', 1959, '["Maggi", "Nescafe", "KitKat", "Milkmaid"]', '1800-103-1947', 'wecare@in.nestle.com', 'Nestlé India Limited is the Indian subsidiary of Nestlé which is a Swiss multinational company.', 'Gurugram, Haryana', '60+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (113, 'Patanjali', 'FMCG', 'https://ui-avatars.com/api/?name=Patanjali&background=F59E0B&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1626202346584-c7dd1fb96b92?w=800&h=400&fit=crop', '₹ 1Lac - ₹ 5Lac', 2006, '["Patanjali Honey", "Aloe Vera Juice", "Dant Kanti", "Ghee"]', '1800-180-4108', 'feedback@patanjaliayurved.org', 'Patanjali Ayurved is an Indian multinational consumer goods company.', 'Haridwar, Uttarakhand', '15+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (114, 'Gulf Oil India', 'Automobile', 'https://ui-avatars.com/api/?name=Gulf+Oil+India&background=EF4444&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=400&fit=crop', '₹ 10Lac - ₹ 30Lac', 1901, '["Engine Oils", "Greases", "Coolants", "Brake Fluids"]', '1800-209-4780', 'customercare@gulfoil.co.in', 'Gulf Oil Lubricants India Limited is a part of the Hinduja Group.', 'Mumbai, Maharashtra', '120+ years', '["All India"]', 0, 'active');
INSERT INTO `distributors` (`id`, `name`, `category_name`, `logo`, `product_image`, `investment_range`, `established`, `products`, `phone`, `email`, `description`, `location`, `experience`, `territories`, `is_featured`, `status`) VALUES (115, 'Parle', 'Food & Beverage', 'https://ui-avatars.com/api/?name=Parle&background=F97316&color=fff&size=200&bold=true', 'https://images.unsplash.com/photo-1558947530-cbcf6e9aeeae?w=800&h=400&fit=crop', '₹ 2Lac - ₹ 5Lac', 1929, '["Parle-G", "Hide & Seek", "Monaco", "KrackJack"]', '022-66916911', 'care@parle.biz', 'Parle Products is an Indian multinational consumer goods company.', 'Mumbai, Maharashtra', '90+ years', '["All India"]', 0, 'active');

-- Table: blog_posts
TRUNCATE TABLE `blog_posts`;
INSERT INTO `blog_posts` (`title`, `slug`, `excerpt`, `content`, `image`, `category`, `author`, `published_date`, `is_published`) VALUES ('How to Become a Distributor of Raj Hing & Peda: A Profitable Business Opportunity', 'raj-hing-peda-distributor', 'According to the current and fast growing Indian FMCG market, the aspect of authentic taste, traditional ingredients as well as reliable quality in the market is defining consumer buying behavior...', 'Full article content goes here...', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop', 'Business Opportunities', 'DealerDistributors Team', '2026-03-20 05:55:53.983000', 1);
INSERT INTO `blog_posts` (`title`, `slug`, `excerpt`, `content`, `image`, `category`, `author`, `published_date`, `is_published`) VALUES ('Start Your Journey as a Peanut Butter Distributor', 'peanut-butter-distributor', 'The growth of the Health Food Industry around the World is increasing rapidly. Peanut butter has become a dominant product in the Plant Protein category...', 'Full article content goes here...', 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=400&h=250&fit=crop', 'Food & Beverage', 'DealerDistributors Team', '2026-03-20 05:55:53.983000', 1);
INSERT INTO `blog_posts` (`title`, `slug`, `excerpt`, `content`, `image`, `category`, `author`, `published_date`, `is_published`) VALUES ('The Ultimate Guide to Product Distributorships and How They Work', 'distributorship-guide', 'Understanding the distributorship model and how it can help you expand your business reach across multiple territories and markets...', 'Full article content goes here...', 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop', 'Guide', 'DealerDistributors Team', '2026-03-20 05:55:53.983000', 1);

-- Table: testimonials
TRUNCATE TABLE `testimonials`;
INSERT INTO `testimonials` (`name`, `designation`, `company`, `image`, `testimonial`, `rating`, `is_featured`) VALUES ('Mr Subhash Gangadhar Chandane', 'General Manager', 'Greensense Energy Systems Pvt. Ltd.', 'https://placehold.co/100x100/4F46E5/ffffff?text=SC', 'I am extremely satisfied with the services provided by DealerDistributors. Since I joined them, I have received a good number of inquiries. They have exceeded my expectations and provided exceptional service so far.', 5, 1);
INSERT INTO `testimonials` (`name`, `designation`, `company`, `image`, `testimonial`, `rating`, `is_featured`) VALUES ('Mr Saud Dastagir', 'General Manager', 'Soft Touchline Products Pvt. Ltd.', 'https://placehold.co/100x100/10B981/ffffff?text=SD', 'DealerDistributors.com is a commercial miracle that impressed us right after we signed up. Our specific needs were promptly met thanks to the dedicated account manager''s personalized service.', 5, 1);
INSERT INTO `testimonials` (`name`, `designation`, `company`, `image`, `testimonial`, `rating`, `is_featured`) VALUES ('Mr. Sheeju Varghese', 'Director', 'Powertroniks Solar Pvt. Ltd.', 'https://placehold.co/100x100/F59E0B/ffffff?text=SV', 'Since we started using DealerDistributors.com, our business has been completely transformed. Our account manager was exceptionally helpful and provided us with guidance every step of the way.', 5, 1);
