<?php  
  session_start();
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>HOME</title>
  <link rel="icon" sizes="192x192" href="https://image.flaticon.com/icons/png/512/4020/4020286.png">
  <link rel="stylesheet" href="home.css">
  <style>
    #test {
      background-color: rgb(73, 65, 40);

      padding: 15px 15px 5px 15px;
      float: right;
      position: fixed;
      top: 100px;
      right: 20px;
      width: 500px;
      border-radius: 20px;
      text-align: center;
      /* height:400px; */
    }

    #test h1 {
      font-family:monospace ;
      font-size: 40px;
      color:rgb(244, 235, 222);
      margin:3px 0 10px 0;
    }

    #test span {
      position: absolute;
      right:20px;
      font-size:25px;
      font-weight:bold;
      font-family:monospace;
    }

    table {
      width: 500px;
      /* background-color: white; */
      font-size:20px;
      text-align:center;
      /* border: 3px solid blue; */
      border-radius:20px;
    }

    tr {
      height: 40px;
    }

    th:first-child , td:first-child {
      width:100px;
    }
    
    th:nth-child(2) , td:nth-child(2) {
      width:200px;
    }

    .rank {
      height:50px;
      width: 500px;
      border-radius: 15px;
      background-color: rgb(230, 230, 230);
      color:rgb(80, 71, 55);
      margin-bottom: 10px;
      font-family:monospace ;
    }

    .rank:hover {
      background-color: rgb(229, 217, 182);
      width: 510px;
      margin-left: -10px;
      padding-left:10px;
      font-size:100px;
      color:rgb(54, 52, 48);

      font-weight: bold;
      transition:200ms;
    }


    .head{
      height:50px;
      width: 500px;
      border-radius: 15px;
      margin-bottom: 10px;
      font-family:monospace ;
      background-color: rgb(230, 166, 102);
    }

    .empty {
      background-color: gray;
      height:50px;
      width: 500px;
      border-radius: 15px;
      margin-bottom: 10px;
      font-family:monospace ;
    }

    #name_box {
        background-color:rgb(65, 94, 128);
        width: 200px;
        height: 50px;
        border-radius: 50px;
        line-height: 50px;
        text-align: center;
        border: 5px solid rgb(201, 210, 226);
        color: aliceblue;
        font-weight: bold;
        font-size: 23px;
        display: inline-block;
        margin-right: 10px;
        font-family:monospace ;
    }

    #m_box {
        background-color:rgb(65, 94, 128);
        width: 200px;
        height: 50px;
        border-radius: 50px;
        line-height: 50px;
        text-align: center;
        color: aliceblue;
        border: 5px solid rgb(196, 204, 219);
        font-weight: bold;
        font-size: 23px;
        display: inline-block;
        font-family:monospace ;
    }

    .but {
        float: right;
        background-color:rgb(240, 224, 181);
        width: 200px;
        height: 50px;
        border-radius: 50px;
        line-height: 30px;
        text-align: center;
        color: rgb(91, 65, 13);
        border: 5px solid rgb(101, 86, 66);
        font-weight: bold;
        font-size: 23px;
        margin-right: 10px;
        font-family:monospace ;
    }

    .but:hover {
      border: 5px solid rgb(196, 188, 179);
      background-color:rgb(111, 92, 76);
      color:rgb(201, 197, 190)
    }

    .but:active {
        width: 180px;
        height: 46px;
        margin:4px 20px 0 10px;
        line-height:35px;
        font-size:20px;
    }

    #playGameBtn {
        float: right;
        background-color:rgb(128, 17, 17);
        width: 300px;
        height: 90px;
        border-radius: 50px;
        line-height: 30px;
        text-align: center;
        color: rgb(211, 227, 241);
        border: 7px solid rgb(72, 22, 22);
        font-weight: bold;
        font-size: 40px;
        font-family:monospace ;
    }

    #playGameBtn:hover{
      width: 300px;
      height: 90px;
      font-size: 40px;
      background-color:rgb(230, 145, 109);
      color: rgb(103, 38, 6);
      border-color: rgb(100, 39, 8);
    }

    #playGameBtn:active{
      width: 290px;
      height: 85px;
      font-size: 38px;
      margin-top: 3px ;
      /* transition: 2000 ms; */
    }

    #LOGOUT {
      float: right;
      background-color:rgb(211, 227, 241);
      width: 130px;
      height: 50px;
      border-radius: 50px;
      line-height: 30px;
      text-align: center;
      color: rgb(21, 39, 54);
      border: 5px solid rgb(90, 121, 148);
      font-weight: bold;
      font-size: 23px;
      margin-right: 10px;
      font-family:monospace ;
    }

    #LOGOUT:hover {
        border: 5px solid rgb(179, 191, 196);
        background-color:rgb(76, 88, 111);
        color: aliceblue;
    }

    #LOGOUT:active {
        width: 120px;
        height: 47px;
        margin:2px 15px 0 5px;
        line-height:35px;
        font-size: 20px;

    }
  </style>
</head>

<body>
  <div id="name_box"><?php echo $_SESSION["MemberID"] ?></div>
  <div id="m_box">$ <?php echo $_SESSION["money"] ?></div>
  <button id="playGameBtn" onclick="playGame()">START!</button>
  <!-- <a href="./game.html" id="playGameBtn">開始遊戲</a> -->
  <button id="LOGOUT" onclick="location.href='index.html'" >LOG OUT</button>
  <button class="but" id="leaderboard" onclick="openLeaderboard()">RANK</button>
  <button class="but" id="shop" onclick="openShop()">STORE</button>
  <div id="test"><span>x</span><h1>Leaderboard</h1>
  
  <div class="head">
    <table>
      <tr>
        <th>RANK</th>
        <th>NAME</th>
        <th>SCORE</th>
      </tr>
    </table>
  </div>
<?php
  $sql = "SELECT *
  FROM score
  ORDER BY MemberID DESC";

  $x =1 ;

  $con = mysqli_connect("localhost","root","","webproject_cookinggame");
  if (empty($con)) {
    print mysqli_error($con);
    die("資料庫連接失敗！");
    exit;
  }

  // mysqli_query($con, "SET NAMES 'UTF-8'");

  $result = mysqli_query($con, $sql);
  while ($row = mysqli_fetch_array($result)){?>
    <div class="rank">
      <table>
        <tr>
          <td><?php echo $x ?> </td>
          <td><?php echo $row['MemberID']; ?> </td>
          <td><?php echo $row['score']; ?></td>
        </tr>
      </table>
    </div>
  <?php $x = $x+1;
  }
  
  while($x<6){?>
    <div class="empty">
    </div>

  <?php
  $x+=1;
  }
  ?>
    
  </div>

</body>
</html>