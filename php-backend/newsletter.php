<?php
// ============================================================
// newsletter.php
// POST /api/newsletter/subscribe  → subscribe an email address
// ============================================================
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['detail' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

if (empty($body['email'])) {
    http_response_code(422);
    echo json_encode(['detail' => 'Email is required']);
    exit;
}

if (!filter_var($body['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['detail' => 'Invalid email address']);
    exit;
}

$email = strtolower(trim($body['email']));

try {
    // Check if already subscribed
    $stmt = $pdo->prepare("SELECT id FROM newsletter WHERE email = ? LIMIT 1");
    $stmt->execute([$email]);
    $existing = $stmt->fetch();

    if ($existing) {
        echo json_encode([
            'success' => true,
            'message' => 'You are already subscribed to our newsletter',
        ]);
        exit;
    }

    // New subscriber
    $stmt = $pdo->prepare("INSERT INTO newsletter (email, is_active) VALUES (?, 1)");
    $stmt->execute([$email]);

    $newId = $pdo->lastInsertId();
    echo json_encode([
        'success' => true,
        'message' => 'Successfully subscribed to newsletter',
        'id'      => (string) $newId,
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
