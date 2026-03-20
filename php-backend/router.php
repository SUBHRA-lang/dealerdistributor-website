<?php
// ============================================================
// router.php — Local Development Router
// Simulates .htaccess rewrite rules for the PHP built-in server
// ============================================================

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = ltrim($uri, '/');

// Support /api prefix if included
if (strpos($uri, 'api/') === 0) {
    $uri = substr($uri, 4);
}

// ── Health Check
if ($uri === '' || $uri === 'index.php') {
    require 'index.php';
    exit;
}

// ── Categories
if ($uri === 'categories' || $uri === 'categories/') {
    require 'categories.php';
    exit;
}
if (preg_match('#^categories/([^/]+)/?$#', $uri, $matches)) {
    $_GET['slug'] = $matches[1];
    require 'categories.php';
    exit;
}

// ── Distributors
if ($uri === 'distributors' || $uri === 'distributors/') {
    require 'distributors.php';
    exit;
}
if ($uri === 'distributors/featured' || $uri === 'distributors/featured/') {
    $_GET['featured'] = '1';
    require 'distributors.php';
    exit;
}
if (preg_match('#^distributors/([0-9]+)/?$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    require 'distributors.php';
    exit;
}

// ── Blog
if ($uri === 'blog/posts' || $uri === 'blog/posts/') {
    require 'blog.php';
    exit;
}
if (preg_match('#^blog/posts/([0-9]+)/?$#', $uri, $matches)) {
    $_GET['id'] = $matches[1];
    require 'blog.php';
    exit;
}

// ── Testimonials
if ($uri === 'testimonials' || $uri === 'testimonials/') {
    require 'testimonials.php';
    exit;
}
if ($uri === 'testimonials/featured' || $uri === 'testimonials/featured/') {
    $_GET['featured'] = '1';
    require 'testimonials.php';
    exit;
}

// ── POST Endpoints
if ($uri === 'requirements') {
    require 'requirements.php';
    exit;
}
if ($uri === 'contact') {
    require 'contact.php';
    exit;
}
if ($uri === 'newsletter/subscribe') {
    require 'newsletter.php';
    exit;
}

// Default: 404
http_response_code(404);
echo json_encode(['error' => 'Endpoint not found', 'uri' => $uri]);
