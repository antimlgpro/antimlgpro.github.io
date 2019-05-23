// clicks
var clicks = 0;

// delay
var delay = 5000;
var delayMin = 0;

// player stuff
var items = [];
var clickers = [];

// version
var version = "2.2.0";

// debug
var debug = false;

function startGame() 
{
    game.start();
    
    // Items (name, cost, multi, cps, cpsConst, delay)
    clickers.push(new createClicker("AutoClicker",   15,  15, 0, 1, 5000));
    clickers.push(new createClicker("BetterClicker", 50,  20, 0, 2, 2500));
    clickers.push(new createClicker("FarmClicker",   200, 25, 0, 5, 5500));
    clickers.push(new createClicker("AnotherClicker",500, 25, 0, 10, 6000));
    clickers.push(new createClicker("ExtraClicker",1000, 25, 0, 20, 6500));
    
    
    // Intervals
    for(var i = 0; i < clickers.length; i++) {
    setInterval(clickers[i].update, clickers[i].delay);
    }
    // Info
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
    for(var i = 0; i < clickers.length; i++) {
    document.getElementById("clicker" + i).innerHTML = clickers[i].name + ": " + items.filter(function(x){return x==clickers[i].name}).length;
    document.getElementById("delay" + i).innerHTML = "Delay: " + clickers[i].delay + "ms " + clickers[i].delay/1000 + "s";
    document.getElementById("cost" + i).innerHTML = "Cost: " + clickers[i].cost;
    }
}


// Add click
function addClick(amount,name) 
{
    clicks = clicks + amount;
    
    if(debug == true){console.log("addclick." + name + "\n" + amount);} // Debug
    
    if(amount != 0) {
        document.getElementById("plus").innerHTML = "+" + amount;
        setTimeout(function(){ 
        document.getElementById("plus").innerHTML = "";
        }, 500);
    }
}


// Create clicker
function createClicker(name, cost, multi, cps, cpsConst, delay) 
{
    this.name = name; // Name
    this.cost = cost; // Cost
    this.multi = multi; // Cost multiplier
    this.cps = cps; // Cps
    this.delay = delay; // Delay
    
    this.update = function() 
    {
        this.cps = cps; // Cps fix
        if (items.length > 0) {
            addClick(cps, name); // Click adding
        }
    },
    this.changeCost = function() 
    {
        this.cost = (this.cost + (this.multi / 100) * this.cost).toFixed(0) * 1; // Cost increase
        cps = cps + cpsConst; // Cps increase
        if(debug == true){console.log("changeCost." + name + "\ncpsConst: " + cpsConst + "\ncps: " + cps);} // Debug
        
    }
}

// Buying items

function buyItem(item) 
{
    item = clickers[item];
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

// Start game
window.onload = startGame();


// Buy menu generation
for(var i = 0; i < clickers.length; i++) {
const markup = `
    <div class="buyItem">
        <button onclick="buyItem(${i})" class="buyBtn mdc-elevation--z8 mdc-ripple-surface">Buy ${clickers[i].name}</button>
        <p id="delay${i}">Delay: ${clickers[i].delay}</p>
        <p id="cost${i}">Cost: ${clickers[i].cost}</p>
     </div>
`;
document.getElementById("clickerDiv").innerHTML += markup;
}

