//clicks
var clicks = 0;
var multi = 10;


//delay
var delay = 10000;
var delayMin = 0;

//player stuff
var items = [];
var clickers = 0;

//cost
var clickerCost = 10;
var costMulti = 3.2;

//version
var version = "2.0.13";

function clickbtn() {
    addclick(1);
}

function addclick(amount) {
    clicks = parseInt(clicks) + amount;
}

function autoclick() {
    window.setInterval(function() {
        addclick(clickers);
        warning("Added a click", 1000);
    }, delay);
}

function buyItem(item, amount) {
   if(clickers != 60) {   
    if(clicks >= clickerCost) {
        clicks = clicks - clickerCost;
        clickerCost = clickerCost * costMulti;
        clickerCost = clickerCost.toFixed(0) * 1;
        if(item == "autoclicker") {
            items.push(item);
            item = "";
        }
    }
    else 
    {
     warning("You do not have enough clicks.", 1000);
    }
   }
   else 
   {
    warning("Max autoclickers.", 1000);
   
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
            if(clickers < items.length) {
            clickers++;
            autoclick();
            delay = delay + multi;
            delay.toFixed(0);
            }
        }
        });
        if(delay <= delayMin) {
            delay = 0;
        }
        document.getElementById("clicks").innerHTML = "Clicks: " + clicks;
        document.getElementById("auto").innerHTML = "Autoclickers: " + clickers;
        document.getElementById("delay").innerHTML = "Delay: " + delay + "ms";
        document.getElementById("cost").innerHTML = "AutoClicker cost: " + clickerCost;
    },10);
    
}

console.log("LOADED");

window.onload = gameLoop;

