//main.js
//Here's the starting point of everything.

var PlayerScriptRunner = require("PlayerScriptRunner");

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

	// Click on Start Button on Main Menu
	document.getElementById("startButton").onclick = function() {
		// Create a new engine with the level MainLevel and set to global so it can be accesed by nodejs
		global.engine = new Engine(mainLevel());
		global.engine.start();

		// Disappear main menu div by setting display to none
		document.getElementById("main-menu").className += " hidden";
		document.getElementById('control-panel').className = " ";
		mainAudio.pause();
	}

	// Click on Start Button on Main Menu
	document.getElementById("startButtonCreds").onclick = function() {
		// Create a new engine with the level MainLevel and set to global so it can be accesed by nodejs
		global.engine = new Engine(mainLevel());
		global.engine.start();

		// Disappear credits div by setting display to none
		document.getElementById("credits").className += " hidden";
		document.getElementById('control-panel').className = " ";
		mainAudio.pause();
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
	document.getElementById("attack-sword").onmousedown = function(){
		global.engine.level.propagate("keydown", [32]);
	}

	document.getElementById("attack-sword").onmouseup = function(){
		global.engine.level.propagate("keyup", [32]);
	}

	//Send code
	document.getElementById("send-code").onclick = function(){
		var playerScriptRunner = PlayerScriptRunner(document.getElementById("terminal"));
		playerScriptRunner.runScript(document.getElementById("console").value);
	}


	//Add audio to main menu
	var mainAudio = document.createElement("audio");
	mainAudio.src = "resources/menuSong.ogg";
	mainAudio.loop = true;
	mainAudio.play();

}
