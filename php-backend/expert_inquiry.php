<?php
// ============================================================
// expert_inquiry.php
// POST /api/expert-inquiry  → submit 'Ask Our Experts' form
// ============================================================
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['detail' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

// Required fields validation
$required = ['type', 'role', 'email', 'mobile', 'productName', 'requirement'];
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

try {
    // 1. Store in database (optional but good practice)
    // Assuming a table 'expert_inquiries' exists or using 'contacts' with a flag
    $stmt = $pdo->prepare("
        INSERT INTO contacts (name, email, phone, subject, message, status)
        VALUES (?, ?, ?, ?, ?, 'expert_inquiry')
    ");
    
    $countryCode = isset($body['countryCode']) ? $body['countryCode'] : '+91';
    $fullPhone = $countryCode . ' ' . $body['mobile'];
    $subject = "Expert Inquiry: " . ucfirst($body['type']) . " (" . ucfirst($body['role']) . ")";
    $name = "Inquiry from Website"; // We don't have a name field in this form, so use placeholder

    $stmt->execute([
        $name,
        $body['email'],
        $fullPhone,
        $subject,
        "Product: " . $body['productName'] . "\nRequirement: " . $body['requirement']
    ]);

    $newId = $pdo->lastInsertId();

    // 2. Send notification email to admin
    $to = "query@dealerdistributors.com";
    $emailSubject = "New Expert Inquiry - " . ucfirst($body['type']);
    
    $message = "You have received a new inquiry from the 'Ask Our Experts' section.\n\n" .
               "Entity Type: " . ucfirst($body['type']) . "\n" .
               "User Role: " . ($body['role'] === 'looking' ? 'Looking for ' . $body['type'] : 'Wants to become a ' . $body['type']) . "\n" .
               "Email: " . $body['email'] . "\n" .
               "Mobile: " . $fullPhone . "\n" .
               "Product Name: " . $body['productName'] . "\n\n" .
               "Requirement Details:\n" . $body['requirement'];
    
    $headers = "From: system@dealerdistributors.com\r\n" .
               "Reply-To: " . $body['email'] . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
    // In local environment mail() might not work, but this is the production-ready code
    @mail($to, $emailSubject, $message, $headers);

    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your requirement has been submitted. Our experts will contact you soon.',
        'id'      => (string) $newId,
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
