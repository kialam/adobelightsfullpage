/**
 * Returns a random number between min and max
 */
function getRandomArbitary (min, max) {
    return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min and max
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


var client, count = 0, humans = new Array();
var player, done, ready = false;
var canvas, context, image_from_canvas;

$(document).ready(function() {
	canvas = document.getElementById("canvasOutput");
	canvas.width = 10;
	canvas.height = 10;
	context = canvas.getContext('2d');
    context.fillStyle = "#000000";
    context.fillRect(0,0,10,10);

	client = new Client( window, {
		username: "website",
		roomname: "adobelights",
		host: "54.214.246.70",
		//host: "localhost",
		port: "8882",
		secure: false,
		debug: false
	});

	client.addEvent("move","any",function(msg, bid) {
		var x = Math.floor(bid / 10);
		var y = bid % 10;

		//console.log(msg, bid, x, y);
		
		var color = "rgba(" + msg + ")";
		context.fillStyle = color;
		context.fillRect(x,y,1,1);
	});

	client.connect();
});