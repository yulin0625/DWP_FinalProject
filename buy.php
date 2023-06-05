<?php

session_start();
$link = mysqli_connect("localhost","root","","webproject")
            or die("無法開啟MySQL資料庫連接!<br/>");

$memberID = $_SESSION['MemberID'];
$itemID = $_POST["itemID"];
$itemNum = $_POST["itemNum"];
$totalmoney = $_POST["money"];
$money = $_SESSION['money'];

$money = $money - $totalmoney;

$sql = "SELECT * FROM store WHERE MemberID = '{$memberID}' and itemID = '{$itemID}'";
// 執行SQL查詢
$result = mysqli_query($link, $sql);
$total_records = mysqli_num_rows($result);//取得資料筆數
$row = mysqli_fetch_array($result, MYSQLI_NUM);

// 是否有查詢到
if ( $total_records > 0 ) {
    $have = $row[2];
    $newNum = $have + $itemNum;
    $sql = "UPDATE store SET number= '$newNum' WHERE MemberID = '{$memberID}' and itemID = '{$itemID}'";
}else{
    $sql = "INSERT INTO store (MemberID, itemID, number)
    VALUES ('$memberID', '$itemID','$itemNum')";
}

if ($link->query($sql) === TRUE) {
    $sql = "UPDATE player SET money= '$money' WHERE MemberID = '{$memberID}'";
    $_SESSION["money"] = $money;

    if ($link->query($sql) === TRUE){
        header("Location: home.php");
    }
    
} 

$link->close();
?>