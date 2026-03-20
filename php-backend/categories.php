<?php
// ============================================================
// categories.php
// GET /api/categories          → all active categories
// GET /api/categories?slug=xyz → single category by slug
// ============================================================
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

$slug = $_GET['slug'] ?? null;

try {
    if ($slug) {
        // Single category by slug
        $stmt = $pdo->prepare("SELECT id, name, slug, icon FROM categories WHERE slug = ? AND is_active = 1 LIMIT 1");
        $stmt->execute([$slug]);
        $row = $stmt->fetch();

        if (!$row) {
            http_response_code(404);
            echo json_encode(['detail' => 'Category not found']);
            exit;
        }
        echo json_encode($row);
    } else {
        // All active categories
        $stmt = $pdo->query("SELECT id, name, slug, icon FROM categories WHERE is_active = 1 ORDER BY name ASC");
        $rows = $stmt->fetchAll();
        echo json_encode($rows);
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
