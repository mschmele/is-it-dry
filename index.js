index = {
  currentDateLocale: new Date().toLocaleDateString().split('/').join('-'),
  currentDateISO: new Date().toISOString().split("T")[0],
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
  climbConditions: ["smap", "cloud-cover"],
  skiConditions: ["snow-pack", "cloud-cover"],
  
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

    $('.activity-selector').on('click', function (event) {
      index.activitySelected(event);
    });

    $('#custom-conditions .collapse').on('click', function (event) {
      $('#custom-conditions').slideUp();
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

    var imageMapType = new google.maps.ImageMapType(index.layerOptions());

    map.overlayMapTypes.push(imageMapType);
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
    index.activity = event.target.getAttribute('for');

    if (index.activity === "other") {
      $('#custom-conditions').slideDown();
    } else {
      $('#custom-conditions').slideUp();
    }
  },

  getTileUrl: function(tile, zoom) {
      return "https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/" +
               "AMSR2_Soil_Moisture_SCA_Day/default/" + index.currentDateISO +
               "/GoogleMapsCompatible_Level6/" +
                zoom + "/" + tile.y + "/" +
                tile.x + ".png";
  },

  layerOptions: function () {
    return {
      alt: "AMSR2_Soil_Moisture_SCA_Day",
      getTileUrl: index.getTileUrl,
      maxZoom: 6,
      minZoom: 1,
      name: "AMSR2_Soil_Moisture_SCA_Day",
      tileSize: new google.maps.Size(256, 256),
      opacity: 0.5
    }
  }
}
