// map object for the main map display
var map;

// function to initialize the map
function initMap() {
    var la = {lat: 34.0522, lng: -118.2437};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: la
    });
}
