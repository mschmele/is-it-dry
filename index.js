index = {
  countries: {
    'us': {
      center: {lat: 37.1, lng: -95.7},
      zoom: 3
    }
  },
  autocomplete: null,
  lat: null,
  lon: null,
  activity: "climb",
  
  bindEvents: function () {
    $('.search-query').keyup(function(event) {
      if(event.target.value) {
        $('.search-submit').attr('disabled', false);
        return;
      }

      $('.search-submit').attr('disabled', true);
    });

    $('.search-submit').on('click', function(event) {
      index.onPlaceChanged();
    });

    $('input[type=radio][name=activity]').on('change', function (event) { 
      index.activitySelected(event);
    });
  },

  initMap: function () {
    map = new google.maps.Map(document.getElementById('map'), {
      zoom: index.countries['us'].zoom,
      center: index.countries['us'].center,
      mapTypeControl: false,
      panControl: false,
      zoomControl: true,
      streetViewControl: false
    });

    index.autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */ (
            document.getElementsByClassName('search-query')[0]), {
          types: ['geocode'],
          componentRestrictions: {'country': 'us'}
        });
    places = new google.maps.places.PlacesService(map);
  },

  onPlaceChanged: function () {
    var place = index.autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(15);
      index.lat = index.autocomplete.getPlace().geometry.location.lat();
      index.lon = index.autocomplete.getPlace().geometry.location.long()
    } else {
      document.getElementsByClassName('search-query')[0].placeholder = 'DESTINATION';
    }
  },

  activitySelected: function (event) {

  }
}
