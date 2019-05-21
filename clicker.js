// clicks
var clicks = 0;

// delay
var delay = 5000;
var delayMin = 0;

// player stuff
var items = [];

var autoClicker;
var betterClicker;

// version
var version = "2.1.0";

// debug
var debug = false;

function startGame() 
{
    game.start();
    
    // items
    autoClicker = new createClicker("autoclicker", 15, 15, 0, 1, 5000);
    betterClicker = new createClicker("betterclicker", 50, 20, 0, 2, 2500)
    
    //intervals
    this.autoLoop = setInterval(autoClicker.update, autoClicker.delay);
    this.betterLoop = setInterval(betterClicker.update, betterClicker.delay);
    
    // info
    console.log("LOADED \nVersion: " + version);
    
}

var game = {
    
    start : function() 
    {
        this.interval = setInterval(update, 10);
    }
}

function update() 
{   
    updateTxt();
}

function addClick(amount,name) 
{
    clicks = clicks + amount;
    if(debug == true){console.log("addclick." + name + "\n" + amount);}
    document.getElementById("clicksPlus").innerHTML = "+" + amount;
    setTimeout(function(){ 
    document.getElementById("clicksPlus").innerHTML = "";
    }, 1000);
}

function createClicker(name, cost, multi, cps, cpsConst, delay) 
{
    this.name = name; // name
    this.cost = cost; // cost
    this.multi = multi; // cost multiplier
    this.cps = cps; // cps
    this.delay = delay; // delay
    
    this.update = function() 
    {
        this.cps = cps;
        if (items.length > 0) {
            addClick(cps, name);
        }
    },
    this.changeCost = function() 
    {
        this.cost = (this.cost + (this.multi / 100) * this.cost).toFixed(0) * 1;
        cps = cps + cpsConst;
        if(debug == true){console.log("changeCost." + name + "\ncpsConst: " + cpsConst + "\ncps: " + cps);}
        
    }
}

function buyItem(item) 
{
    var cost = item.cost;
    var multi = item.multi;
    var name = item.name;
    
    if (clicks >= cost) 
    {
        clicks = clicks - cost;
        items.push(name);
        item.changeCost();
    } 
    else 
    {
        warning("You need more clicks!", 1000)
    }
}

function warning(text, time) 
{
    document.getElementById("warning").style.display = 'block';   
    document.getElementById("warning").innerHTML = text;
    setTimeout(function(){ 
    document.getElementById("warning").style.display = 'none';
    document.getElementById("warning").innerHTML = "";
    }, time);
}

function updateTxt() 
{
    document.getElementById("clicks").innerHTML = "Clicks: " + clicks;
    
    // autoclicker
    document.getElementById("auto").innerHTML = "Autoclickers: " + items.filter(function(x){return x=="autoclicker"}).length;
    document.getElementById("delay").innerHTML = "Delay: " + autoClicker.delay + "ms " + autoClicker.delay/1000 + "s";
    document.getElementById("cost").innerHTML = "Cost: " + autoClicker.cost;
    
    // betterclicker
    document.getElementById("better").innerHTML = "Betterclickers: " + items.filter(function(x){return x=="betterclicker"}).length;
    document.getElementById("delay2").innerHTML = "Delay: " + betterClicker.delay + "ms " + betterClicker.delay/1000 + "s";
    document.getElementById("cost2").innerHTML = "Cost: " + betterClicker.cost;
}

window.onload = startGame();