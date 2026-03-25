<?php
// ============================================================
// contact.php
// POST /api/contact  → submit contact form message
// ============================================================
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['detail' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

// Required fields (matches Pydantic ContactCreate)
$required = ['name', 'email', 'phone', 'subject', 'message'];
foreach ($required as $field) {
    if (empty($body[$field])) {
        http_response_code(422);
        echo json_encode(['detail' => "Field '$field' is required"]);
        exit;
    }
}

if (!filter_var($body['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['detail' => 'Invalid email address']);
    exit;
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO contacts (name, email, phone, subject, message, status)
        VALUES (?, ?, ?, ?, ?, 'new')
    ");
    $stmt->execute([
        htmlspecialchars($body['name']),
        $body['email'],
        $body['phone'],
        htmlspecialchars($body['subject']),
        htmlspecialchars($body['message']),
    ]);

    $newId = $pdo->lastInsertId();

    // Send email notification to admin
    $to = "query@dealerdistributors.com";
    $subject = "New Contact/Feedback: " . $body['subject'];
    $message = "You have received a new message.\n\n" .
               "From: " . $body['name'] . "\n" .
               "Email: " . $body['email'] . "\n" .
               "Phone: " . $body['phone'] . "\n" .
               "Subject: " . $body['subject'] . "\n\n" .
               "Message:\n" . $body['message'];
    
    $headers = "From: system@dealerdistributors.com";
    @mail($to, $subject, $message, $headers);

    echo json_encode([
        'success' => true,
        'message' => 'Thank you for contacting us. We will get back to you soon.',
        'id'      => (string) $newId,
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
