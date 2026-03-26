<?php
// ============================================================
// popup-inquiry.php
// POST /api/popup-inquiry  → submit popup lead form & email query@dealerdistributors.com
// ============================================================
require_once __DIR__ . '/cors.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['detail' => 'Method not allowed']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);

// Validate required fields
$errors = [];
if (empty($body['email']))   $errors['email']  = 'Email address is required';
if (empty($body['mobile']))  $errors['mobile'] = 'Mobile number is required';
if (empty($body['product'])) $errors['product'] = 'Product name is required';

if (!empty($body['email']) && !filter_var($body['email'], FILTER_VALIDATE_EMAIL)) {
    $errors['email'] = 'Please enter a valid email address';
}

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['errors' => $errors]);
    exit;
}

// Compose email
$type        = htmlspecialchars($body['type'] ?? 'Distributor');
$role        = htmlspecialchars($body['role'] ?? 'Looking for distributor');
$email       = $body['email'];
$mobile      = htmlspecialchars($body['mobile']);
$product     = htmlspecialchars($body['product']);
$requirement = htmlspecialchars($body['requirement'] ?? 'N/A');

$to      = 'query@dealerdistributors.com';
$subject = "New Popup Inquiry — $type ($role)";
$message =
    "New inquiry received from the website popup form.\n\n" .
    "Type       : $type\n" .
    "Role       : $role\n" .
    "Email      : $email\n" .
    "Mobile     : +91 $mobile\n" .
    "Product    : $product\n" .
    "Requirement: $requirement\n";

$headers = "From: system@dealerdistributors.com\r\nReply-To: $email";
@mail($to, $subject, $message, $headers);

echo json_encode([
    'success' => true,
    'message' => 'Your inquiry has been submitted. Our team will contact you shortly.',
]);
