//clicks
var numclicks = 0;
var multi = 1;


//delay
var delay = 1000;
var delayMin = 0;

//player stuff
var items = [];
var clickers = 0;

//cost
var clickerCost = 10;

//version
var version = "2.0.6";

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
    window.setInterval(function(){
    items.forEach(function(value){
        if(value == "autoclicker") {
            if(clicks < items.length) {
            clickers++;
            autoclick();
            delay = delay - multi;
            delay.toFixed(0);
            }
        }
        });
        if(delay <= delayMin) {
            delay = 0;
        }
        document.getElementById("clicks").innerHTML = "Clicks: " + numclicks;
        document.getElementById("auto").innerHTML = "Autoclickers: " + clickers;
        document.getElementById("delay").innerHTML = "Delay: " + delay + "ms";
        document.getElementById("cost").innerHTML = "AutoClicker cost: " + clickerCost;
    },10);
    
}

console.log("LOADED");

window.onload = gameLoop;

