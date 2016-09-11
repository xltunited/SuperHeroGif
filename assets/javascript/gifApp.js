$(document).ready(function() {

	var iniHeroesArray = [ 'Batman', 'Superman', 'Hulk', 'Iron Man', 'Wonder Woman', 'Spider-Man', 'Black Widow', 'The Flash', 'Aquaman', 'Captain America'];

	var vidArray = [];

	for(var i = 0; i < iniHeroesArray.length; i++){

		var trueName = iniHeroesArray[i].replace(' ', '+');

		$('.button-holder').append('<button data-name=' + trueName + ' class="hero btn btn-lg btn-secondary">' + iniHeroesArray[i] + '</button>');

	}

	$('.add').on('click', function(){

		var original = $('.heroTextbox').val().trim();

		var forButton = "";

		var forData =""

		if(original.length >= 0 ){

			var originalArray = original.toLowerCase().split("");

			originalArray[0] = originalArray[0].toUpperCase();

			for(var i = 0; i < originalArray.length; i++){

				if(originalArray[i] == ' '){

					originalArray[i+1] = originalArray[i+1].toUpperCase();

				}

			}

			forButton = originalArray.join("");

		}

		forData = forButton.replace(' ', '+');

		$('.button-holder').append('<button data-name=' + forData + ' class="hero btn btn-lg btn-secondary">' + forButton + '</button>');

	});

	$(document.body).on('click', '.hero', function() {

		var heroParameter = $(this).attr('data-name');

		var heroUrl = "http://api.giphy.com/v1/gifs/search?q=" + heroParameter + "&api_key=dc6zaTOxFJmzC&limit=10";

		vidArray = [];

		$('.heroCards1').empty();

		$('.heroCards2').empty();

		$('.heroCards3').empty();

		$('.heroCards4').empty();

		$.ajax({url:heroUrl, method:'GET'}).done(function(response) {

			for(var i = 0; i < response.data.length; i++){

				if(i >= 0 && i < 3){

					$('.heroCards1').append('<div class="card heroCard"><img data-number="' + i + '" class="card-img-top img-fluid heroStillImg" src="'+ response.data[i].images.original_still.url +'" alt="'+ heroParameter +'"><div class="card-block"><p class="card-text">Rating: ' + response.data[i].rating.toUpperCase() + '</p></div></div>');

					vidArray.push(response.data[i].images.original.mp4);

					

				}

				if(i >= 3 && i < 6){

					$('.heroCards2').append('<div class="card heroCard"><img data-number="' + i + '"" class="card-img-top img-fluid heroStillImg" src="'+ response.data[i].images.original_still.url +'" alt="'+ heroParameter +'"><div class="card-block"><p class="card-text">Rating: ' + response.data[i].rating.toUpperCase() + '</p></div></div>');

					vidArray.push(response.data[i].images.original.mp4);

				}


				if(i >= 6 && i < 9){

					$('.heroCards3').append('<div class="card heroCard"><img data-number="' + i + '"" class="card-img-top img-fluid heroStillImg" src="'+ response.data[i].images.original_still.url +'" alt="'+ heroParameter +'"><div class="card-block"><p class="card-text">Rating: ' + response.data[i].rating.toUpperCase() + '</p></div></div>');

					vidArray.push(response.data[i].images.original.mp4);

				}

				if(i == 9){

					$('.heroCards4').append('<div class="card heroCard"><img data-number="' + i + '"" class="card-img-top img-fluid heroStillImg" src="'+ response.data[i].images.original_still.url +'" alt="'+ heroParameter +'"><div class="card-block"><p class="card-text">Rating: ' + response.data[i].rating.toUpperCase() + '</p></div></div>');

					vidArray.push(response.data[i].images.original.mp4);

				}



			}

		});


	});

	$(document.body).on('click', '.heroStillImg', function() {

		var nowSel = $(this);

		var parentSel =  $(this).parent();

		var video = $('<video />', {
       		class: 'heroVidOn',
        	src: vidArray[nowSel.attr('data-number')],
        	type: 'video/mp4',
        	controls: false,
        	autoplay: true,
        	loop: true
    	});

    	video.attr('data-state', 'playing')

		parentSel.prepend(video);

    	$(this).remove();

	});

	$(document.body).on('click', '.heroVidOn', function() {

    	if($(this).attr('data-state') == 'playing'){

    		this.pause();

    		$(this).attr('data-state', 'paused');

    	}

    	else{

    		this.play();

    		$(this).attr('data-state', 'playing');

    	}

	});



});