<?php
require_once __DIR__ . '/config.php';

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    $statement = $pdo->query('SELECT id, student_name, student_class, illness, certificate_name, status, created_at FROM certificates ORDER BY created_at DESC');
    echo json_encode(['success' => true, 'records' => $statement->fetchAll()]);
    exit;
}

if ($method === 'POST') {
    $name = trim($_POST['studentName'] ?? '');
    $class = trim($_POST['studentClass'] ?? '');
    $illness = trim($_POST['illness'] ?? '');

    if ($name === '' || $class === '' || $illness === '') {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Uzuza ibisabwa byose.']);
        exit;
    }

    if (!isset($_FILES['certificate']) || $_FILES['certificate']['error'] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Dosiye y’icyemezo irakenewe.']);
        exit;
    }

    $file = $_FILES['certificate'];
    if ($file['size'] > 10 * 1024 * 1024) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Dosiye ntarenga 10MB.']);
        exit;
    }

    $uploadDirectory = dirname(__DIR__) . '/uploads';
    if (!is_dir($uploadDirectory)) {
        mkdir($uploadDirectory, 0777, true);
    }

    $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $safeName = bin2hex(random_bytes(16)) . '.' . $extension;

    if (!move_uploaded_file($file['tmp_name'], $uploadDirectory . '/' . $safeName)) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Dosiye ntiyabitswe.']);
        exit;
    }

    $statement = $pdo->prepare('
        INSERT INTO certificates
        (student_name, student_class, illness, certificate_name, certificate_type, status)
        VALUES (?, ?, ?, ?, ?, "pending")
    ');
    $statement->execute([$name, $class, $illness, $safeName, $file['type'] ?: 'application/octet-stream']);

    echo json_encode([
        'success' => true,
        'message' => 'Icyemezo cyoherejwe kandi cyabitswe muri MySQL.',
        'id' => (int) $pdo->lastInsertId()
    ]);
    exit;
}

http_response_code(405);
echo json_encode(['success' => false, 'message' => 'Uburyo nta bushobozi.']);
