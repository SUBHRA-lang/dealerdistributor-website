<?php
// ============================================================
// forgot_password.php
// POST /forgot_password.php  → sends a password reset notification
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

$email = $body['email'];

try {
    // Log the reset request into the contacts table (doesn't require a users table)
    $stmt = $pdo->prepare("
        INSERT INTO contacts (name, email, phone, subject, message, status)
        VALUES ('Password Reset Request', ?, '', 'Forgot Password', ?, 'reset_request')
    ");
    $stmt->execute([
        $email,
        "User requested a password reset for: $email"
    ]);

    // Notify admin about the reset request
    $adminTo = "query@dealerdistributors.com";
    $adminSubject = "Password Reset Request - DealerDistributors";
    $adminMessage = "A password reset has been requested.\n\n" .
                    "User Email: $email\n" .
                    "Requested At: " . date('Y-m-d H:i:s') . "\n\n" .
                    "Please assist this user by manually resetting their password in the database.";
    $adminHeaders = "From: system@dealerdistributors.com\r\nReply-To: $email\r\n";
    @mail($adminTo, $adminSubject, $adminMessage, $adminHeaders);

    // Send confirmation email to user
    $userSubject = "Password Reset Request - DealerDistributors.com";
    $userMessage = "Hello,\n\n" .
                   "We received a request to reset your password for your DealerDistributors.com account.\n\n" .
                   "Our team will review your request and get back to you shortly.\n\n" .
                   "If you did not request this, please ignore this email or contact us at query@dealerdistributors.com.\n\n" .
                   "Best regards,\nDealerDistributors.com Team";
    $userHeaders = "From: noreply@dealerdistributors.com\r\n";
    @mail($email, $userSubject, $userMessage, $userHeaders);

    echo json_encode([
        'success' => true,
        'message' => 'If an account with this email exists, a reset link has been sent.'
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
