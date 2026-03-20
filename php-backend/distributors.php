<?php
// ============================================================
// distributors.php
// GET /api/distributors                         → list (with optional ?category=&location=&limit=&skip=)
// GET /api/distributors?featured=1              → featured distributors
// GET /api/distributors?id=abc123               → single distributor by ID
// ============================================================
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

// Helper: decode JSON fields and format row to match FastAPI response
function formatDistributor(array $row): array {
    return [
        'id'            => (string) $row['id'],
        'name'          => $row['name'],
        'category'      => $row['category_name'],
        'logo'          => $row['logo'],
        'investmentRange' => $row['investment_range'],
        'established'   => (int) $row['established'],
        'products'      => json_decode($row['products'] ?? '[]', true),
        'phone'         => $row['phone'],
        'email'         => $row['email'] ?? null,
        'description'   => $row['description'],
        'location'      => $row['location'],
        'experience'    => $row['experience'],
        'territories'   => json_decode($row['territories'] ?? '[]', true),
        'is_featured'   => (bool) $row['is_featured'],
    ];
}

try {
    // ── Single distributor by ID
    if (isset($_GET['id'])) {
        $id = (int) $_GET['id'];
        $stmt = $pdo->prepare("SELECT * FROM distributors WHERE id = ? LIMIT 1");
        $stmt->execute([$id]);
        $row = $stmt->fetch();

        if (!$row) {
            http_response_code(404);
            echo json_encode(['detail' => 'Distributor not found']);
            exit;
        }
        echo json_encode(formatDistributor($row));
        exit;
    }

    // ── Featured distributors
    if (isset($_GET['featured'])) {
        $limit = min((int) ($_GET['limit'] ?? 6), 100);
        $stmt = $pdo->prepare("SELECT * FROM distributors WHERE is_featured = 1 AND status = 'active' LIMIT ?");
        $stmt->bindValue(1, $limit, PDO::PARAM_INT);
        $stmt->execute();
        $rows = $stmt->fetchAll();
        echo json_encode(array_map('formatDistributor', $rows));
        exit;
    }

    // ── All distributors with optional filters
    $where  = ["status = 'active'"];
    $params = [];

    if (!empty($_GET['category']) && $_GET['category'] !== 'all') {
        $where[]  = "category_name LIKE ?";
        $params[] = '%' . $_GET['category'] . '%';
    }
    if (!empty($_GET['location'])) {
        $where[]  = "location LIKE ?";
        $params[] = '%' . $_GET['location'] . '%';
    }

    $limit  = min((int) ($_GET['limit'] ?? 50), 100);
    $skip   = max((int) ($_GET['skip']  ?? 0),  0);
    $sql    = "SELECT * FROM distributors WHERE " . implode(' AND ', $where) . " LIMIT ? OFFSET ?";

    $stmt = $pdo->prepare($sql);
    // bind positional params
    $i = 1;
    foreach ($params as $p) {
        $stmt->bindValue($i++, $p);
    }
    $stmt->bindValue($i++, $limit, PDO::PARAM_INT);
    $stmt->bindValue($i,   $skip,  PDO::PARAM_INT);
    $stmt->execute();

    $rows = $stmt->fetchAll();
    echo json_encode(array_map('formatDistributor', $rows));

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
