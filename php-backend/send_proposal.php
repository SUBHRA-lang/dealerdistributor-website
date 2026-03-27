<?php
// ============================================================
// send_proposal.php
// POST /send_proposal.php  → handles proposal submissions from inquiry cards
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
$requiredFields = ['email', 'mobile', 'name', 'companyName', 'pincode', 'city', 'productName'];
foreach ($requiredFields as $field) {
    if (empty($body[$field])) {
        http_response_code(422);
        echo json_encode(['detail' => ucfirst(preg_replace('/(?<!^)[A-Z]/', ' $0', $field)) . ' is required']);   
        exit;
    }
}

try {
    // 1. Store in 'contacts' table (reusing existing schema for simplicity)
    // In a real app, you might want a 'proposals' table
    $stmt = $pdo->prepare("
        INSERT INTO contacts (name, email, phone, subject, message, status)
        VALUES (?, ?, ?, ?, ?, 'proposal_submitted')
    ");

    $subject = "New Proposal: " . ($body['productName'] ?? 'Unspecified Product');
    $message = "Proposal Details:\n" .
               "Type: " . ($body['type'] ?? 'Distributor') . "\n" .
               "Package: " . ($body['package'] ?? 'N/A') . "\n" .
               "Inquiry for: " . ($body['role'] ?? 'N/A') . "\n\n" .
               "Company: " . $body['companyName'] . "\n" .
               "Location: " . $body['city'] . " (" . $body['pincode'] . ")\n" .
               "Product: " . $body['productName'] . "\n\n" .
               "Contact Name: " . $body['name'] . "\n" .
               "Email: " . $body['email'] . "\n" .
               "Mobile: " . $body['mobile'];

    $stmt->execute([
        $body['name'],
        $body['email'],
        $body['mobile'],
        $subject,
        $message
    ]);

    // 2. Send Email Notification
    $to = "query@dealerdistributors.com";
    $headers = "From: system@dealerdistributors.com\r\n" .
               "Reply-To: " . $body['email'] . "\r\n" .
               "X-Mailer: PHP/" . phpversion();
    
    $mailSent = @mail($to, $subject, $message, $headers);

    echo json_encode([
        'success' => true,
        'message' => 'Proposal sent successfully! Our team will contact you soon.',
        'mail_status' => $mailSent ? 'sent' : 'failed'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}
