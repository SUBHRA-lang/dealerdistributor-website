<?php
// ============================================================
// join.php
// POST /api/join  → register a new user
// ============================================================
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['detail' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

$required = ['userType', 'name', 'email', 'phone', 'company', 'password'];
foreach ($required as $field) {
    if (empty($body[$field])) {
        http_response_code(422);
        echo json_encode(['detail' => "Field '$field' is required"]);
        exit;
    }
}

// Validate email format
if (!filter_var($body['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['detail' => 'Invalid email address']);
    exit;
}

// Hash password
$hashedPassword = password_hash($body['password'], PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("
        INSERT INTO users (user_type, name, email, phone, company, password)
        VALUES (?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $body['userType'],
        $body['name'],
        $body['email'],
        $body['phone'],
        $body['company'],
        $hashedPassword
    ]);

    echo json_encode([
        'success' => true,
        'message' => 'Account created successfully'
    ]);

} catch (PDOException $e) {
    if ($e->getCode() == 23000) { // Duplicate entry
        http_response_code(409);
        echo json_encode(['detail' => 'Email already registered']);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
    }
}
