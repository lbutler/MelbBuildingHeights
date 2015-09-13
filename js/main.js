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


  //utfGrid.on('click', function (e) {
  //  //click events are fired with e.data==null if an area with no hit is clicked
  //  if (e.data) {
  //      alert('click: ' + e.data.HEIGHT);
  //  } else {
  //      alert('click: nothing');
  //  }
  //});
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


  //Legend
  function getColor(d) {
      return d > 240 ? '#fd80ac' :
             d > 190  ? '#fde6a2' :
             d > 145  ? '#c7e9b4' :
             d > 60  ? '#7FCDBB' :
             d > 30   ? '#41B6C4' :
             d > 15   ? '#1D91C0' :
             d > 5    ? '#225EA8' :
                        '#1c3475';
  }

  var legend = L.control({position: 'bottomright'});

  legend.onAdd = function (map) {

      var div = L.DomUtil.create('div', 'info legend'),
          grades = [0, 5, 15, 30, 60, 145, 190, 240],
          labels = [];

      div.innerHTML = 'Height (m)<br>';

      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < grades.length; i++) {
          div.innerHTML +=
              '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
              grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
      }

      return div;
  };

  legend.addTo(map);





})();