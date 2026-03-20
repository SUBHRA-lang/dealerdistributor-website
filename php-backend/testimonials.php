<?php
// ============================================================
// testimonials.php
// GET /api/testimonials              → all testimonials (optional ?limit=)
// GET /api/testimonials?featured=1   → only featured testimonials
// ============================================================
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

function formatTestimonial(array $row): array {
    return [
        'id'          => (string) $row['id'],
        'name'        => $row['name'],
        'designation' => $row['designation'],
        'company'     => $row['company'],
        'image'       => $row['image'],
        'testimonial' => $row['testimonial'],
    ];
}

try {
    $limit = min((int) ($_GET['limit'] ?? 10), 100);

    if (isset($_GET['featured'])) {
        // Featured testimonials only
        $stmt = $pdo->prepare(
            "SELECT id, name, designation, company, image, testimonial
             FROM testimonials WHERE is_featured = 1 LIMIT ?"
        );
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->execute();
    } else {
        // All testimonials
        $stmt = $pdo->prepare(
            "SELECT id, name, designation, company, image, testimonial
             FROM testimonials LIMIT ?"
        );
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->execute();
    }

    $rows = $stmt->fetchAll();
    echo json_encode(array_map('formatTestimonial', $rows));

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
