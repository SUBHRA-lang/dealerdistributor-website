<?php
// ============================================================
// db.php — MySQL Database Connection
// ============================================================
// Edit these 4 values with your cPanel MySQL credentials.
// You get these from cPanel > MySQL Databases section.
// ============================================================

// ============================================================
// Detect Environment (Local vs cPanel)
// ============================================================
$is_local = in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']) || $_SERVER['HTTP_HOST'] === 'localhost';

if ($is_local) {
    // LOCAL DEVELOPMENT (Mac Homebrew MySQL)
    $DB_HOST = 'localhost';
    $DB_NAME = 'dealerdistributors';
    $DB_USER = 'root';
    $DB_PASS = ''; // Default Homebrew MySQL has no password
} else {
    // cPanel DEPLOYMENT (Shared Hosting)
    // ⚠️ Edit these for your live server
    $DB_HOST = 'localhost';
    $DB_NAME = 'your_db_name';
    $DB_USER = 'your_db_user';
    $DB_PASS = 'your_db_password';
}

try {
    $pdo = new PDO(
        "mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4",
        $DB_USER,
        $DB_PASS,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}
