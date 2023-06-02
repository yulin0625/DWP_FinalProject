<?php  
  session_start();
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Personal Information</title>
  <link rel="icon" sizes="192x192" href="https://image.flaticon.com/icons/png/512/4020/4020286.png">
  <link rel="stylesheet" href="home.css">
  <style>

</style>
</head>

<body>
    <button id="playGameBtn" onclick="playGame()">開始遊戲</button>
    <!-- <a href="./game.html" id="playGameBtn">開始遊戲</a> -->
    <button id="leaderboard" onclick="openLeaderboard()">查看排名</button>
    <button id="shop" onclick="openShop()">商店</button>


    <div>Name:<?php echo $_SESSION["MemberID"] ?>
    </div>
</body>
</html>