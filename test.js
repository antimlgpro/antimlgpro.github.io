var numclicks = 0;
var delay = 1000;
var multi = 1;
var delayMax = 0;
var cps = 0;
var version = "2.0.3";


//player stuff
var items = [];
var clicks = 0;
var pc = 0;

//cost
var clickerCost = 200;
var pcCost = 5000;
var first1 = 1000000;


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
   if(pc != 60) {
    if(numclicks >= pcCost) {
        numclicks = numclicks - pcCost;
        pcCost = pcCost * 1.4;
        pcCost = pcCost.toFixed(0) * 1;
        if(item == "pc") {
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
   warning("Max professional clickers.", 2000);
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
         if(value == "pc") {
            if(pc < items.length) {
            pc++;
            autoclick();
            delay = delay - multi;
            delay.toFixed(0);
            }
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
        document.getElementById("pc").innerHTML = "Professional clickers: " + pc;
        document.getElementById("delay").innerHTML = "Delay: " + delay + "ms";
        document.getElementById("cost").innerHTML = "AutoClicker cost: " + clickerCost;
        document.getElementById("pcCost").innerHTML = "Professional clicker cost: " + pcCost;
    },10);
    window.setInterval(function() {
    saving();
    }, 10000);
    
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

function cpsCalc(itemsA) {
    var x = itemsA.length;
    var y = 0;
    itemsA.forEach(function() {
        y = y + 1;
    });
    return y;
}
