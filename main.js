//require('main.js');

window.onload = function(){
	global.document = document;
	var Engine = require('Engine');
	var Composition = require('Composition');
	var terrain = require('terrain');
	var player = require('player');
	var main = new Composition('terrain', terrain, 'player', player);
	//Set window and document for later accesing in node modules.
	//To access window: require('nw-context').window
	//To access document: require('nw-context').document
	//An example is shown in ImageRenderer.js
	// console.log("asdasds");
	// var nwContext = require('nw-context');
	// nwContext.set({
	//     window: window,
	//     document: document
	// });

	var canvas = document.getElementById("mainCanvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var context = canvas.getContext("2d");

	//set to global so it can be accesed by compositions
	engine = new Engine(context, new Composition('main', main));

}
