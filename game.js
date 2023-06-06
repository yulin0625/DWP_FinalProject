// 盤子
const maxBurgerNumber = 2
const burgerStatus = [0, 0]; 
// 0:empty, 1:berger, 2:berger_m
// 3:berger_m_c, 4:berger_m_o, 5:berger_m_c_o
// 6:berger_m_t, 7:berger_m_l, 8:berger_m_l_t
// 煎台
const maxMeatNumber = 4;
const meatStatus = [0, 0, 0, 0]; // 0:no meat, 1:raw, 2:cooked, 3:overcook
var timeLeft;
var game_timer;
var m1_timer;
var m2_timer;
var m3_timer;
var m4_timer;

// 訂單
const orderList = [
    [2, 5]
];
const orderListStatus = [
    [false, false],
    [false, false],
    [false, false],
    [false, false]
];

// ?刪除任意訂單
// let removed = fruits.splice(1, 1); 

// 分數、金幣
var score = 0;
var money = 0;

// 暫停
var gamePause = false;

// 道具判斷
var use_noOvercook_props = true; // 是否有用不燒焦道具


function addIngredient(ingredient){
    switch(ingredient){
        case "hambergerBun":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 檢查盤子內是否有漢堡
                if(burgerStatus[i] == 0){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger.png");
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
                        // 將肉放入漢堡中
                        document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m.png");
                        burgerStatus[i] = 2;
                        meatStatus[0] = 0;
                        clearInterval(m1_timer);
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
                        // 將肉放入漢堡中
                        document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m.png");
                        burgerStatus[i] = 2;
                        meatStatus[1] = 0;
                        clearInterval(m2_timer);
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
                        // 將肉放入漢堡中
                        document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m.png");
                        burgerStatus[i] = 2;
                        meatStatus[2] = 0;
                        clearInterval(m3_timer);
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
                        // 將肉放入漢堡中
                        document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m.png");
                        burgerStatus[i] = 2;
                        meatStatus[3] = 0;
                        clearInterval(m4_timer);
                        break;
                    }
                }
            }
            break;
        case "cheese":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 盤子內是burger_m
                if(burgerStatus[i] == 2){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m_c.png");
                    burgerStatus[i] = 3; // burger_m_c
                    break;
                }
                // 盤子內是burger_m_o
                if(burgerStatus[i] == 4){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m_c_o.png");
                    burgerStatus[i] = 5; // burger_m_c_o
                    break;
                }
            }
            break;
        case "onion":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 盤子內是burger_m
                if(burgerStatus[i] == 2){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m_o.png");
                    burgerStatus[i] = 4; // burger_m_o
                    break;
                }
                // 盤子內是burger_m_c
                if(burgerStatus[i] == 3){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m_c_o.png");
                    burgerStatus[i] = 5; // burger_m_c_o
                    break;
                }
            }
            break;
        case "tomato":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 盤子內是burger_m
                if(burgerStatus[i] == 2){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m_t.png");
                    burgerStatus[i] = 6; // buger_m_t
                    break;
                }
                // 盤子內是burger_m_l
                if(burgerStatus[i] == 7){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m_l_t.png");
                    burgerStatus[i] = 8; // burger_m_l_t
                    break;
                }
            }
            break;
        case "lettuce":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 盤子內是burger_m
                if(burgerStatus[i] == 2){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m_l.png");
                    burgerStatus[i] = 7; // buger_m_l
                    break;
                }
                // 盤子內是burger_m_t
                if(burgerStatus[i] == 6){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m_l_t.png");
                    burgerStatus[i] = 8; // burger_m_l_t
                    break;
                }
            }
            break;
    }
}

function cookMeat(meatID){
    switch(meatID){
        case 1:
            m1_timer = setTimeout(
                function(){meatIsCooked(1);},
                5000
            );
            break;
        case 2:
            m2_timer = setTimeout(
                function(){meatIsCooked(2);},
                5000
            );
            break;
        case 3:
            m3_timer = setTimeout(
                function(){meatIsCooked(3);},
                5000
            );
            break;
        case 4:
            m4_timer = setTimeout(
                function(){meatIsCooked(4);},
                5000
            );
            break;
    }
}

function meatIsCooked(meatID){
    document.getElementById("meat_"+meatID).setAttribute("src", "./img/meat_c.png");
    meatStatus[meatID-1] = 2;
    // 燒焦計時
    if(!use_noOvercook_props){
        switch(meatID){
            case 1:
                m1_timer = setTimeout(
                    function(){meatIsOvercooked(1);},
                    5000
                );
                break;
            case 2:
                m2_timer = setTimeout(
                    function(){meatIsOvercooked(2);},
                    5000
                );
                break;
            case 3:
                m3_timer = setTimeout(
                    function(){meatIsOvercooked(3);},
                    5000
                );
                break;
            case 4:
                m4_timer = setTimeout(
                    function(){meatIsOvercooked(4);},
                    5000
                );
                break;
        }
    }
}

// 讓肉燒焦
function meatIsOvercooked(meatID){
    meatStatus[meatID-1] = 3;
    document.getElementById("meat_"+meatID).setAttribute("src", "./img/meat_oc.png");
}

function moveBurgerToTrash(plateID){
    document.getElementById("plate_"+plateID).setAttribute("src", "./img/plate.png");
    burgerStatus[plateID-1] = 0;
}

function moveMeatToTrash(meatID){
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
        document.getElementById("hourglass").style.animationPlayState = "paused";
        // todo:gameover
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
    }
    else{
        img.setAttribute("src", "./img/pause.png");
        document.getElementById("hourglass").style.animationPlayState = "running";
    }
}

window.onload = function(){
    timeLeft = 2*60; // 遊戲時間2min
    updateTimeLeft();
    game_timer = setInterval(countDown, 1000);
};