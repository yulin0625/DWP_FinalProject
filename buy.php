<?php

session_start();
$con = mysqli_connect("localhost","root","","webproject")
            or die("無法開啟MySQL資料庫連接!<br/>");

$itemID = $_POST["itemID"];
$itemNum = $_POST["itemNum"];
$totalmoney = $_POST["money"];

$sql = "INSERT INTO store (MemberID, itemID, number)
VALUES ('$MemberID', '$password')";



$con->close();
?>