<?php

$host = "localhost";
$user = "root";
$password = "root";
$dbname = "local";

//$conn = mysqli_connect($hose, $user, $password, $dbname);
$mysqli = new mysqli($hose, $user, $password, $dbname);

if (!$mysqli){
  die("Connection Failed: " . mysqli_connect_error());
}
//$mysqli = new mysqli($hose, $user, $password, $dbname);


?>