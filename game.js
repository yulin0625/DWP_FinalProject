var gameTime_s = 2*60;

// 盤子
const maxBurgerNumber = 2
const burgerStatus = [0, 0]; 
// 0:empty, 1:burger, 2:burger_m
// 3:burger_m_c, 4:burger_m_o, 5:burger_m_c_o
// 6:burger_m_t, 7:burger_m_l, 8:burger_m_l_t
// 煎台
const burgerStatusToName = ["", "burger", "burger_m",
                            "burger_m_c", "burger_m_o", "burger_m_c_o",
                            "burger_m_t", "burger_m_l", "burger_m_l_t"];
const maxMeatNumber = 4;
const meatStatus = [0, 0, 0, 0]; // 0:no meat, 1:raw, 2:cooked, 3:overcook
// timer
var timeLeft;
var game_timer;
var newOrder_timer;
var newOrderTimeLeft = 1;

// 肉
const meat_timers = [null, null, null, null];
const meat_timeLeft_ms = [0, 0, 0, 0];
const meat_animation_period_ms = 100;
// 肉熟的時間
var cookingTime = 6;
// 肉緩衝時間
const bufferTime1 = 1; // 肉煮好多久後隱藏 progress bar
const bufferTime2 = 2; // 隱藏 progress bar多久後肉開始燒焦
// 肉燒焦的時間
const overcookedTime = 15;

// 燒焦懲罰分數
const overcookPunish = 20;
// 訂單
const maxOrderListNumber = 4;
const orderList = [];
const orderListStatus = [];
const orderList_timers = [null, null, null, null];
const orderList_time_s = [];
const orderList_timeLeft_ms = [];
const orderList_animation_period_ms = 100;

// 星星結算
var starAnimationTimer;
var starCount = 0;
var starNumber = 0;

// 分數、金幣
var score = 0;
var money = 0;

// 暫停
var gamePause = false;

// 道具判斷
var use_noOvercook_props = false; // 是否有用不燒焦道具
var use_speed_props = false; // 是否有用速度增加道具

function generateNewOrder(){
    if(!gamePause){
        --newOrderTimeLeft;
        if(newOrderTimeLeft == 0){
            if(orderList.length < maxOrderListNumber){
                let item1 = Math.floor(Math.random()*7) + 2;
                let item2 = Math.floor(Math.random()*7) + 2;
                orderList.push([item1, item2]);
                orderListStatus.push([false, false]);
                let orderListID = orderList.length;
                // orderList_timeLeft_ms[orderListID-1] = (Math.floor(Math.random()*5) + 15)*1000; // todo:待調整參數
                orderList_timeLeft_ms.push((Math.floor(Math.random()*5) + 15)*1000);
                // orderList_time_s[orderListID-1] = orderList_timeLeft_ms[orderListID-1] / 1000;
                orderList_time_s.push(orderList_timeLeft_ms[orderListID-1] / 1000);
                orderList_timers[orderListID-1] = setInterval(function(){
                    orderListAnimation(orderListID);
                }, orderList_animation_period_ms);
            }
            updateOrderList();
            newOrderTimeLeft = Math.floor(Math.random()*3) + 5;
        }
    }
}

function orderListAnimation(orderListID){
    if(!gamePause){
        if(orderList_timeLeft_ms[orderListID-1] > 0){
            orderList_timeLeft_ms[orderListID-1] -= orderList_animation_period_ms;
            let progressBar = document.getElementById(`orderList_${orderListID}_progressBar`);
            let value = (orderList_timeLeft_ms[orderListID-1]/1000) / orderList_time_s[orderListID-1] * 100;
            // console.log(value);
            progressBar.style.width = `${value}%`;
        }
        else {
            // clearInterval(orderList_timers[orderListID-1]);
            deleteOrderList(orderListID);
        }
    }
}

function deleteOrderList(orderListID){
    orderListStatus.splice(orderListID-1, 1);
    orderList.splice(orderListID-1, 1);
    orderList_time_s.splice(orderListID-1, 1);
    orderList_timeLeft_ms.splice(orderListID-1, 1);
    updateOrderList();
    // 刪除多的timer
    let orderNumber = orderList.length;
    clearInterval(orderList_timers[orderNumber]);
}

function finishBurger(plateID){
    let burgeID = burgerStatus[plateID-1];
    let finish = false;
    for(let i=0; i < orderList.length && finish == false; ++i){
        for(let j=0; j < 2 && finish == false; ++j){
            if(orderListStatus[i][j] == false && orderList[i][j] == burgeID){
                orderListStatus[i][j] = true;
                burgerStatus[plateID-1] = 0;
                document.getElementById(`plate_${plateID}`).setAttribute("src", "img/plate.png")
                setTimeout(function(){
                    checkOrderFinish(i+1);
                }, 1000);
                finish = true;
                score += (10-i); // 算score，照順序完成訂單較多score
                // money
                if(burgeID == 2){ // 肉漢堡
                    money += 4;
                }
                else if(burgeID == 5 || burgeID == 8){ // 雙層料漢堡
                    money += 10;
                }
                else{ // 單層料漢堡
                    money += 5;
                }
                document.getElementById("score_box").innerHTML = `Score: ${score}`; // 更新score
                document.getElementById("money_box").innerHTML = `Money: ${money}`; // 更新money

            }
        }
    }
    updateOrderList();
}

function checkOrderFinish(orderListID){
    if(orderListStatus[orderListID-1][0] == true && orderListStatus[orderListID-1][1] == true){
        // orderListStatus[orderListID-1][0] = orderListStatus[orderListID-1][1] = false;
        orderListStatus.splice(orderListID-1, 1);
        orderList.splice(orderListID-1, 1);
    }
    updateOrderList();
}

function updateOrderList(){
    let i = 0;
    for(i; i < orderList.length; ++i){
        // timer
        document.getElementById(`orderList_${i+1}_progress`).style.visibility = "visible";
        // setTimeout(function(){
        //     showProgressBar(orderList.length);
        // }, 500);
        // item_1
        document.getElementById(`orderItem_${i+1}-1`).setAttribute("src", `./img/${burgerStatusToName[orderList[i][0]]}.png`);
        if(orderListStatus[i][0]==true){
            document.getElementById(`check_${i+1}-1`).style.visibility = "visible";
        }
        else{
            document.getElementById(`check_${i+1}-1`).style.visibility = "hidden";
        }
        // item_2
        document.getElementById(`orderItem_${i+1}-2`).setAttribute("src", `./img/${burgerStatusToName[orderList[i][1]]}.png`);
        if(orderListStatus[i][1]==true){
            document.getElementById(`check_${i+1}-2`).style.visibility = "visible";
        }
        else{
            document.getElementById(`check_${i+1}-2`).style.visibility = "hidden";
        }
        // orderList
        document.getElementById("orderList_"+(i+1)).style.visibility = "visible";
    }

    for(i; i < maxOrderListNumber; ++i){
        document.getElementById("orderList_"+(i+1)).style.visibility = "hidden";
        document.getElementById(`check_${i+1}-1`).style.visibility = "hidden";
        document.getElementById(`check_${i+1}-2`).style.visibility = "hidden";
        document.getElementById(`orderList_${i+1}_progress`).style.visibility = "hidden";
    }
}

function showProgressBar(orderNumber){
    for(let i=0; i < orderNumber; ++i){
        document.getElementById(`orderList_${i+1}_progress`).style.visibility = "visible";
    }
}

function addIngredient(ingredient){
    switch(ingredient){
        case "hambergerBun":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 檢查盤子內是否有漢堡
                if(burgerStatus[i] == 0){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger.png");
                    burgerStatus[i] = 1;
                    break;
                }
            }
            break;
        case "rawMeat":
            for(let i=0; i < maxMeatNumber; ++i){
                // 檢查煎台上是否有肉
                if(meatStatus[i] == 0){
                    document.getElementById("meat_"+(i+1)).setAttribute("src", "./img/meat_nc.png");
                    // 更改 progressBar 顏色
                    document.getElementById(`meat_${i+1}_progressBar`).classList.remove("progress-bar-danger");
                    document.getElementById(`meat_${i+1}_progressBar`).classList.add("progress-bar-success");
                    // 顯示進度條
                    document.getElementById(`meat_${i+1}_progress`).style.visibility = "visible";
                    meatStatus[i] = 1;
                    cookMeat(i+1);
                    break;
                }
            }
            break;
        case "meat_1":
            if(meatStatus[0] == 2){
                for(let i = 0; i < maxBurgerNumber; ++i){
                    if(burgerStatus[i] == 1){
                        // 將煎台上的肉取下
                        document.getElementById("meat_1").setAttribute("src", "");
                        // 隱藏進度條
                        document.getElementById("meat_1_progress").style.visibility = "hidden";
                        // 歸零進度條
                        document.getElementById("meat_1_progressBar").style.width = "0%";
                        // 將肉放入漢堡中
                        document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m.png");
                        burgerStatus[i] = 2;
                        meatStatus[0] = 0;
                        clearInterval(meat_timers[0]);
                        break;
                    }
                }
            }
            break;
        case "meat_2":
            if(meatStatus[1] == 2){
                for(let i = 0; i < maxBurgerNumber; ++i){
                    if(burgerStatus[i] == 1){
                        // 將煎台上的肉取下
                        document.getElementById("meat_2").setAttribute("src", "");
                        // 隱藏進度條
                        document.getElementById("meat_2_progress").style.visibility = "hidden";
                        // 歸零進度條
                        document.getElementById("meat_2_progressBar").style.width = "0%";
                        // 將肉放入漢堡中
                        document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m.png");
                        burgerStatus[i] = 2;
                        meatStatus[1] = 0;
                        clearInterval(meat_timers[1]);
                        break;
                    }
                }
            }
            break;
        case "meat_3":
            if(meatStatus[2] == 2){
                for(let i = 0; i < maxBurgerNumber; ++i){
                    if(burgerStatus[i] == 1){
                        // 將煎台上的肉取下
                        document.getElementById("meat_3").setAttribute("src", "");
                        // 隱藏進度條
                        document.getElementById("meat_3_progress").style.visibility = "hidden";
                        // 歸零進度條
                        document.getElementById("meat_3_progressBar").style.width = "0%";
                        // 將肉放入漢堡中
                        document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m.png");
                        burgerStatus[i] = 2;
                        meatStatus[2] = 0;
                        clearInterval(meat_timers[2]);
                        break;
                    }
                }
            }
            break;
        case "meat_4":
            if(meatStatus[3] == 2){
                for(let i = 0; i < maxBurgerNumber; ++i){
                    if(burgerStatus[i] == 1){
                        // 將煎台上的肉取下
                        document.getElementById("meat_4").setAttribute("src", "");
                        // 隱藏進度條
                        document.getElementById("meat_4_progress").style.visibility = "hidden";
                        // 歸零進度條
                        document.getElementById("meat_4_progressBar").style.width = "0%";
                        // 將肉放入漢堡中
                        document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m.png");
                        burgerStatus[i] = 2;
                        meatStatus[3] = 0;
                        clearInterval(meat_timers[3]);
                        break;
                    }
                }
            }
            break;
        case "cheese":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 盤子內是burger_m
                if(burgerStatus[i] == 2){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m_c.png");
                    burgerStatus[i] = 3; // burger_m_c
                    break;
                }
                // 盤子內是burger_m_o
                if(burgerStatus[i] == 4){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m_c_o.png");
                    burgerStatus[i] = 5; // burger_m_c_o
                    break;
                }
            }
            break;
        case "onion":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 盤子內是burger_m
                if(burgerStatus[i] == 2){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m_o.png");
                    burgerStatus[i] = 4; // burger_m_o
                    break;
                }
                // 盤子內是burger_m_c
                if(burgerStatus[i] == 3){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m_c_o.png");
                    burgerStatus[i] = 5; // burger_m_c_o
                    break;
                }
            }
            break;
        case "tomato":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 盤子內是burger_m
                if(burgerStatus[i] == 2){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m_t.png");
                    burgerStatus[i] = 6; // burger_m_t
                    break;
                }
                // 盤子內是burger_m_l
                if(burgerStatus[i] == 7){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m_l_t.png");
                    burgerStatus[i] = 8; // burger_m_l_t
                    break;
                }
            }
            break;
        case "lettuce":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 盤子內是burger_m
                if(burgerStatus[i] == 2){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m_l.png");
                    burgerStatus[i] = 7; // burger_m_l
                    break;
                }
                // 盤子內是burger_m_t
                if(burgerStatus[i] == 6){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/burger_m_l_t.png");
                    burgerStatus[i] = 8; // burger_m_l_t
                    break;
                }
            }
            break;
    }
}

function cookMeat(meatID){
    meat_timeLeft_ms[meatID-1] = cookingTime * 1000;
    meat_timers[meatID-1] = setInterval(function(){
        cookMeatAnimation(meatID);
    }, meat_animation_period_ms);
}

function cookMeatAnimation(meatID){
    if(!gamePause){
        if(meat_timeLeft_ms[meatID-1] > 0){
            meat_timeLeft_ms[meatID-1] -= meat_animation_period_ms;
            let progressBar = document.getElementById(`meat_${meatID}_progressBar`);
            let value = (cookingTime - meat_timeLeft_ms[meatID-1]/1000) / cookingTime * 100;
            progressBar.style.width = `${value}%`;
        }
        else {
            clearInterval(meat_timers[meatID-1]);
            meatIsCooked(meatID);
        }
    }
}

function meatIsCooked(meatID){
    document.getElementById("meat_"+meatID).setAttribute("src", "./img/meat_c.png");
    meatStatus[meatID-1] = 2;
    // 緩衝時間1
    meat_timeLeft_ms[meatID-1] = bufferTime1*1000;
    meat_timers[meatID-1] = setInterval(function(){
        resetProgressBar(meatID);
    }, 1000);
}

function resetProgressBar(meatID){
    if(!gamePause){
        if(meat_timeLeft_ms[meatID-1] > 0){
            meat_timeLeft_ms[meatID-1] -= 1000;
        }
        else{
            clearInterval(meat_timers[meatID-1]);
            // 隱藏進度條
            document.getElementById(`meat_${meatID}_progress`).style.visibility = "hidden";
            // 歸零
            document.getElementById(`meat_${meatID}_progressBar`).style.width = "0%";
            // 更改 progressBar 顏色
            document.getElementById(`meat_${meatID}_progressBar`).classList.remove("progress-bar-success");
            document.getElementById(`meat_${meatID}_progressBar`).classList.add("progress-bar-danger");
            // 緩衝時間2
            meat_timeLeft_ms[meatID-1] = bufferTime2*1000;
            meat_timers[meatID-1] = setInterval(function(){
                overcookedCountDown(meatID);
            }, 1000);
        }
    }
}

// 燒焦計時 period=1s
function overcookedCountDown(meatID){
    if(!use_noOvercook_props){
        if(!gamePause){
            if(meat_timeLeft_ms[meatID-1] > 0){
                meat_timeLeft_ms[meatID-1] -= 1000;
            }
            else {
                clearInterval(meat_timers[meatID-1]);
                // 顯示進度條
                document.getElementById(`meat_${meatID}_progress`).style.visibility = "visible";

                // // 歸零
                // document.getElementById(`meat_${meatID}_progressBar`).style.width = "0%";
                // // 更改 progressBar 顏色
                // document.getElementById(`meat_${meatID}_progressBar`).classList.remove("progress-bar-success");
                // document.getElementById(`meat_${meatID}_progressBar`).classList.add("progress-bar-danger");
                meat_timeLeft_ms[meatID-1] = overcookedTime * 1000;
                meat_timers[meatID-1] = setInterval(function(){
                    meatOvercookedAnimation(meatID);
                }, meat_animation_period_ms);
            }
        }
    }
}

function meatOvercookedAnimation(meatID){
    if(!gamePause){
        if(meat_timeLeft_ms[meatID-1] > 0){
            meat_timeLeft_ms[meatID-1] -= meat_animation_period_ms;
            let progressBar = document.getElementById(`meat_${meatID}_progressBar`);
            let value = (overcookedTime - meat_timeLeft_ms[meatID-1]/1000) / overcookedTime * 100;
            progressBar.style.width = `${value}%`;
        }
        else {
            clearInterval(meat_timers[meatID-1]);
            meatIsOvercooked(meatID);
        }
    }
}

// 讓肉燒焦
function meatIsOvercooked(meatID){
    // 燒焦扣分
    score -= overcookPunish;
    if(score < 0){
        score = 0;
    }
    document.getElementById("score_box").innerHTML = `Score: ${score}`;
    meatStatus[meatID-1] = 3;
    document.getElementById("meat_"+meatID).setAttribute("src", "./img/meat_oc.png");
}

function moveBurgerToTrash(plateID){
    document.getElementById("plate_"+plateID).setAttribute("src", "./img/plate.png");
    burgerStatus[plateID-1] = 0;
    score -= 50;
}

function moveMeatToTrash(meatID){
    // timer 歸零
    clearInterval(meat_timers[meatID-1]);
    meat_timeLeft_ms[meatID-1] = 0;
    // 隱藏進度條
    document.getElementById(`meat_${meatID}_progress`).style.visibility = "hidden";
    // 歸零進度條
    document.getElementById(`meat_${meatID}_progressBar`).style.width = "0%";
    
    document.getElementById("meat_"+meatID).setAttribute("src", "");
    meatStatus[meatID-1] = 0;
}

function countDown(){
    if(timeLeft>0){
        if(!gamePause){
            --timeLeft;
            updateTimeLeft();
        }
    }
    else{
        disableAllButton();
        document.getElementById("hourglass").style.animationPlayState = "paused";
        clearInterval(newOrder_timer);
        // todo:gameover
        showStar();
    }
}

function updateTimeLeft(){
    let min = Math.floor(timeLeft / 60);
    let sec_1 = Math.floor(timeLeft % 60 / 10);
    let sec_2 = timeLeft % 60 % 10;
    document.getElementById("timeLeft").innerHTML = `${min}:${sec_1}${sec_2}`;
}

function pause(){
    let img = document.getElementById("pause_btn").childNodes[0];
    gamePause = !gamePause;

    if(gamePause){
        img.setAttribute("src", "./img/play-button.png");
        document.getElementById("hourglass").style.animationPlayState = "paused";
        disableAllButton();
        clearInterval(newOrder_timer);
    }
    else{
        img.setAttribute("src", "./img/pause.png");
        document.getElementById("hourglass").style.animationPlayState = "running";
        enableAllButton();
        newOrder_timer = setInterval(function(){
            generateNewOrder();
        }, 1000);
    }
}

function disableAllButton(){
    document.getElementById("cheese").setAttribute("onclick", "");
    document.getElementById("onion").setAttribute("onclick", "");
    document.getElementById("tomato").setAttribute("onclick", "");
    document.getElementById("lettuce").setAttribute("onclick", "");
    document.getElementById("plate_1").setAttribute("onclick", "");
    document.getElementById("plate_1").setAttribute("ondbclick", "");
    document.getElementById("plate_2").setAttribute("onclick", "");
    document.getElementById("plate_2").setAttribute("ondbclick", "");
    document.getElementById("hamburgerBun").setAttribute("onclick", "");
    document.getElementById("rawMeat").setAttribute("onclick", "");
    document.getElementById("meat_1").setAttribute("onclick", "");
    document.getElementById("meat_1").setAttribute("ondbclick", "");
    document.getElementById("meat_2").setAttribute("onclick", "");
    document.getElementById("meat_2").setAttribute("ondbclick", "");
    document.getElementById("meat_3").setAttribute("onclick", "");
    document.getElementById("meat_3").setAttribute("ondbclick", "");
    document.getElementById("meat_4").setAttribute("onclick", "");
    document.getElementById("meat_4").setAttribute("ondbclick", "");
}

function enableAllButton(){
    document.getElementById("cheese").setAttribute("onclick", "addIngredient('cheese')");
    document.getElementById("onion").setAttribute("onclick", "addIngredient('onion')");
    document.getElementById("tomato").setAttribute("onclick", "addIngredient('tomato')");
    document.getElementById("lettuce").setAttribute("onclick", "addIngredient('lettuce')");
    document.getElementById("plate_1").setAttribute("onclick", "finishBurger(1)");
    document.getElementById("plate_1").setAttribute("ondbclick", "moveBurgerToTrash(1)");
    document.getElementById("plate_2").setAttribute("onclick", "finishBurger(2)");
    document.getElementById("plate_2").setAttribute("ondbclick", "moveBurgerToTrash(2)");
    document.getElementById("hamburgerBun").setAttribute("onclick", "addIngredient('hambergerBun')");
    document.getElementById("rawMeat").setAttribute("onclick", "addIngredient('rawMeat')");
    document.getElementById("meat_1").setAttribute("onclick", "addIngredient('meat_1')");
    document.getElementById("meat_1").setAttribute("ondbclick", "moveMeatToTrash(1)");
    document.getElementById("meat_2").setAttribute("onclick", "addIngredient('meat_2')");
    document.getElementById("meat_2").setAttribute("ondbclick", "moveMeatToTrash(2)");
    document.getElementById("meat_3").setAttribute("onclick", "addIngredient('meat_3')");
    document.getElementById("meat_3").setAttribute("ondbclick", "moveMeatToTrash(3)");
    document.getElementById("meat_4").setAttribute("onclick", "addIngredient('meat_4')");
    document.getElementById("meat_4").setAttribute("ondbclick", "moveMeatToTrash(4)");
}

function showStar(){
    document.getElementById("finalScore").innerHTML = score;
    document.getElementById("star").style.visibility = "visible";
    document.getElementById("score_input").value = score;
    document.getElementById("money_input").value = money;
    starCount = 0;
    starNumber = 0;
    if(score > 250){
        starNumber = 3;
    }
    else if(score > 150){
        starNumber = 2;
    }
    else if(score > 100){
        starNumber = 1;
    }
    else{
        starNumber = 0;
    }
    starAnimationTimer = setInterval(function(){
        starAnimation();
    }, 1000);
}

function starAnimation(){
    if(starCount <= starNumber){
        if(starCount > 0){
            document.getElementById(`star${starCount}`).setAttribute('src', 'img/star1.png');
        }
        ++starCount;
    }
    else{
        clearInterval(starAnimationTimer);
        document.getElementById("gohomeBtn").style.visibility = "visible";
    }
}

window.onload = function(){
    if(localStorage.getItem("item1") == 1){
        use_speed_props = true;
        cookingTime = 2;
        document.getElementById("item1").style.display = "inline-block";
    }
    if(localStorage.getItem("item2") == 1){
        use_noOvercook_props = true;
        document.getElementById("item2").style.display = "inline-block";
    }
    timeLeft = gameTime_s; // 遊戲時間2min
    updateTimeLeft();
    game_timer = setInterval(countDown, 1000);
    updateOrderList();
    generateNewOrder();
    newOrderTimeLeft = Math.floor(Math.random()*5) + 2;
    newOrder_timer = setInterval(function(){
        generateNewOrder();
    }, 1000);
};