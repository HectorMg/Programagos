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
		// Disappear main menu div by setting display to none
		document.getElementById("main-menu").className += " hidden";
		document.getElementById('playerSelect').className = "popDiv";
	}

	// Click on resume Button on pause Menu
	document.getElementById("resumeButton").onclick = function() {
		// Create a new engine with the level MainLevel and set to global so it can be accesed by nodejs
		global.engine.find("Pauser").pause();
	}

	// Click on Start Button on CharacterSelect Menu
	document.getElementById("startGameButton").onclick = function() {
		//Gets player names from selectors
		var playerone = document.getElementById("p1").value;
		var playertwo = document.getElementById("p2").value;

		// Create a new engine with the level MainLevel and set to global so it can be accesed by nodejs
		global.engine = new Engine(mainLevel(playerone, playertwo));
		global.engine.start();

		// Disappear main menu div by setting display to none
		document.getElementById("playerSelect").className += " hidden";
		document.getElementById('control-panel').className = " ";
		mainAudio.pause();
	}

	// Click on New Player on CharacterSelect Menu
	document.getElementById("newPlayer").onclick = function() {
		//Gets player name from input
		var newPlayer = document.getElementById("newName").value;

		var dataIO = require('dataIO');

		var data = dataIO.readFile();

		data.players[data.players.length] = {
			"name": newPlayer,"highscore":0,"spells":{}
		}

		dataIO.writeFile(data);

		var html = "";

		var dataIO = require('dataIO');

		var data = dataIO.readFile();

		for (var i = 0; i < data.players.length; i++) {
			html += '<option value="'+data.players[i].name+'">';
			html += data.players[i].name;
			html += '</option>';
		}
		html += '</tbody></table>';

		document.getElementById('p1').innerHTML = html;
		document.getElementById('p2').innerHTML = html;

	}

	// Click on Start Button on Credits menu
	document.getElementById("startButtonCreds").onclick = function() {
		// Disappear credits div by setting display to none
		document.getElementById("credits").className += " hidden";
		document.getElementById('playerSelect').className = "popDiv";
		mainAudio.pause();
	}

	// Click on Credits Button on Main Menu
	document.getElementById("creditsButton").onclick = function() {
		// Disappear main menu div by setting display to none
		document.getElementById("main-menu").className += 'hidden';
		// Apper credits div by taking off hidden class
		document.getElementById("credits").className = ' ';
	}

	//Click quit

	document.getElementById("quitGame").onclick = function(){
		window.location.reload();
	}

	// Click on Highscores Button on Main Menu
	document.getElementById("highscoreButton").onclick = function() {
		document.getElementById("main-menu").className += " hidden";
		document.getElementById('highscores').className = " ";

		var dataIO = require('dataIO');

		var data = dataIO.readFile();

		data.players.sort(function(a, b) { return a.highscore < b.highscore ? 1 : -1; }).slice(0, 5);

    var html = '<table class="table no-border"><thead><tr class="no-border"><th class="table-head no-border">Place</th><th class="table-head no-border">Player</th><th class="table-head no-border">Score</th></thead><tbody class="no-border">';

		for (var i = 0; i < data.players.length; i++) {
			html += '<tr class="no-border"><td class="table-cell no-border">';
			html += i+1;
			html += '</td><td class="table-cell no-border">';
		  html += data.players[i].name;
			html += '</td><td class="table-cell no-border">';
		  html += data.players[i].highscore;
		  html += '</td></tr>';
		}
		html += '</tbody></table>';

		document.getElementById('highscores_list').innerHTML = html;

}

	// Click on Return Button on Credits Menu
	document.getElementById("returnButton").onclick = function() {
		// Shows main menu div by taking off hidden class
		document.getElementById("main-menu").className = ' ';
		// Disappear credits div by setting display to none
		document.getElementById("credits").className += ' hidden';
	}

	//Click on Return button on highscores menu
	document.getElementById("returnButtonHighscores").onclick = function(){
		//Shows main menu
		document.getElementById("main-menu").className = ' ';
		//Hides highscores menu
		document.getElementById("highscores").className += ' hidden';
	}




	//Code editor
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
