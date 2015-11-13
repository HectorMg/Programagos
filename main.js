//require('main.js');
var Engine = require('Engine');
var Composition = require('Composition');
var terrain = require('terrain');
var player = require('player');
var main = new Composition('terrain', terrain, 'player', player);

window.onload = function(){
	var canvas = document.getElementById("mainCanvas");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var context = canvas.getContext("2d");

	//set to global so it can be accesed by compositions
	engine = new Engine(context, new Composition('main', main));

}
