(function() {


  //Create Map
  var southWest = L.latLng(-37.8516, 144.8961),
  northEast = L.latLng(-37.7747, 144.9934),
  bounds = L.latLngBounds(southWest, northEast);

	var map = L.map('map',{minZoom:13, maxZoom: 17, maxBounds: bounds, zoomControl: false}).setView([-37.8136, 144.9631], 14);

  new L.Control.Zoom({ position: 'topright' }).addTo(map);
	mapLink = 'Data: <a href="https://data.melbourne.vic.gov.au/">City of Melbourne</a>  CC BY 3.0 AU | Inspired by <a href="http://maps.nicholsonroad.com/">Vancouver Building Heights</a>';
	L.tileLayer('https://s3-us-west-1.amazonaws.com/melbbuildingheights/Tiles/{z}/{x}/{y}.png', { attribution: mapLink}).addTo(map);


  // UTFGrid

  var utfGrid = new L.UtfGrid('https://s3-us-west-1.amazonaws.com/melbbuildingheights/Tiles/{z}/{x}/{y}.grid.json', {
      useJsonP: false
  });


  utfGrid.on('click', function (e) {
    //click events are fired with e.data==null if an area with no hit is clicked
    if (e.data) {
        alert('click: ' + e.data.HEIGHT);
    } else {
        alert('click: nothing');
    }
  });
  utfGrid.on('mouseover', function (e) {
      $('#tooltip').show();
      $('#tooltip').html('<h3>'+e.data.FMTADDRESS + '</h3><br><b>Height: </b>' +e.data.HEIGHT + 'm <br> <b>Floors: </b>' + e.data.FLOORS);
  });
  utfGrid.on('mousemove', function (e) {
      $('#tooltip').html('<h3>'+e.data.FMTADDRESS + '</h3><br><b>Height: </b>' +e.data.HEIGHT + 'm <br> <b>Floors: </b>' + e.data.FLOORS);
  });
  utfGrid.on('mouseout', function (e) {
      $('#tooltip').hide();
  });
  map.addLayer(utfGrid);

  $(document).bind('mousemove', function(e){
    $('#tooltip').css({
       left:  e.pageX + 20,
       top:   e.pageY
    });
  });




})();