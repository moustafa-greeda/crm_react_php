<?php 
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);

$message = $data['message'];
$admin_id = 1;

$sql = "INSERT INTO messages (message , user_id) VALUES ('$message' , '$admin_id') ";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

?>