// Object to hold information about a particular location.
function Location(name, latitude, longitude) {
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;

    // Create the map marker for this SubwayStation object
    this.marker = new google.maps.Marker({
        position: {lat: this.latitude, lng: this.longitude},
        map: map,
        title: this.name
    });

    // The location's info window
    this.info = new google.maps.InfoWindow({
        content: this.name
    });

    // function to open a window
    this.openInfo = function() {
        this.info.open(map, this.marker);
    }

    // function to close a window
    this.closeInfo = function() {
        this.info.close();
    }

    // bring up the info window when clicked
    this.marker.addListener('click', this.openInfo());
}

// Viewmodel for the application
function MapViewModel() {
    this.attractions = ko.observableArray([]);

    for (i = 0; i < locations.length; i++) {
        var locationInfo = locations[i];
        // add a new location object to the array
        this.attractions.push(new Location(locationInfo.name, 
                              locationInfo.lat, locationInfo.lng));        
    }
}

// map object for the main map display
var map;

// function to initialize the map
function initMap() {
    var la = {lat: 34.0522, lng: -118.2437};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: la
    });

    ko.applyBindings(new MapViewModel());
}

// temporary model for the app, just to have data to test things out
var locations = [
    {name: "Griffith Park Observatory", lat: 34.1184, lng: -118.3004},
    {name: "Hollywood Walk of Fame", lat: 34.1016, lng: -118.3269}    
];
