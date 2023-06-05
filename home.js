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
    window.location.href='./game.html';
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