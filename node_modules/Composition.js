//Composition.js
//Very important part of the engine. Implements a Component Entity System
//http://www.wikipedia.org/en/Entity_component_system
//http://gameprogrammingpatterns.com/component.html

/*
A component system is basically a system when every game object
is made up of small components that each perform separate tasks.
Components have access to other components inside the same gameobject
and may work together. If you need, for example, a slight variation
for a game object, you need only create another game object with
slightly different components. This helps organize better the game.
Read URLs above for a better understanding of a component system.

What makes the Composition.js system different from a traditional
component system is that components may contain other components.
Compositions only have access to their sister and children
compositions, and have no access to the parent composition.
This makes it so that a game object will also be a composition,
which as the name suggests is a compilation of many components.

Ex.
A player composition for example may have a rigidbody component (for physics),
a collider component (collision detection), and a renderer
component. The rigidbody component can then communicate with the
collision component to determine if a collision occured.

Compositions should be used when you need to do something each
frame update or every frame's draw call. Examples include moving
a character, calculating physics, rendering terrain, etc.
Compositions should not be used when you only want to store some
variables or helper functions. Normal javascript objects should be
used instead.

Current methods that compositions may implement are start(), update(),
draw(), keypress(), keydown(), keyup(), and clear() functions.
Refer to Engine.js to see when these functions are called.

TODO:
Si tenemos tiempo igual y hacer un sistema de mensajes aqui para usarlo
por ejemplo que si le pican space que se mande un mensaje desde algun
composition KeyboardInput a los demás compositions.

*/


module.exports = (function(){

	//Constructor for Composition class
	/*
		Arguments for Composition must follow the following format:
		Ex.

		Composition("player", player);

		The string "player" refers to composition's identifier, which may be used by neighbour compositions to access it.
	*/

	function Composition(){

		this.components = {};
		this.active = true;
		this.name = "";
		this.functionQueue = [];

		//Call this[functionName]() first, then call childrent this[functionName]()
		//Expose the base property to every composition.
		this.propagate = function(name, args, force){
			if(force || this.active){
				if(this[name] != undefined){
					// var time = window.performance.now();
					this[name].apply(this, args);
					// console.log("Component took "+(window.performance.now()-time)+"ms.");
				}
				for(key in this.components){
					if(this.components[key].propagate != undefined){
						this.components[key].base = this.components;
						// console.log("Key: "+key+", name: "+name);
						this.components[key].propagate.apply(this.components[key], [name, args]);
					}else{
						throw new Error("" + key + " is not a valid component.")
					}

				}
			}

			for(var i = 0; i < this.functionQueue.length; i++){
				this.functionQueue[i]();
			}
			this.functionQueue = [];
			return;
		}
		this.destroy = function(){
			var self = this;

			this.functionQueue[this.functionQueue.length] = function(){
				//Prevent recurrence and stack overflow
				self.functionQueue = []
				if(self.base!=undefined)
					delete self.base[self.name];
				self.propagate("clear",[], true);
				self.propagate("exit",[], true);
			}
		}
		this.add = function(name, component){
			var self = this;
			this.functionQueue[this.functionQueue.length] = function(){
				component.name = name;

				component.base = self.components;
				component.propagate("start");
				self.components[name] = component;
			}
		}


		//Since 'arguments' is in the format ["name0",composition0, "name1", composition1, ...],
		//we use each name and composition as a key-value pair inside the 'this.components' object.
		for (var i = 0; i < arguments.length/2; i++) {
			arguments[i*2 + 1].name = arguments[i*2];
			this.components[arguments[i*2]] = arguments[i*2 + 1]
		}
	}

	return Composition;
})();
