(function() {

	var map = L.map('map').setView([-37.8136, 144.9631], 14);

	mapLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; ' + mapLink + ' Contributors',	maxZoom: 18,}).addTo(map);

})();