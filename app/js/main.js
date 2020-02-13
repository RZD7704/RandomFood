'use strict';
const SERVER_URL = 'https://my-json-server.typicode.com/RZD7704/RandomFood';

let map;


function initMap() {
	let map, coords, styles, marker, info, content;

	coords = {
		lat: 49.588671,
		lng: 34.552087
	};
	content = '<h1 class="info-title">I\'m here</h1>';
	styles = []

	map = new google.maps.Map(document.getElementById('map'), {
		center: coords,
		zoom: 11,
		styles: styles,
		disableDefaultUI: true,
	});

	marker = new google.maps.Marker({
		position: coords,
		map: map,
		icon: 'images/marker.png',
		draggable: true
	});

	info = new google.maps.InfoWindow({
		content: content
	});

	marker.addListener('click', function () {
		info.open(map, marker);
	});
}

(function ($) {
	//variables
	let close = document.querySelectorAll('.close-icon');

	$(document).ready(function () {
		// Events
		$('.btn-res').click(() => {
			getRestaurant();
		});

		$('.profile').click(() => {
			show();
		});

		$('.close-icon').click(() => {
			hide();
		});

		$('.btn-choose').click(() => {
			show();
		});



		close.onclick = hide();
		// profile.onclick = show();


		// Functions
		function getRestaurant() {
			let query = $('.search__field').val();

			if (query !== '') {
				$('body').addClass('loading');
				$('.movie').remove();

				$.ajax({
					url: `${API_URL}/search/movie`,
					type: 'GET',
					data: {
						api_key: API_KEY,
						query: query
					}
				}).then((res) => {
					if (res.results.length === 0) {
						alert('No movies found with your search');
					} else {
						res.results.forEach((movie) => {
							if (movie.poster_path !== null) {
								$('.movies').append(drawMovie(movie));
							}
						});
					}

					$('body').removeClass('loading');
				});

			} else {
				alert('Please, fill the search')
			}
		}

		function show() {
			let windowLog = document.getElementById('window-log');
				let windowChoose = document.getElementById('window-choose');

			windowChoose.style.display = 'block';
			windowLog.style.display = "block";

		}

		for (let i = 0; i < close.length; i++) {
			close[i].onclick = hide();
		}

		function hide() {



			let windowLog = document.getElementById('window-log');
			let windowChoose = document.getElementById('window-choose');

			windowLog.style.display = "none";
			windowChoose.style.display = "none";
		}
	});
})(jQuery);