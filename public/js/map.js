let myLocation;
let initMap = (function() {
  let map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: -34.397,
      lng: 150.644},
    zoom: 14
  });
  let infoWindow = new google.maps.InfoWindow({map: map});
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var position = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      myLocation = position;
      infoWindow.setPosition(position);
      infoWindow.setContent('Esta es tu ubicación');
      let thisPlace = new google.maps.LatLng(myLocation.lat, myLocation.lng);

      function createMarker(thisPlace) {
        let placeLoc = thisPlace.geometry.location;
        let marker = new google.maps.Marker({
          map: map,
          position: thisPlace.geometry.location
        });
        google.maps.event.addListener(marker, 'click', function() {
          infoWindow.setContent(thisPlace.name);
          infoWindow.open(map, this);
        });
      };
      map.setCenter(position);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    handleLocationError(false, infoWindow, map.getCenter());
  }
});

let handleLocationError = (function(browserHasGeolocation, infoWindow, pos) {
infoWindow.setPosition(pos);
infoWindow.setContent(browserHasGeolocation ?
  'Error: No deseas la ubicación' :
  'Error: Your browser doesn\'t support geolocation.');
});
