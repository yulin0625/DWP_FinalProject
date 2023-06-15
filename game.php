<?php

session_start();
$link = mysqli_connect("localhost","root","","webproject")
            or die("無法開啟MySQL資料庫連接!<br/>");

$memberID = $_SESSION['MemberID'];
$newScore = $_POST["score"];
$newMoney = $_POST["new_money"];
$sql = "SELECT * FROM score WHERE MemberID = '{$memberID}'";
// 執行SQL查詢
$result = mysqli_query($link, $sql);
$total_records = mysqli_num_rows($result);
// 取得資料筆數
$row = mysqli_fetch_array($result, MYSQLI_NUM);


// 是否有查詢到
if ( $total_records > 0 ) {
    $currentscore = $row[1];
    if($newScore > $currentscore){
        $sql = "UPDATE score SET score= '$newScore' WHERE MemberID = '{$memberID}'";
        $link->query($sql);
    }
}else{
    $sql = "INSERT INTO score (MemberID, score)
    VALUES ('$memberID','$newScore')";
    $link->query($sql);
}

$sql = "SELECT * FROM player WHERE MemberID = '{$memberID}'";
$result = mysqli_query($link, $sql);
$row = mysqli_fetch_array($result, MYSQLI_NUM);
$total_records = mysqli_num_rows($result);
$current_money = $row[2];
$current_money = $current_money + $newMoney ;
$sql = "UPDATE player SET money= '$current_money' WHERE MemberID = '{$memberID}'";


if ($link->query($sql) === TRUE) {
    header("Location: home.php");
} 

$link->close();
