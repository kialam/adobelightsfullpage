// var iframe = document.getElementById("video");
// var player = $f(iframe);

// var playButton = document.getElementById("play-button");
// playButton.addEventListener("click", function() {
// player.api("play");
// });

// var pauseButton = document.getElementById("pause-button");
// pauseButton.addEventListener("click", function() {
// player.api("pause");
// });

console.log('init me');
// var iframe = document.getElementById('video');
var iframe = $('#video');
// $f == Froogaloop
var player = $f(iframe);

// bind events
console.log('hi vid.js here');
$("#play-button").on('click', function() {
	console.log('clicked me play');
});

var playButton = document.getElementById("play-button");
playButton.addEventListener("click", function() {
  console.log('play clicked');
  player.api("play");
});

var pauseButton = document.getElementById("pause-button");
pauseButton.addEventListener("click", function() {
  player.api("pause");
});
