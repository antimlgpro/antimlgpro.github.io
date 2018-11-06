var numclicks = 0;
var delay = 500;
var multi = 5;


//player stuff
var items = [];
var clicks = 0;
var autoclickerCost = 100;

function clickbtn() {
    addclick();
}

function addclick() {
    numclicks++;
}

function autoclick() {
    window.setInterval(function() {
        addclick();
    }, delay);
}

function buyItem(item, amount) {
    if(numclicks >= autoclickerCost) {
        numclicks = numclicks - autoclickerCost;
        autoclickerCost = autoclickerCost + 50;
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
    window.setInterval(function(){
    items.forEach(function(value){
        if(value == "autoclicker") {
            if(clicks < items.length) {
            clicks++;
            autoclick();
            delay = delay - multi;
            }
        }
        
        
    });
        document.getElementById("clicks").innerHTML = "Clicks: " + numclicks;
        document.getElementById("auto").innerHTML = "Autoclickers: " + clicks;
        document.getElementById("delay").innerHTML = "Delay: " + delay + "ms";
    },10);
    
}

window.onload = gameLoop;
