// url = 'http://www.json-generator.com/j/cqWlwQKSbm?indent=4'; //expires in 30 days as of 2/12/14
var box;
var artistArray, artistName, artistWork, artistLoc;
var x;
var y;

(function($) {
	$(window).load(function() {
		// get json
		$.getJSON('https://betadata.info/get/all', function (data) {
			console.log('success getting JSON');
			artistArray = data;
			
		}).fail( function (d, textStatus, error) {
			console.error("getJSON failed, status: " + textStatus + ", error: "+ error);
		});
		// get artist info on click
		$('body').on('cubeclick', function (evt) {
			var data = artistArray;
			var i = evt.artistId;
			if(!data[i])return;
			artistName = data[i].first_name+" "+data[i].last_name;
			artistWork = data[i].behance;
			artistLoc = data[i].physical_location;
						
			openPopup();
        });
		$('body').on('cubemove', function (evt) {
			box = evt.box;
			moveArtistInfo();
        });
	});
})(jQuery);

showAristInfo = function () {
	$('#name').html(artistName);
	if(artistWork && artistWork.length > 1){
		$('#work').attr('href', artistWork);
		$('.link').html('View Work');
	} else {
		$('#work').attr('href', '');
		$('.link').html('');
	}
    $('#location').html(artistLoc);
};

moveArtistInfo = function () {
	var width = window.innerWidth, height = window.innerHeight;
	var widthHalf = width / 2, heightHalf = height / 2;
	var boxSize = {x:250,y:145};
	if(!box)return;
	posX = (box.x)-boxSize.x/2-10; // added offset
	posY = (-height/2+box.y-boxSize.y)+100; //added offset

	$('.popup').css("left", posX);
	$('.popup').css("top", posY);
	
};

function openPopup() {
    $('.popup').css('opacity', '0');
    $('.popup').css('margin-top', '0');
    $('.popup').show().animate({
		opacity: 1,
		marginTop: 5
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