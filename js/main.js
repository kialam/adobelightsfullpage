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
	var width = window.innerWidth, height = window.innerHeight;
	var widthHalf = width / 2, heightHalf = height / 2;
	var boxSize = {x:250,y:145};

	posX = (box.x)-boxSize.x/2; // added offset
	posY = (-height/2+box.y-boxSize.y)+50; //added offset

	$('.popup').css("left", posX);
	$('.popup').css("top", posY);
	
};

function openPopup() {
    $('.popup').css('opacity', '0');
    // $('.popup').css('margin-top', '0');
    $('.popup').show().animate({
		opacity: 1,
		// marginTop: 5
	});
    showAristInfo();
    moveArtistInfo();
}

function closePopup() {
	$(".popup").animate({
			opacity: 0,
			marginTop: 0
		}, function() {
			$(this).hide();
		});
}