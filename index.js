index = {
  countries: {
    'us': {
      center: {lat: 37.1, lng: -95.7},
      zoom: 3
    }
  },

  autocomplete: null,
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
    } else {
      document.getElementsByClassName('search-query')[0].placeholder = 'DESTINATION';
    }
  }
}
