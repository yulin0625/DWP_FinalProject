<?php
  session_start();  // 啟用交談期

  if ( isset($_POST["MemberID"]) )
	    $MemberID = $_POST["MemberID"];
    if ( isset($_POST["password"]) )
	    $password = $_POST["password"];
    $link = mysqli_connect("localhost","root","","webproject_cookinggame")
            or die("無法開啟MySQL資料庫連接!<br/>");

    //送出UTF8編碼的MySQL指令
    mysqli_query($link, 'SET NAMES utf8'); 

    //4.SQL 條件式  檢查 條件:拿到資料，帳號有重複 
    $sql = "SELECT MemberID FROM player WHERE MemberID = '{$MemberID}'";
    $result = $link->query($sql);
    $rows = $result->num_rows;
    //查出有幾筆資料?
    echo $rows > 0 ? '帳號此帳號已被他人使用，請重新輸入帳號' : '';

  $sql = "INSERT INTO player (MemberID, password)
  VALUES ('$MemberID', '$password')";

  if ($link->query($sql) === TRUE) {
    header("Location: success.html");
  } 
//   else {
//     echo "Error: " . $sql . "<br>" . $link->error;
//   }

  $link->close();
?>