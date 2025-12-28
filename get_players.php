<?php
include 'db.php';


$sql = "SELECT * FROM players";
$result = $conn->query($sql);

$players = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        // We format the data to match exactly what your JS expects
        $players[] = array(
            "id" => (int)$row['id'],
            "name" => $row['name'],
            "team" => $row['team'],
            "league" => $row['league'],
            "appearances" => (int)$row['appearances'],
            "goals" => (int)$row['goals'],
            "assists" => (int)$row['assists'],
            "scoutScore" => (int)$row['scout_score']
        );
    }
}

// Tell the browser this is JSON data
header('Content-Type: application/json');
echo json_encode($players);

$conn->close();
?>