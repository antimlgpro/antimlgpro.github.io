// clicks
var clicks = 0;

// delay
var delay = 5000;
var delayMin = 0;

// player stuff
var items = [];
var clickers = [];

// version
var version = "2.3.0";

// debug
var debug = false;

function startGame() 
{
    game.start();
    
    // Items (name, cost, multi, cps, cpsConst, delay)
    clickers.push(new createClicker("Clicker1",   15,  15, 0, 1, 5000));
    clickers.push(new createClicker("Clicker2", 50,  20, 0, 2, 2500));
    clickers.push(new createClicker("Clicker3",   200, 25, 0, 5, 5500));
    clickers.push(new createClicker("Clicker4",500, 25, 0, 10, 6000));
    clickers.push(new createClicker("Clicker5",1000, 25, 0, 20, 6500));
    
    
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
    
    document.getElementById("clicks").textContent = "Clicks: " + clicks;
    for(var i = 0; i < clickers.length; i++) {
        document.getElementById("clicker" + i).textContent = clickers[i].name + ": " + items.filter(function(x){return x==clickers[i].name}).length;
        document.getElementById("delay" + i).textContent = "Delay: " + (clickers[i].delay/1000).toFixed(0) + "s";
        document.getElementById("cost" + i).textContent = "Cost: " + clickers[i].cost
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
    this.cpsConst = cpsConst;
    
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
        <li class="mdc-list-item buy-list-item">
            <span class="mdc-list-item__text">
                <span class="mdc-list-item__primary-text buy-list-text">${clickers[i].name}</span>
                <span class="mdc-list-item__secondary-text buy-list-text" id="cost${i}">Cost: ${clickers[i].cost}</span>
                <span class="mdc-list-item__secondary-text buy-list-text" id="delay${i}">Delay: </span>
                <span class="mdc-list-item__secondary-text buy-list-text" id="cps${i}">Cps: </span>
            </span>
            <button class="mdc-button buy-list-btn mdc-elevation--z2" data-mdc-auto-init="MDCRipple" onclick="buyItem(${i})">
                <span class="mdc-button__label buy-list-btn-label">Buy ${clickers[i].name}</span>
            </button>
    </li>
`;

const markup2 = ` 
    <span class="value-text" id="clicker${i}">Clicker: </span>
`;

document.getElementById("buy-list").innerHTML += markup;
document.getElementById("value-card-container").innerHTML += markup2;
}

