//main.js
//Here's the starting point of everything.

//When the window loads, start everything.
window.onload = function(){

	//Set document to global so it can ba accesed by nodejs. (Anything inside node_modules)
	global.document = document;
	//Set window to global so it can be accessed by nodejs.
	global.window = window;


	//Import Engine.js
	var Engine = require('Engine');

	//Import Composition.js
	var Composition = require('Composition');

	//Create start level
	var mainLevel = require('MainLevel');

	window.addEventListener('keyup', function(e){
		global.engine.level.propagate("keyup", [e.keyCode]);
	});

	window.addEventListener('keydown', function(e){
		global.engine.level.propagate("keydown", [e.keyCode]);
	});

	window.addEventListener('keypress', function(e){
		global.engine.level.propagate("keypress", [e.keyCode]);
	});

	var mouseIsDown = false;
	window.addEventListener('onmousedown', function(e){
		mouseIsDown = true;
		global.engine.level.propagate("mousedown", [e.clientX, e.clientY]);
	});

	window.addEventListener('onmousemove', function(e){
		if(mouseIsDown){
			global.engine.level.propagate("mousedrag", [e.clientX, e.clientY]);
		}
		global.engine.level.propagate("mousemove", [e.clientX, e.clientY]);
	})

	window.addEventListener('onmouseup', function(e){
		mouseIsDown = true;
		global.engine.level.propagate("mouseup", [e.clientX, e.clientY]);
	});

	// Click on Start Button on Main Menu
	document.getElementById("startButton").onclick = function() {
		// Create a new engine with the level MainLevel and set to global so it can be accesed by nodejs
		global.engine = new Engine(mainLevel());
		global.engine.start();

		// Disappear main menu div by setting display to none
		document.getElementById("main-menu").className += " hidden";
		document.getElementById('control-panel').className = " ";
	}

	// Click on Start Button on Main Menu
	document.getElementById("startButtonCreds").onclick = function() {
		// Create a new engine with the level MainLevel and set to global so it can be accesed by nodejs
		global.engine = new Engine(mainLevel());
		global.engine.start();

		// Disappear credits div by setting display to none
		document.getElementById("credits").className += " hidden";
		document.getElementById('control-panel').className = " ";
	}

	// Click on Credits Button on Main Menu
	document.getElementById("creditsButton").onclick = function() {
		// Disappear main menu div by setting display to none
		document.getElementById("main-menu").style.display = 'none';

		// Apper credits div by setting display to block
		document.getElementById("credits").style.display = 'block';
	}

	// Click on Return Button on Credits Menu
	document.getElementById("returnButton").onclick = function() {
		// Apper main menu div by setting display to block
		document.getElementById("main-menu").style.display = 'block';

		// Disappear credits div by setting display to none
		document.getElementById("credits").style.display = 'none';
	}
	var toggleEditor = false;
	//Shows code editor
	document.getElementById("editor").onclick = function(){
		if(toggleEditor){
			document.getElementById('contain-editor').className = "container hidden";
			toggleEditor = false;
		}
		else{
			document.getElementById('contain-editor').className = "container";
			toggleEditor = true;
		}
	}
	//Attacks
	document.getElementById("attack").onclick = function(){
		if(toggleAttack){
			document.getElementById('contain-editor').className = "container hidden";
			toggleAttack = false;
		}
		else{
			document.getElementById('contain-editor').className = "container";
			toggleAttack = true;
		}
	}
}
