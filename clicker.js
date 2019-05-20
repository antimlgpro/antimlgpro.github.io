// clicks
var clicks = 0;

// delay
var delay = 5000;
var delayMin = 0;

// player stuff
var items = [];

var autoClicker;
var betterClicker;
var fabbeClicker;

// version
var version = "2.1.8";

function startGame() 
{
    game.start();
    
    // items
    autoClicker = new createClicker("autoclicker", 15, 15, 1, 5000);
    betterClicker = new createClicker("betterclicker", 50, 20, 2, 2500)
    fabbeClicker = new createClicker("fabbeclicker", 200, 30, 5, 5500)
    
    //intervals
    this.autoLoop = setInterval(autoClicker.update, autoClicker.delay);
    this.betterLoop = setInterval(betterClicker.update, betterClicker.delay);
    this.fabbeLoop = setInterval(fabbeClicker.update, fabbeClicker.delay);
    
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

function addClick(amount) 
{
    clicks = parseInt(clicks) + amount;
}

function createClicker(name, cost, multi, cps, delay) 
{
    this.name = name;
    this.cost = cost;
    this.multi = multi;
    this.cps = cps;
    this.delay = delay;
    this.update = function() 
    {
        if (items.length > 0)
            addClick(cps);
    },
    this.changeCost = function() 
    {
        this.cost = (this.cost + (this.multi / 100) * this.cost).toFixed(0) * 1;
        cps = this.cps * 2;
        
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
    
    // fabbeclicker
    document.getElementById("fabbe").innerHTML = "Fabbeclickers: " + items.filter(function(x){return x=="fabbeclicker"}).length;
    document.getElementById("delay3").innerHTML = "Delay: " + fabbeClicker.delay + "ms " + fabbeClicker.delay/1000 + "s";
    document.getElementById("cost3").innerHTML = "Cost: " + fabbeClicker.cost;
}

window.onload = startGame();
