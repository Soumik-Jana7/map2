const iframeContainer = document.getElementById('map');
function initMap() {
  const map = new google.maps.Map(iframeContainer, {
    center: { lat: 37.7749, lng: -122.4194 }, // Default location (San Francisco, can be changed)
    zoom: 8,
  });
  // Click event to get the coordinates
  map.addListener('click', (event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();
    // Store lat and lng in Retool state
    utils.setValue('clickedLatitude', clickedLat);
    utils.setValue('clickedLongitude', clickedLng);
    // Now do reverse geocoding to get the address from lat/lng
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: { lat: clickedLat, lng: clickedLng } }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        // Set the address value in Retool state
        utils.setValue('meetingPointAddress', address);
      }
    });
  });
}
// Load Google Maps script
function loadGoogleMapsScript() {
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAQB4j28piebvwsV_TT0vnrCy_qLQqfpY4&callback=initMap`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}
if (!window.google) {
  loadGoogleMapsScript();
} else {
  initMap();
}