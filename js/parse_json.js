url = 'http://www.json-generator.com/j/cqWlwQKSbm?indent=4'; //expires in 30 days as of 2/12/14
var box;
var artistArray;
var x;
var y;

(function($) {
	$(window).load(function() {
		// get json
		$.getJSON('json/artists.json', function (data) {
				console.log('success getting JSON');
				artistArray = data;
				
			}).fail( function (d, textStatus, error) {
				console.error("getJSON failed, status: " + textStatus + ", error: "+ error);
			});
		// get artist info on click
		$('body').on('cubeclick', function (evt) {
			// var box = evt.box;
			var data = artistArray;
			var i = evt.artistId;
			// console.log('position x: ');
			// console.log(x);
				//for (var i = 0; i < data.length; i++) {
					// console.log(data[i].id);
					//if (data[i].id == artistInfo) {
						// console.log(data[i].name);
						// console.log(box.y);
						artistName = data[i].name;
						artistCompany = data[i].company;
						artistEmail = data[i].email;
						// artistAbout = data[i].about;
						// artistPic = data[i].picture;
						openPopup();
					//}
				//}
			// console.log('artistId:' + evt.artistId);
        });
		$('body').on('cubemove', function (evt) {
			box = evt.box;

			moveArtistInfo();
        });
	});
})(jQuery);

showAristInfo = function () {
	$('#name').html(artistName);
    $('#company').html(artistCompany);
    $('#email').html(artistEmail);
    // $('#about').html(artistAbout);
    // $('#pic').attr("src",artistPic);
};

moveArtistInfo = function () {
	var width = 900, height = 500;
	var widthHalf = width / 2, heightHalf = height / 2;
	var boxSize = {x:220,y:97};
	//console.log("info: ");
	//console.log("x: " + x);
	//console.log("y: " + y);
	//console.log(box.x,box.y);
	posX = (box.x)-20; // added offset
	posY = (-height+box.y-boxSize.y)-10; //added offset
	//console.log('posX: ' + posX);
	//console.log('posY: ' + posY);
	/*position_x = box.x;
	position_y = box.y;
	$('.popup').css("left", position_x-10);
	$('.popup').css("top", position_y-(height+55)-$('.popup').height());*/
	// $('.popup').css({"-webkit-transform": 'translate(' + x_position + 'px' + ',' + y_position + 'px' + ')'});
	$('.popup').css("left", posX);
	$('.popup').css("top", posY);
};

function openPopup() {
    $('#test').css('display', 'block');
    showAristInfo();
    moveArtistInfo();
}

function closePopup() {
    $('#test').css('display', 'none');
}