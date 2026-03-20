<?php
// ============================================================
// index.php — Health check endpoint for /api/
// Mirrors FastAPI GET /api/ response
// ============================================================
require_once __DIR__ . '/cors.php';

echo json_encode([
    'message' => 'DealerDistributors API is running',
    'version' => '2.0.0',
    'status'  => 'healthy',
    'backend' => 'PHP + MySQL',
]);
