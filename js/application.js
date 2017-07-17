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


  $('.slidey').slick()
})

//google maps
function initMap() {
  var london = {lat: 51.5074, lng: -0.1278};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: london,
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: london,
    map: map
  });
}

//yahoo weather api
function getWeather() {
    var location = $('#location').val();

    $.get('https://query.yahooapis.com/v1/public/yql?q=select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="' + location + '")&format=json', function (data) {
        /* Check that a place was found (we'll just grab the first) */
        if (data.query.results === null) {
            bootbox.alert("Location not found: " + location + "!");

        } else {
          var desc = data.query.results.channel.item.description;
          var final = desc.replace("<![CDATA[",  "").replace("]]>", "");
            $('.results').show().html('<h2>' + data.query.results.channel.item.title + '</h2>' +
                final);
        }

    });
}
