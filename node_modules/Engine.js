//Engine.js
//Defines a main composition where everything currently active is stored
//Calls start, update and draw functions inside current composition (Engine.level)
//Implements a quit method to exit the application
//Exposes the currentLevel property to change levels
var Composition = require('Composition');

module.exports = (function(){

	//Constructor takes a composition as parameter and sets it as the current level
	function Engine(mainComposition){
		//Set level to param.
		//It can be changed later by calling engine.level = nextLevelComposition;
		//as engine is exposed in main.js
		this.level = mainComposition;

		//Stores time of last frame. Used to calculate deltaTime. Is a private var.
		var pastTime = 0;

		this.isPaused = false;

		var now = 0;

		this.time = 0;

		//This allows acces to 'this' inside frame by calling 'self' instead of 'this'.
		var self = this;
		//Private function called every frame
		function frame(){
			//Get time in miliseconds
			now = window.performance.now();

			//Get time difference
			var timeDelta = now-pastTime;

			//Call update => clear window => call draw

			if(!self.isPaused){
				self.time += timeDelta;
				self.level.propagate("clear");
				self.level.propagate("update", [timeDelta*0.001]);
				self.level.propagate("draw", [timeDelta*0.001]);
			}

			//Set past time as current time
			pastTime = now;

			//If the engine is still running, loop
			if(isRunning){
				window.requestAnimationFrame(frame);
			}
		}

		this.find = function(name, where){
			if(where==undefined){
				where = this.level;
			}
			for(key in where.components){
				if(key==name){
					return where.components[key]
				}
				var found = this.find.apply(this, [name, where.components[key]]);
				if(found!=null)
					return found;
			}
		}

		this.start = function(){
			this.level.propagate("start");
			//Call all start functions

			//Set past time
			pastTime = window.performance.now();
			//Start calling frame method every frame
			window.requestAnimationFrame(frame);
		}

		this.pause = function(){
			this.isPaused = !this.isPaused;
		}

		this.quit = function(){
			this.level.destroy();
			isRunning = false;
		}


		window.addEventListener('keyup', function(e){
			self.level.propagate("keyup", [e.keyCode]);
		});

		window.addEventListener('keydown', function(e){
			self.level.propagate("keydown", [e.keyCode]);
		});

		window.addEventListener('keypress', function(e){
			self.level.propagate("keypress", [e.keyCode]);
		});

		var mouseIsDown = false;
		window.addEventListener('mousedown', function(e){
			mouseIsDown = true;
			self.level.propagate("mousedown", [e.clientX, e.clientY]);
		});

		window.addEventListener('mousemove', function(e){
			if(mouseIsDown){
				self.level.propagate("mousedrag", [e.clientX, e.clientY]);
			}
			self.level.propagate("mousemove", [e.clientX, e.clientY]);
		})

		window.addEventListener('mouseup', function(e){
			mouseIsDown = false;
			self.level.propagate("mouseup", [e.clientX, e.clientY]);
		});

	}


	//Private-Shared Properties
	var isRunning = true;

	//Return prototype
	return Engine;

})();
