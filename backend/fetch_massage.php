<?php
include 'db.php';

$sql = "SELECT * FROM messages";
$result = $conn->query($sql);
$messages = array();
while ($row = $result->fetch_assoc()) {
    $messages[] = $row;
}
echo json_encode($messages);
