<?php  
  session_start();

  $link = mysqli_connect("localhost","root","","webproject")or die("無法開啟MySQL資料庫連接!<br/>");;
  $memberID = $_SESSION["MemberID"];
  $sql = "SELECT * FROM player WHERE MemberID='{$memberID}'";
  $result = mysqli_query($link, $sql);
  $row = mysqli_fetch_array($result, MYSQLI_NUM);
  $money = $row[2];

?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>HOME</title>
  <link rel="stylesheet" href="home.css?ver=1">
  <script src="home.js?ver=1"></script>
</head>

<body>
  <div id="name_box"><?php echo $memberID ?></div>
  <div id="m_box">$ <span id="player_money"><?php echo $money ?></span></div>
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
        <span id="storeitem1num" class="itemnum"><?php echo $item1num ?></span>
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
      $item2num = $row[2];
    }else{
      $item2num = 0;
    }

    if ( isset($_POST["start"]) ){
      $use1 = $_POST["item1"];
      $use2 = $_POST["item2"];
      
      $con = mysqli_connect("localhost","root","","webproject");
      if (empty($con)) {
          print mysqli_error($con);
          die("資料庫連接失敗！");
          exit;
      }
  
      if($use1 == 1){
        $itemID = 1;
        $sql = "UPDATE store 
        SET number = $item1num-1
        WHERE MemberID = '{$memberID}' 
        and itemID = '{$itemID}'";
  
        $result = mysqli_query($con, $sql);
        header("Location: game.html");
      }
  
      if($use2 == 1){
        $itemID = 2;
        $sql = "UPDATE store 
        SET number = $item2num-1
        WHERE MemberID = '{$memberID}' 
        and itemID = '{$itemID}'";
  
        $result = mysqli_query($con, $sql);
        header("Location: game.html");
  
      }
      header("Location: game.html");
    }
  
  ?>

    <div class="item">
        <img src="img/item2.png">
        <span id="storeitem2num" class="itemnum"><?php echo $item2num ?></span>
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

    <div id="noMoney">
        <p>You don't have enough money!!</p>
        <button id="ok_but" onclick="closewarning()">OK</button>
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

  <div id="back">
    <img src="img/back.png" onclick="backToHome()">
  </div>


  <?php
  
 
  ?>

  <div id="useItem">
    <h1>Choose item</h1>
    <span id="item1num" class="itemnum"></span>
    <img onclick=" chooseItem(1)" src="img/item1.png" id="ch_item_1">
    <span id="item2num" class="itemnum"></span>
    <img onclick=" chooseItem(2)" src="img/item2.png" id="ch_item_2">
    <form name="start"  method="post">
      <input class="invis" name="item1" id="item1input" value=0>
      <input class="invis" name="item2" id="item2input" value=0>
      <input onclick="startGame()" value="PLAY!" type="submit" id=itemButton name="start" >
    </form>
  </div>


</body>
</html>