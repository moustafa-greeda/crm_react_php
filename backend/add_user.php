<?php 
include 'db.php';
$data = json_decode(file_get_contents("php://input"), true);


$username = $data['name'];
$email = $data['email'];
$phone = $data['phone'];
$password = $data['password'];

$sql = "INSERT INTO users (name, password, email, phone) VALUES ('$username', '$password', '$email', '$phone')";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

?>