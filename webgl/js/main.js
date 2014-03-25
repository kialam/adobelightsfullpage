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

var connection = new WebSocket('ws://54.203.249.154:5052', ['soap', 'xmpp']);
                    
                    // When the connection is open, send some data to the server
                    connection.onopen = function () {
                        console.log('connection opened');
                        connection.send(JSON.stringify({message: 'Ping'})); // Send the message 'Ping' to the server
                    };

                    // Log errors
                    connection.onerror = function (error) {
                        console.log('WebSocket Error ' + error);
                    };

                    // Log messages from the server
                    connection.onmessage = function (e) {
                        var data = JSON.parse(e.data);
                        //console.log('Server: ' + e.data);  
                        //console.log(data);
                        var i=0;

						for (var _y = 0; _y < 10; _y++) {
							for (var _x = 0; _x < 10; _x++) {
								var color = "rgba(" + data[i] + ")";
								if(data[i] === undefined)return;
								//if(i==0)console.log(color)
								context.fillStyle = color;
								context.fillRect(_x,_y,1,1);
								i++
							};
						};
						
						if ( texture ) texture.needsUpdate = true;
                    };


	

	client.connect();
});