function openLeaderboard(){
    document.getElementById("test").style.display= "block";
}

function closeLeaderboard(){
    document.getElementById("test").style.display= "none";
}

function closeStore(){
    document.getElementById("store").style.display= "none";
}

function playGame(){
    // window.location.href='./game.html';
    document.getElementById("name_box").style.display= "none";
    document.getElementById("m_box").style.display= "none";
    document.getElementById("playGameBtn").style.display= "none";
    document.getElementById("LOGOUT").style.display= "none";
    document.getElementById("leaderboard").style.display= "none";
    document.getElementById("shop").style.display= "none";
    document.getElementById("store").style.display= "none";
    document.getElementById("test").style.display= "none";
    document.getElementById("back").style.display= "block";
    document.getElementById("useItem").style.display= "block";
}

function backToHome(){
    // window.location.href='./game.html';
    document.getElementById("name_box").style.display= "inline-block";
    document.getElementById("m_box").style.display= "inline-block";
    document.getElementById("playGameBtn").style.display= "block";
    document.getElementById("LOGOUT").style.display= "block";
    document.getElementById("leaderboard").style.display= "block";
    document.getElementById("shop").style.display= "block";
    document.getElementById("store").style.display= "block";
    document.getElementById("back").style.display= "none";
}

function openShop(){
    document.getElementById("store").style.display= "block";
}

function changeNum(i){
    if(i==1){
        x = document.getElementById("num1").value;
        x-=1;
        if(x>=0){
            document.getElementById("num1").value = x;
        }
    }else if(i==2){
        x = parseInt(document.getElementById("num1").value);
        x += 1;
        document.getElementById("num1").value = x;
    }else if(i==3){
        x = document.getElementById("num2").value;
        x-=1;
        if(x>=0){
            document.getElementById("num2").value = x;
        }
    }else{
        x = parseInt(document.getElementById("num2").value);
        x+=1;
        document.getElementById("num2").value = x;
    }
}

function buyitem(i) {
    let id='num'+i;
    let num = document.getElementById(id).value;
    let money = document.getElementById(id).value*500;
    document.getElementById("check").style.display= "block";
    document.getElementById("check_money").value= money;

    document.getElementById("item_id").value= i;
    document.getElementById("item_num").value= num;
    document.getElementById("total_money").value= money;
}

function cancel(){
    document.getElementById("check").style.display= "none";
}

function chooseItem(i) {
    let id =  "ch_item_"+i;
    document.getElementById(id).style.border= "6px solid rgb(221, 130, 107)";
    document.getElementById(id).style.margin= "19px";

    document.getElementById(id).setAttribute('onclick', 'unchooseitem('+i+')');
}

function unchooseitem(i){
    let id =  "ch_item_"+i;
    document.getElementById(id).style.border= "5px solid rgb(152, 170, 189)";
    document.getElementById(id).setAttribute('onclick', 'chooseItem('+i+')');
    document.getElementById(id).style.margin= "20px";
}

function startGame() {
    window.location.href='./game.html';
}