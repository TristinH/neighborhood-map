// variable to hold the current location being viewed
var currentLocation = null;

// Object to hold information about a particular location.
function Location(name, latitude, longitude) {
    // Declare and use 'self' to avoid scoping confusion with 'this'
    // in internal functions.
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
        if (currentLocation === self) {
            return;
        } else if (currentLocation !== null) {
            currentLocation.closeInfo();            
        } 

        self.openInfo();
        currentLocation = self;
    }

    // Open an info window on the marker
    self.openInfo = function() {
        self.info.open(map, self.marker);
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    // Close the info window on the marker
    self.closeInfo = function() {
        self.info.close();
        self.marker.setAnimation(null);
    }

    self.hide = function() {
        self.closeInfo();
        self.marker.setVisible(false);
    }

    self.show = function() {
        self.marker.setVisible(true);
    }

    // bring up the info window when clicked
    self.marker.addListener('click', self.toggleInfo);

    // Make sure the info window is closed when a user clicks to close it
    self.info.addListener('closeclick', self.closeInfo);
}

// Viewmodel for the application
function MapViewModel() {
    var self = this;
    self.attractions = ko.observableArray([]);
    self.searchQuery = ko.observable("");

    for (i = 0; i < locations.length; i++) {
        var locationInfo = locations[i];
        // add a new location object to the array
        self.attractions.push(new Location(locationInfo.name, 
                              locationInfo.lat, locationInfo.lng));        
    }

    self.results = ko.computed(function() {
        if (self.searchQuery() === "") {
            for (i = 0; i < self.attractions().length; i++) {
                self.attractions()[i].show();
            }
            return self.attractions();
        }

        // Do a very simple regex matching: if the name of the location
        // contains the user's search term (ignoring case), it matches.
        var regEx = new RegExp(self.searchQuery(), 'i');
        var matched = [];
        for (i = 0; i < self.attractions().length; i++) {
            var attraction = self.attractions()[i];
            if (attraction.name.match(regEx)) {
                attraction.show();
                matched.push(attraction);
            } else {
                attraction.hide();
            }
        }

        return matched;
    });
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
