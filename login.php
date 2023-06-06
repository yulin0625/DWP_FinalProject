<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Log In</title>
  <link rel="stylesheet" href="login.css">
</head>
<body>

<?php
    session_start();
    $MemberID = ""; $password ="";
    $iseerror = false;
    
    // 取得表單欄位值
    if ( isset($_POST["login"]) ){
    	$MemberID = $_POST["MemberID"];
    	$password = $_POST["password"];
        $link = mysqli_connect("localhost","root","","webproject")or die("無法開啟MySQL資料庫連接!<br/>");;

    // 檢查是否輸入使用者名稱和密碼
    // if ($MemberID != "" && $password != "")
    // {
    //     // 建立MySQL的資料庫連接 
    //     $link = mysqli_connect("localhost","root","","webproject")
            
    // }

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
        }else {  // 登入失敗
            // echo "<center><font color='red'>";
            // echo "使用者名稱或密碼錯誤!<br/>";
            // echo "</font>";
            $iseerror = true;
            $_SESSION["login_session"] = false;
        }
        
        mysqli_close($link);  // 關閉資料庫連接
    }
    
?>
	
	<div>
		<h1>Log In</h1>
		<form name="login" method="post">
			<table>
				<tr>
					<td class="text_col">Name:</td>
					<td><input class="inputtext" type="text" name="MemberID"></td>
				</tr>
				<tr>
					<td class="text_col">Password:</td>
					<td><input class="inputtext" type="password"  name="password"></td>
				</tr>
                    <?php 
                        if( $iseerror == true) {?>
                        <tr>
                            <td colspan="2" id="error">名稱或密碼錯誤!</td>
                        </tr>
                            
                        <?php }
                    ?>
				<tr class="but_col">
					<td colspan="2" ><input class="but" id="but1" type="submit" name="login" value="Log In"></td>
				</tr>
				<tr>
					<td colspan="2" class="but_col"><input class="but" type="button" name="register" value="Register" onclick="location.href='register.html'" ></td>
				</tr>
			</table>
			
		</form>
	</div>
	
</body>
</html>