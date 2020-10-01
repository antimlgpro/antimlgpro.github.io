//
//
var GameObject;

window.onload = function() {first_start()}

function first_start()
{
	GameObject = new Game();
	GameObject.first_start();

	document.getElementById("melker").addEventListener('click', () => GameObject.add_click(GameObject.button_click_amount), false)
	
}

function Game()
{
	// Data
	this.clicks = 0;
	this.total_cps = [];
	this.button_click_amount = 1;
	
	// Arrays
	this.buildings = [];
	this.upgrades = [];
	
	this.first_start = function()
	{
		// initialize buildings
		this.buildings.push(new building_constructor("Autoclicker", 0,15, 10000, 1))
		this.buildings.push(new building_constructor("Steve", 1, 100,1000, 1))
		this.buildings.push(new building_constructor("Clickfarm", 2,1100, 1000, 8))
		this.buildings.push(new building_constructor("Clickmine", 3,12000, 1000, 47))
		this.buildings.push(new building_constructor("Clickfactory", 4,130000, 1000, 260))
		this.buildings.push(new building_constructor("Clickbank", 5, 1400000, 1000, 1400))
		this.buildings.push(new building_constructor("Clicktemple", 6, 20000000, 1000, 7800))
		this.buildings.push(new building_constructor("Clicktower", 7, 330000000, 1000, 44000))
		this.buildings.push(new building_constructor("Clickshipment", 8, 5100000000, 1000, 260000))
		this.buildings.push(new building_constructor("Clicklab", 9, 75000000000, 1000, 1600000))
		load_objects("#buy_container", "#buy_template", this.buildings, "building");
		
		// initialize upgrades
		this.upgrades.push(new upgrade_constructor(0, "Better Autoclicker",100))
		this.upgrades.push(new upgrade_constructor(1, "Even Better Autoclicker",500))
		this.upgrades.push(new upgrade_constructor(2, "Agressive Autoclicker",10000))
		load_objects("#upgrade_container", "#upgrade_template", this.upgrades, "upgrade");
		
		
		
		// load save
		//this.load()
		
		// start intervals
		var update_interval = setInterval(() => this.update(), 60);
		var add_cps_interval = setInterval(() => this.add_cps(), 1000);
		var save_interval = setInterval(() => this.save(), 30000);
	};
	this.update = function()
	{
		this.clicks = Math.round(this.clicks * 10) / 10;
		this.update_element("clickCounter",
		`Clicks: ${format_numbers(Math.round(this.clicks))} <br /> Cps: ${format_numbers(Math.round(this.get_total_cps() *10) / 10)}`);
	};
	this.update_element = function(element_id, text)
	{
		document.getElementById(element_id).innerHTML = text;
	};
	this.update_total_cps = function(value, id)
	{
		this.total_cps[id] += value
	}
	this.add_click = function(clicks)
	{
		this.clicks += clicks;
	}
	this.remove_click = function(clicks)
	{
		this.clicks -= clicks;
	}
	this.add_cps = function()
	{
		this.add_click(this.get_total_cps());
	}
	this.get_total_cps = function()
	{
		var total = 0;
		this.total_cps.forEach(function(v, id)
		{
			total += v;
		});
		return total
	}
	
	// saving and loading
	
	this.save = function()
	{
		console.log("saved")
		localStorage.setItem('clicks', this.clicks);
		localStorage.setItem('cps', JSON.stringify(this.total_cps));
		localStorage.setItem('btn_click_amnt', this.button_click_amount);
		localStorage.setItem('buildings', JSON.stringify(this.buildings));
	}
	this.load = function()
	{
		console.log("loaded");
		if(localStorage.length === 0)
		{return}
		else
		{
			this.clicks = parseFloat(localStorage.getItem('clicks'));
			this.button_click_amount = parseFloat(localStorage.getItem('btn_click_amnt'));
	
			this.total_cps = JSON.parse(localStorage.getItem('cps'));
			var parsed = JSON.parse(localStorage.getItem('buildings'));
	
			this.buildings.forEach(function(value, idx)
			{
				GameObject.buildings[idx].owned = parsed[idx].owned;
				GameObject.buildings[idx].cost = parsed[idx].cost;
				GameObject.buildings[idx].update_btn()
		});
		}
	}
	this.reset_save = function(){localStorage.clear();window.location.reload(false); }
	
}

function format_numbers(number)
{
	var max_num = [1000000, 1000000000, 1000000000000]
	
	if (number > 999 && number < max_num[0])
	{
		return (number / 1000).toFixed(1) + "K";
	}
	else if (number > 999999 && number < max_num[1])
	{
		return (number / 1000000).toFixed(1) + "M";
	}
	else if (number > 999999999 && number < max_num[2])
	{
		return (number / 1000000000).toFixed(1) + "B";
	}
	else if (number < 999 || number > max_num[max_num.length - 1])
	{
		return number
	}
}


function building_constructor(name, id, cost, speed, clicks_made)
{
	this.name = name;
	this.id = id;
	this.cost = cost;
	this.speed = speed;
	this.clicks_made = clicks_made;
	this.owned = 0
	this.cps = this.clicks_made / (speed / 1000);
	
	GameObject.total_cps.push(0);
	
	this.buy = function(amount)
	{
		if(GameObject.clicks >= this.cost)
		{
			this.owned++;
			GameObject.remove_click(amount * this.cost);
			GameObject.update_total_cps(Math.round(this.cps * 10) / 10, this.id);
			
			percent_of = this.cost * 0.15;
			this.cost = Math.round(this.cost + percent_of);
			this.update_btn()
		} else {console.log("not enough clicks for", name)}
	};
	
	this.update_btn = function()
	{
		GameObject.update_element(this.name,`<b>${this.name}</b><br />Cost: ${format_numbers(this.cost)} <br /> Cps: ${format_numbers(this.clicks_made / (this.speed/ 1000))} <br />Owned: ${this.owned}`);
	};
	
}
function upgrade_constructor(name, description, cost)
{
	this.name = name;
	this.description = description;
	this.cost = cost;
	
	this.buy = function(amount)
	{
		if(GameObject.clicks >= this.cost)
		{
			if((this.name == 0 && GameObject.buildings[0].owned >= 1) || (this.name == 1 && GameObject.buildings[0].owned >= 1))
			{
				GameObject.buildings[0].cps *= 2;
				GameObject.button_click_amount *= 2;
				document.getElementById(this.name).remove();
			}
			else if (this.name == 2 && GameObject.buildings[0].owned >= 10)
			{
				GameObject.buildings[0].cps *= 2;
				GameObject.button_click_amount *= 2;
				document.getElementById(this.name).remove();
			}
			else if (this.name == 2 && GameObject.buildings[0].owned >= 10)
			{
				GameObject.buildings[0].cps *= 2;
				GameObject.button_click_amount *= 2;
				document.getElementById(this.name).remove();
			} else {return;}
			GameObject.remove_click(this.cost);
			
		} else {console.log("not enough clicks for", name)}
	};
}

function load_objects(reciver_name, template_name, array, text)
{
	// buildings[${i}].buy(1)
	array.forEach(function(e, i) {
			var reciver = document.querySelector(reciver_name);
			var template = document.querySelector(template_name);
		
			var clone = template.content.firstElementChild.cloneNode(true);
			
			clone.addEventListener('click', function() {array[i].buy(1)}, false)
			clone.setAttribute("id", `${e.name}`)
			
			if(text == "building")
			{
				clone.innerHTML = `<b>${e.name}</b><br />Cost: ${format_numbers(e.cost)} <br />Cps: ${format_numbers(e.cps)} <br />Owned: ${e.owned}`;
			} else if(text == "upgrade")
			{
				clone.innerHTML = `<b>${e.description}</b><br />Cost: ${format_numbers(e.cost)}`;
			}
			
			reciver.appendChild(clone);
	});
}
