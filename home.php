<?php  
  session_start();

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>HOME</title>
  <link rel="stylesheet" href="home.css">
  <script src="home.js"></script>
  <!-- <style>
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
      display: none;
    }

    #test h1 {
      font-family:monospace ;
      font-size: 40px;
      color:rgb(244, 235, 222);
      margin:3px 0 10px 0;
    }

    #test button {
      position: absolute;
      right:20px;
      font-size:20px;
      font-weight:bold;
      font-family:monospace;
      height: 25px;
      width:25px;
      line-height:19px;
      border-radius:10px;
      background-color: gray;
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

    
    #store {
        height: 540px;
        width: 35%;
        background-color: rgb(144, 107, 60);
        position: absolute;
        left: 30px;
        top:90px;
        border: 6px solid rgb(252, 224, 140);
        border-radius: 20px;
        display: none;
    }
    #store h1 {
        text-align: center;
        font-size: 40px;
        margin: 15px 0;
        color: rgb(255, 249, 240);
    }
    #store img{
        height: 150px;
        background-color: aliceblue;
        border-radius: 30px;
        margin: 30px;
        position: absolute;
    }
    .item {
        height:210px;
        background-color: rgb(176, 158, 135);
        margin-bottom: 20px;
    }
    .item h3{
        position: absolute;
        left: 210px;
        font-size: 25px;
        margin-top: 40px;
    }

    .item h2{
        position: absolute;
        left: 210px;
        font-size: 30px;
        margin-top: 85px;
    }

    .inputnumber{
        width: 30px;
    }

    .item_number {
        position: absolute;
        left: 210px;
        font-size: 30px;
        margin-top: 130px;
    }

    .item_number form {
        display: inline-block;
    }

    .item_number button {
        height:30px;
    }

    .item_number input {
        height:24px;
    }

    .item_number input {
        height:24px;
    }

    .buybut {
        background-color: rgb(247, 95, 57);
        width: 100px;
        margin-left: 20px;
    }

    #store #close_but {
      position: absolute;
      right:10px;
      top:10px;
      font-size:20px;
      font-weight:bold;
      font-family:monospace;
      height: 25px;
      width:25px;
      line-height:19px;
      border-radius:10px;
      background-color: gray;
    }
  </style> -->
</head>

<body>
  <div id="name_box"><?php echo $_SESSION["MemberID"] ?></div>
  <div id="m_box">$ <?php echo $_SESSION["money"] ?></div>
  <button id="playGameBtn" onclick="playGame()">START!</button>
  <button id="LOGOUT" onclick="location.href='index.html'" >LOG OUT</button>
  <button class="but" id="leaderboard" onclick="openLeaderboard()">RANK</button>
  <button class="but" id="shop" onclick="openShop()">STORE</button>

  <div id="store">
    <button id="close_but" onclick="closeStore()">x</button>
    <h1>STORE</h1>
    <div class="item">
    
<?php
    
  $con = mysqli_connect("localhost","root","","webproject");
  $memberID = $_SESSION['MemberID'];
  $i = 1;
  $sql = "SELECT *
  FROM store
  WHERE MemberID ='{$memberID}'  AND itemID = '{$i}'";

  $result = mysqli_query($con, $sql);
  $total_records = mysqli_num_rows($result);//取得資料筆數
  $row = mysqli_fetch_array($result, MYSQLI_NUM);

  // 是否有查詢到使用者紀錄
  if ( $total_records > 0 ) {
    $item1num = $row[2];
  }else{
    $item1num = 0;
  }

  ?>

        <img src="img/item1.png">
        <span class="itemnum"><?php echo $item1num ?></span>
        <h3>Reduce cooking time</h3>
        <h2>$ 500</h2>
        <div class="item_number">
            <button onclick="changeNum(1)">◀</button>
            <form method="post">
                <input id="num1" class="inputnumber" type="text" name="item1" value="1">
            </form>
            <button onclick="changeNum(2)">▶</button>
            <button class="buybut" onclick="buyitem(1)">BUY</button>
        </div>
    </div>

<?php
    
    $con = mysqli_connect("localhost","root","","webproject");
    $memberID = $_SESSION['MemberID'];
    $i = 2;
    $sql = "SELECT *
    FROM store
    WHERE MemberID ='{$memberID}'  AND itemID = '{$i}'";
  
    $result = mysqli_query($con, $sql);
    $total_records = mysqli_num_rows($result);//取得資料筆數
    $row = mysqli_fetch_array($result, MYSQLI_NUM);
  
    // 是否有查詢到使用者紀錄
    if ( $total_records > 0 ) {
      $item1num = $row[2];
    }else{
      $item1num = 0;
    }
  
  ?>

    <div class="item">
        <img src="img/item2.png">
        <span class="itemnum"><?php echo $item1num ?></span>
        <h3>Food won't be bured</h3>
        <h2>$ 500</h2>
        <div class="item_number">
            <button onclick="changeNum(3)">◀</button>
            <form method="post">
                <input id="num2" class="inputnumber" type="text" name="item2" value="1">
            </form>
            <button onclick="changeNum(4)">▶</button>
            <button class="buybut" onclick="buyitem(2)">BUY</button>
        </div>
    </div>
    <div id="check">
        <p>Total Amount:</p>
        <form action="buy.php" method="post" > 
        <p>$ <input id="check_money" readonly></p>

        <input class="invis" id="item_id" name="itemID">
        <input class="invis" id="item_num" name="itemNum">
        <input class="invis" id="total_money" name="money">
        
        <button id="ok_but">OK</button>
        </form>
        <button id="can_but" onclick="cancel()">CANCEL</button>
    </div>
  </div>

  
  <div id="test">
    <button onclick="closeLeaderboard()">x</button>
    <h1>Leaderboard</h1>
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
  ORDER BY score DESC";

  $x =1 ;

  $con = mysqli_connect("localhost","root","","webproject");
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
  
  while($x<7){?>
    <div class="empty">
    </div>

  <?php
  $x+=1;
  }
  ?>
    
  </div>

</body>
</html>