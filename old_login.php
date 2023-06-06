<?php
    session_start();
    $MemberID = ""; $password ="";

    // 取得表單欄位值
    if ( isset($_POST["MemberID"]) )
    	$MemberID = $_POST["MemberID"];
    if ( isset($_POST["password"]) )
    	$password = $_POST["password"];

    // 檢查是否輸入使用者名稱和密碼
    if ($MemberID != "" && $password != "")
    {
        // 建立MySQL的資料庫連接 
        $link = mysqli_connect("localhost","root","","webproject")
            or die("無法開啟MySQL資料庫連接!<br/>");
    }

    // 送出UTF8編碼的MySQL指令
    mysqli_query($link, 'SET NAMES utf8');

    // 建立SQL指令字串
    $sql = "SELECT * FROM player WHERE password='";
    $sql.= $password."' AND MemberID='".$MemberID."'";

    // 執行SQL查詢
    $result = mysqli_query($link, $sql);
    $total_records = mysqli_num_rows($result);//取得資料筆數
    $row = mysqli_fetch_array($result, MYSQLI_NUM);

    // 是否有查詢到使用者紀錄
    if ( $total_records > 0 ) {
        // 成功登入, 指定Session變數
        $_SESSION["login_session"] = true;
        $_SESSION["MemberID"] = $row[0];
        $_SESSION["password"] = $row[1];
        $_SESSION["money"] = $row[2];

        header("Location: home.php"); 
        exit; 
    }

    else {  // 登入失敗
        echo "<center><font color='red'>";
        echo "使用者名稱或密碼錯誤!<br/>";
        echo "</font>";
        $_SESSION["login_session"] = false;
    }
    mysqli_close($link);  // 關閉資料庫連接
?>
