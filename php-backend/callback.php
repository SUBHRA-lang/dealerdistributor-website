<?php
// ============================================================
// callback.php
// POST /api/callback  → submit a callback request
// ============================================================
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['detail' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

$required = ['type', 'intent', 'companyName', 'fullName', 'phone', 'city', 'product', 'pincode', 'email'];
foreach ($required as $field) {
    if (empty($body[$field])) {
        http_response_code(422);
        echo json_encode(['detail' => "Field '$field' is required"]);
        exit;
    }
}

try {
    $stmt = $pdo->prepare("
        INSERT INTO callbacks (type, intent, company_name, full_name, phone, city, product, pincode, email)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");
    $stmt->execute([
        $body['type'],
        $body['intent'],
        $body['companyName'],
        $body['fullName'],
        $body['phone'],
        $body['city'],
        $body['product'],
        $body['pincode'],
        $body['email']
    ]);

    // Send notification email
    $to = "query@dealerdistributors.com";
    $subject = "New Callback Request: " . ucfirst($body['type']);
    $message = "You have a new callback request.\n\n" .
               "Type: " . $body['type'] . "\n" .
               "Intent: " . $body['intent'] . "\n" .
               "Company: " . $body['companyName'] . "\n" .
               "Name: " . $body['fullName'] . "\n" .
               "Phone: " . $body['phone'] . "\n" .
               "Email: " . $body['email'] . "\n" .
               "City: " . $body['city'] . "\n" .
               "Product: " . $body['product'] . "\n" .
               "Pincode: " . $body['pincode'];
    
    $headers = "From: system@dealerdistributors.com";
    
    @mail($to, $subject, $message, $headers);

    echo json_encode([
        'success' => true,
        'message' => 'Callback request submitted successfully'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
