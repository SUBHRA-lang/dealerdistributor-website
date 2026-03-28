<?php
// ============================================================
// db.php — MySQL Database Connection
// ============================================================
// Edit these 4 values with your cPanel MySQL credentials.
// You get these from cPanel > MySQL Databases section.
// ============================================================

// ============================================================
// Load .env file if exists
// ============================================================
if (file_exists(__DIR__ . '/.env')) {
    $lines = file(__DIR__ . '/.env', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        list($name, $value) = explode('=', $line, 2);
        $_ENV[trim($name)] = trim($value);
    }
}

// ============================================================
// Detect Environment (Local vs cPanel)
// ============================================================
$is_local = (isset($_SERVER['REMOTE_ADDR']) && in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1'])) 
            || (isset($_SERVER['HTTP_HOST']) && $_SERVER['HTTP_HOST'] === 'localhost')
            || php_sapi_name() === 'cli';

// ── Database Configuration
$DB_HOST = $_ENV['DB_HOST'] ?? 'localhost';
$DB_NAME = $_ENV['DB_NAME'] ?? 'your_db_name';
$DB_USER = $_ENV['DB_USER'] ?? 'your_db_user';
$DB_PASS = $_ENV['DB_PASS'] ?? 'your_db_password';

// Override for local if NOT using .env
if (!$is_local && $DB_NAME === 'your_db_name') {
    // This is a safety fallback for cPanel if .env is missing
    // and the code hasn't been updated with actual credentials.
} elseif ($is_local && !isset($_ENV['DB_NAME'])) {
    $DB_NAME = 'dealerdistributors';
    $DB_USER = 'root';
    $DB_PASS = '';
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
