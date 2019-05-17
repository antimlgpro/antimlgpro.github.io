//clicks
var clicks = 0;
var multi = 0;


//delay
var delay = 5000;
var delayMin = 0;

//player stuff
var items = [];
var clickers = 0;

//cost
var clickerCost = 15;
var costMulti = 0;

//version
var version = "2.0.20";

function clickbtn() {
    addclick(1);
}

function addclick(amount) {
    clicks = parseInt(clicks) + amount;
}

function autoclick() {
    window.setInterval(function() {
        warning("Added a click", 1000);
        addclick(clickers);
        console.log("Click");
    }, delay);
}

function buyItem(item, amount) {
    if(clicks >= clickerCost) {
        clicks = clicks - clickerCost;
        clickerCost = clickerCost + (15 / 100) * clickerCost;
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
            delay = delay - multi;
            delay.toFixed(0);
            }
        }
        });
        if(delay <= delayMin) {
            delay = 0;
        }
        document.getElementById("clicks").innerHTML = "Clicks: " + clicks;
        document.getElementById("auto").innerHTML = "Autoclickers: " + clickers;
        document.getElementById("delay").innerHTML = "Delay: " + delay + "ms " + delay/1000 + "s";
        document.getElementById("cost").innerHTML = "Autoclicker cost: " + clickerCost;
    },10);
    
}

console.log("LOADED");

window.onload = gameLoop;

