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

	// Click on Start Button on Main Menu
	document.getElementById("startButton").onclick = function() {
		// Create a new engine with the level MainLevel and set to global so it can be accesed by nodejs
		global.engine = new Engine(mainLevel());
		global.engine.start();
		console.log("Starting console");

		// Disappear main menu div by setting display to none
		document.getElementById("main-menu").style.display = 'none';
	}

	// Click on Start Button on Main Menu
	document.getElementById("startButtonCreds").onclick = function() {
		// Create a new engine with the level MainLevel and set to global so it can be accesed by nodejs
		global.engine = new Engine(mainLevel());
		global.engine.start();
		console.log("Starting console");

		// Disappear credits div by setting display to none
		document.getElementById("credits").style.display = 'none';
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

}
