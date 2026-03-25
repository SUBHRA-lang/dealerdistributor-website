<?php
// ============================================================
// blog.php
// GET /api/blog/posts               → all published posts (optional ?category=&limit=&skip=)
// GET /api/blog/posts?id=123        → single post by ID (includes full 'content' field)
// ============================================================
require_once __DIR__ . '/cors.php';
require_once __DIR__ . '/db.php';

try {
    // ── Single post by ID
    if (isset($_GET['id'])) {
        $id   = (int) $_GET['id'];
        $stmt = $pdo->prepare("SELECT * FROM blog_posts WHERE id = ? AND is_published = 1 LIMIT 1");
        $stmt->execute([$id]);
        $row  = $stmt->fetch();

        if (!$row) {
            http_response_code(404);
            echo json_encode(['detail' => 'Blog post not found']);
            exit;
        }

        echo json_encode([
            'id'       => (string) $row['id'],
            'title'    => $row['title'],
            'excerpt'  => $row['excerpt'],
            'content'  => $row['content'] ?? '',
            'image'    => str_replace('via.placeholder.com', 'placehold.co', $row['image'] ?? ''),
            'date'     => date('Y-m-d', strtotime($row['published_date'])),
            'author'   => $row['author'],
            'category' => $row['category'],
        ]);
        exit;
    }

    // ── List posts with optional filters
    $where  = ['is_published = 1'];
    $params = [];

    if (!empty($_GET['category'])) {
        $where[]  = 'category = ?';
        $params[] = $_GET['category'];
    }

    $limit  = min((int) ($_GET['limit'] ?? 10), 50);
    $skip   = max((int) ($_GET['skip']  ?? 0), 0);
    $sql    = "SELECT id, title, excerpt, image, published_date, author, category
               FROM blog_posts WHERE " . implode(' AND ', $where) . "
               ORDER BY published_date DESC LIMIT ? OFFSET ?";

    $stmt = $pdo->prepare($sql);
    $i = 1;
    foreach ($params as $p) {
        $stmt->bindValue($i++, $p);
    }
    $stmt->bindValue($i++, $limit, PDO::PARAM_INT);
    $stmt->bindValue($i,   $skip,  PDO::PARAM_INT);
    $stmt->execute();

    $rows   = $stmt->fetchAll();
    $result = [];
    foreach ($rows as $row) {
        $result[] = [
            'id'       => (string) $row['id'],
            'title'    => $row['title'],
            'excerpt'  => $row['excerpt'],
            'image'    => str_replace('via.placeholder.com', 'placehold.co', $row['image'] ?? ''),
            'date'     => date('Y-m-d', strtotime($row['published_date'])),
            'author'   => $row['author'],
            'category' => $row['category'],
        ];
    }
    echo json_encode($result);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Server error: ' . $e->getMessage()]);
}
