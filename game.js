const hasHambergerBun = [];
const hasMeat = [];
const hasCheese = [];
const hasOnion = [];
const hasTomato = [];
const hasLettuce = [];

const maxBurgerNumber = 2

function addIngredient(ingredient){
    switch(ingredient){
        case "hambergerBun":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 檢查盤子內是否有漢堡
                if(!hasHambergerBun[i]){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger.png");
                    hasHambergerBun[i] = true;
                    break;
                }
            }
            break;
        case "meat":
            for(let i=0; i < maxBurgerNumber; ++i){
                // 檢查盤子內是否有漢堡
                if(hasHambergerBun[i]){
                    document.getElementById("plate_"+(i+1)).setAttribute("src", "./img/buger_m.png");
                    hasMeat[i] = true;
                    break;
                }
            }
            break;
        case Burger:
            break;
        case Burger:
            break;
        case Burger:
            break;
        case Burger:
            break;
        case Burger:
            break;

    }
}

function addBurger(){

}

function addMeat(){

}

function addTomato(){

}

function addLettuce(){

}

function addOnion(){

}

function addCheese(){

}

