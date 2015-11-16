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
	var terrain = require('terrain');
	var player = require('player');
	var sky = require('sky');
	var sun = require('sun');
	var startLevel = new Composition('sun', sun, 'sky', sky, 'terrain', terrain, 'player', player);

	//Create a new engine with the level startLevel and set to global so it can be accesed by nodejs
	global.engine = new Engine(startLevel);

	window.addEventListener('keyup', function(e){
		global.engine.level.propagate("keyup", [e.keyCode]);
	});

	window.addEventListener('keydown', function(e){
		global.engine.level.propagate("keydown", [e.keyCode]);
	});

	window.addEventListener('keypress', function(e){
		global.engine.level.propagate("keypress", [e.keyCode]);
	});
}