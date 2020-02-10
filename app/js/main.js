'use strict';

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

	marker.addListener('click', function() {
		info.open(map, marker);
	});
}

(function($){
	$(document).ready(function() {
		// Code

	});
})(jQuery);
