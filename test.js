var numclicks = 0;
var delay = 1000;
var multi = 1;
var delayMax = 0;
var version = "2.0.22";


//player stuff
var items = [];
var clicks = 0;
var clickerCost = 200;


//saving


function clickbtn() {
    addclick(1);
}

function addclick(amount) {
    numclicks += amount;
}

function autoclick() {
    window.setInterval(function() {
        addclick(1);
    }, delay);
}

function buyItem(item, amount) {
    if(numclicks >= clickerCost) {
        numclicks = numclicks - clickerCost;
        clickerCost = clickerCost * 2;
        clickerCost.toFixed(0);
        if(item == "autoclicker") {
            items.push(item);
            item = "";
        }
    }
    else 
    {
     document.getElementById("warning").innerHTML = "You do not have enough clicks.";
     setTimeout(function(){ 
     for(var i = 0; i <= 100; i = i + 10) {
     document.getElementById("warning").style.opacity =- i;
     }
     }, 2000);
    }
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
        document.getElementById("clicks").innerHTML = "Clicks: " + numclicks;
        document.getElementById("auto").innerHTML = "Autoclickers: " + clicks;
        document.getElementById("delay").innerHTML = "Delay: " + delay + "ms";
        document.getElementById("cost").innerHTML = "AutoClicker cost: " + clickerCost;
    },10);
    window.setInterval(function() {
    saving();
    }, 10000)
    
}

console.log("LOADED");

window.onload = gameLoop;

function saving() {
    document.cookie = "clicks=" + numclicks;
    document.cookie = "delay=" + delay;
    document.cookie = "cost=" + clickerCost;
    console.log("done saving");
}

function loading() {
    if(getCookie("clicks") == "undefined") {
    reset();
    }
    numclicks = getCookie("clicks");
    delay = getCookie("delay");
    clickerCost = getCookie("cost");
    console.log("done loading save");
}

function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

function reset() {
    document.cookie = "clicks=0";
    document.cookie = "delay=1000";
    document.cookie = "cost=200";
    clicks = 0;
    items = [];
    loading();
}
