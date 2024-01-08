<?php
ini_set('log_errors', 1);
ini_set('error_log', '/path/to/error.log');
error_reporting(E_ALL); 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "Usuarios";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    echo "Error";
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $userData = $_POST['json'];
    $userData = json_decode($userData, true);
    addUser($conn, $userData);
} else {
    $dni = $_GET['dni'];
    getUserByDni($conn, $dni);
} 

function getUserByDni($conn, $dni) {
    
    $sql = "SELECT * FROM usuario WHERE dni = '$dni'";

    $result = $conn->query($sql);

    if (!$result) {
        echo json_encode(['error' => 'Query error: ' . $conn->error]);
        return;
    }

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        echo json_encode($user);
    } else {
        echo json_encode(['error' => 'User not found']);
    }
}

function addUser($conn, $userData) {
    // Assuming your 'users' table has columns like 'nombre', 'apellidos', 'dni', etc.
    $name = $userData['name'];
    $surname = $userData['surname'];
    $dni = $userData['dni'];
    $date = $userData['date'];
    $postalCode = $userData['postalCode'];
    $email = $userData['email'];
    $phone = $userData['phone'];
    $mobile = $userData['mobile'];
    $IBAN = $userData['IBAN'];
    $creditCard = $userData['creditCard'];
    $password = $userData['contrasena'];
    $repeatPassword = $userData['repeatPassword'];
    
    // Add other fields as needed

    $sql = "INSERT INTO usuarios (name, surname, dni, date, postalCode, email, phone, mobile, IBAN, creditCard, password) VALUES ('$name', '$surname', '$dni', '$date', '$postalCode', '$email', '$phone', '$mobile', '$IBAN', '$creditCard', '$password')";
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Error adding user: ' . $conn->error]);
    }
}

$conn->close();
?>
