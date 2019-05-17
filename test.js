var numclicks = 0;
var delay = 1000;
var multi = 1;
var delayMax = 0;
var cps = 0;
var version = "2.0.4";


//player stuff
var items = [];
var clicks = 0;

//cost
var clickerCost = 200;

function clickbtn() {
    addclick(1);
}

function addclick(amount) {
    numclicks = parseInt(numclicks) + amount;
}

function autoclick() {
    window.setInterval(function() {
        addclick(1);
    }, delay);
}

function buyItem(item, amount) {
   if(clicks != 60) {   
    if(numclicks >= clickerCost) {
        numclicks = numclicks - clickerCost;
        clickerCost = clickerCost * 1.2;
        clickerCost = clickerCost.toFixed(0) * 1;
        if(item == "autoclicker") {
            items.push(item);
            item = "";
        }
    }
    else 
    {
     warning("You do not have enough clicks.", 2000);
    }
   }
   else 
   {
    warning("Max autoclickers.", 2000);
   
}
}
function warning(text, time) {
    document.getElementById("warning").style.display = 'block';   
    document.getElementById("warning").innerHTML = text;
    setTimeout(function(){ 
    document.getElementById("warning").style.display = 'none';
    document.getElementById("warning").innerHTML = "";
    }, time);
}

function sleep(delay2) {
        var start = new Date().getTime();
        while (new Date().getTime() < start + delay2);
      }

function gameLoop() {
    console.log("version:" + version);
    loading();
    window.setInterval(function(){
    items.forEach(function(value){
        if(value == "autoclicker") {
            if(clicks < items.length) {
            clicks++;
            autoclick();
            delay = delay - multi;
            delay.toFixed(0);
            }
        }
        });
        if(delay <= delayMax) {
            delay = 0;
        }
        cps = cpsCalc(items);
        document.getElementById("cps").innerHTML = "Clicks per second: " + cps;
        document.getElementById("clicks").innerHTML = "Clicks: " + numclicks;
        document.getElementById("auto").innerHTML = "Autoclickers: " + clicks;
        document.getElementById("delay").innerHTML = "Delay: " + delay + "ms";
        document.getElementById("cost").innerHTML = "AutoClicker cost: " + clickerCost;
    },10);
    window.setInterval(function() {
    saving();
    }, 10000);
    
}

console.log("LOADED");

window.onload = gameLoop;

function cpsCalc(itemsA) {
    var x = itemsA.length;
    var y = 0;
    itemsA.forEach(function() {
        y = y + 1;
    });
    return y;
}
