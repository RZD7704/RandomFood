'use strict';

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
	let SERVER_URL = 'https://my-json-server.typicode.com/RZD7704/RandomFood',
		$restaurants = [];





	$(document).ready(function () {
		// SLIDER
		$('.sl').slick({
			slidesToShow: 3,
			slidesToScroll: 3,
			// autoplay: true,
			// autoplaySpeed: 2000,
			dots: true
		});


		// Burger menu
		$('.menu-btn').on('click', function (e) {
			e.preventDefault();
			$('.menu').toggleClass('menu_active');
			$('.content').toggleClass('content_active');
		});

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

		$('.input__btn-reg').click(() => {
			goToReg();
		});

		$('.btn-choose-random').click(() => {
			openRandomMenu();
			
		});

		// $('.btn-choose-random').click(() => {
		// 	openRandomMenu();
		// 	showNameResto();
		// });

		// $('.btn-show-name').click(() => {
		// 	showNameResto();
		// });

		$('.btn__end').click(() => {
			showEnd();
		});



		// $('.carousel-content').slick({
		// 	nextArrow:"<img class='a-right control-c next slick-next' src='../images/shoe_story/arrow-right.png'>"
		// });


		// $('.btn-choose-random').click(() => {
		// 	openMenu();
		// })

		// Functions
		if (window.location.pathname === '/restaurant.html') {
			$.ajax({
				url: `${SERVER_URL}/restaurants`,
				type: 'GET'
			}).then((data) => {
				$restaurants = data;
				// TODO: draw elements restaurant
				$restaurants.forEach((resto, index) => {
					let restaurantsList = $('.restaurants'); //масив ресторанов
					restaurantsList.append(drawItem(resto, 'menu.html'));
					console.log(restaurantsList);

					restaurantsList[0].children[index].onclick = () => openMenu(index);

				});
			});
		} else if (window.location.pathname === '/menu.html') {
			$.ajax({
				url: `${SERVER_URL}/restaurants`,
				type: 'GET'
			}).then((data) => {
				$restaurants = data;
				let index = localStorage.getItem('randomRestIndex');
				console.log(index, $restaurants);
				
				// TODO: draw elements restaurant
				$restaurants[+index].menus.forEach((menu) => {
					$('.menus').append(drawItem(menu, 'order.html'));
				});
				showNameResto();

			});
		}





		function drawItem(item, redirectLink) {
			let restaurantDOM = `<div class="link__div"
									<a href="${redirectLink}" class="link__res" data-id="${item.id}">
										<img src="${item.logo}" class="link__img">
										<div class="link__name">
											<h1 class="link__h1">${item.name}</h1>
										</div>
									</a>
								</div>`;

			return restaurantDOM;
		}



		function showEnd() {
			let endLog = document.getElementById('window-end');
			endLog.style.display = "block";

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
			let windowReg = document.getElementById('window-reg');

			windowLog.style.display = "none";
			windowChoose.style.display = "none";
			windowReg.style.display = 'none';
		}

		function chooseNext() {

			let numPeople = $('.count-people').val(),
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

		function goToReg() {
			hide();
			let windowReg = document.getElementById('window-reg');
			windowReg.style.display = 'block';
		}

		//random restaurants
		function openMenu(restIndex) {
			console.log(restIndex);
			localStorage.setItem('randomRestIndex', restIndex);
			window.location.pathname = '/menu.html'
		}

		function openRandomMenu() {
			let restIndex = Math.floor(Math.random() * $restaurants.length);
			openMenu(restIndex);

		}


		


		function showNameResto() {
			let outNameResto = document.getElementById('name-resto'),
				garrys = "Garrys",
				rise = "Rise",
				shade = "Shade Burger",
				randomRestIndex = localStorage.getItem('randomRestIndex');


			if (randomRestIndex == 0) {
				outNameResto.innerHTML = garrys;
			} else if (randomRestIndex == 1) {
				outNameResto.innerHTML = rise;
			} else if (randomRestIndex == 2) {
				outNameResto.innerHTML = shade;
			}

			console.log(restIndex);
		}




	});
})(jQuery);