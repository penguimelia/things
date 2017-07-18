$(document).ready(function () {
  $('img').on('click', function() {
    $(this).parent().find('> ul').toggle();
  })

  $(window).resize(function() {
    if ($(window).width() > 625)
      $('nav > ul').show();

  })

  var clicked = 0;
  $('.hero .btn').on('click', function() {
    if (clicked == 0) {
      $('.hero').animate({'top': '-=40%'});
      $('.hero .def').fadeIn();
      clicked++;
    }
    else if (clicked == 1) {
      $('.hero').animate({'top': '+=40%'});
      $('.hero .def').fadeOut();
      clicked=0;
    }
  });

  $('.slidey').slick();
})

//google maps
var address;
var map;
var london = {lat: 51.5074, lng: -0.1278};

$(window)["0"].GoogleMapsLoader.KEY="AIzaSyApejepoIEkCMu8QL67kOsPcKrQ1hCphn8";
$(window)["0"].GoogleMapsLoader.WINDOW_CALLBACK_NAME= "initMap";
$(window)["0"].GoogleMapsLoader.onLoad(function(google) {
	console.log('loaded google maps api');
});

GoogleMapsLoader.load(function(google) {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: london,
    scrollwheel: false
  });
});

function geocodeAddress(geocoder, resultsMap) {

  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      bootbox.alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

//yahoo weather api
function getWeather() {

  $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + address + '")&format=json', function (data) {
      /* Check that a place was found (we'll just grab the first) */
    if (data.query.results === null) {
      bootbox.alert("Location not found: " + address + "!");

    } else {
      var desc = data.query.results.channel.item.description;
      var final = desc.replace("<![CDATA[",  "").replace("]]>", "");
      $('#results').show().html('<h3>' + data.query.results.channel.item.title + '</h3>' +
          final);
    }
  });
}

function statusSubmit() {
  address = $('#location').val();

  $('#map').show();
  google.maps.event.trigger(map, 'resize');

  var geocoder = new google.maps.Geocoder;
  geocodeAddress(geocoder, map);

  getWeather();
}
