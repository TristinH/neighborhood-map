// variable to hold the current location being viewed
var currentLocation = null;

// Object to hold information about a particular location.
function Location(name, latitude, longitude) {
    var self = this;
    self.name = name;
    self.latitude = latitude;
    self.longitude = longitude;

    // Create the map marker for self SubwayStation object
    self.marker = new google.maps.Marker({
        position: {lat: self.latitude, lng: self.longitude},
        map: map,
        title: self.name
    });

    // The location's info window
    self.info = new google.maps.InfoWindow({
        content: self.name
    });

    // Close the currently displayed window if there is one
    // and display the info window on the marker clicked.
    self.toggleInfo = function() {
        if (currentLocation != null) {
            currentLocation.closeInfo();            
        } 

        self.openInfo();
        currentLocation = self;
    }

    self.openInfo = function() {
        self.info.open(map, self.marker);
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    // function to close a window
    self.closeInfo = function() {
        self.info.close();
        self.marker.setAnimation(null);
    }

    // bring up the info window when clicked
    self.marker.addListener('click', self.toggleInfo);
}

// Viewmodel for the application
function MapViewModel() {
    var self = this;
    self.attractions = ko.observableArray([]);

    for (i = 0; i < locations.length; i++) {
        var locationInfo = locations[i];
        // add a new location object to the array
        self.attractions.push(new Location(locationInfo.name, 
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
