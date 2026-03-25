<?php
// ============================================================
// requirements.php
// POST /api/requirements  → submit a new requirement
// ============================================================
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['detail' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

// Required fields validation (matches Pydantic RequirementCreate)
$required = ['businessType', 'category', 'productName', 'companyName',
             'contactPerson', 'email', 'phone', 'location', 'investment',
             'territories', 'description'];

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
    $stmt = $pdo->prepare("
        INSERT INTO requirements
            (business_type, category, product_name, company_name, contact_person,
             email, phone, location, investment_range, territories, description, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    ");
    $stmt->execute([
        $body['businessType'],
        $body['category'],
        $body['productName'],
        $body['companyName'],
        $body['contactPerson'],
        $body['email'],
        $body['phone'],
        $body['location'],
        $body['investment'],
        $body['territories'],
        $body['description'],
    ]);


    $newId = $pdo->lastInsertId();

    // Send notification email
    $to = "query@dealerdistributors.com";
    $subject = "New Requirement Posted: " . $body['businessType'];
    $message = "A new requirement has been posted.\n\n" .
               "Business Type: " . $body['businessType'] . "\n" .
               "Category: " . $body['category'] . "\n" .
               "Product: " . $body['productName'] . "\n" .
               "Company: " . $body['companyName'] . "\n" .
               "Contact: " . $body['contactPerson'] . "\n" .
               "Email: " . $body['email'] . "\n" .
               "Phone: " . $body['phone'] . "\n" .
               "Location: " . $body['location'] . "\n" .
               "Investment: " . $body['investment'] . "\n" .
               "Territories: " . $body['territories'] . "\n" .
               "Description: " . $body['description'];
    
    $headers = "From: system@dealerdistributors.com";
    @mail($to, $subject, $message, $headers);

    echo json_encode([
        'success' => true,
        'message' => 'Requirement submitted successfully',
        'id'      => (string) $newId,
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
