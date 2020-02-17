'use strict';
const SERVER_URL = 'https://my-json-server.typicode.com/RZD7704/RandomFood';

let map;
let btnNext = document.querySelector('.btn-choose-next');

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
			showLog();
		});

		$('.close-icon').click(() => {
			hide();
		});

		$('.btn-choose').click(() => {
			showChoose();
		});

		$(btnNext).click(() => {
			chooseNext();
		});



		// close.onclick = hide();
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

		function showLog() {
			let windowLog = document.getElementById('window-log');
			windowLog.style.display = "block";

		}

		function showChoose() {
			let windowChoose = document.getElementById('window-choose');
			windowChoose.style.display = 'block';
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

		function chooseNext() {

			let numPeople = document.querySelector('.count-people').value,
				dishes = document.querySelectorAll('.dishes'),
				kindOfFood = document.querySelectorAll('.food'),
				drink = dishes[2].checked,
				desert = dishes[1].checked,
				main = dishes[0].checked,
				any = kindOfFood[0].checked,
				europe = kindOfFood[1].checked,
				asia = kindOfFood[2].checked,
				ukraine = kindOfFood[3].checked;

			for (let i = 0; i < dishes.length; i++) {
				if (dishes[i].checked) {
					localStorage.setItem('main', main);
					localStorage.setItem('desert', desert);
					localStorage.setItem('drink', drink);
				}
			}

			for (let k = 0; k < kindOfFood.length; k++) {
				if (kindOfFood[k].checked) {
					localStorage.setItem('any-food', any);
					localStorage.setItem('europe-food', europe);
					localStorage.setItem('asia-food', asia);
					localStorage.setItem('ukraine-food', ukraine);
				}

			}

			localStorage.setItem('numPeople', numPeople);
		}

	});
})(jQuery);
