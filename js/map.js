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
    self.info = new google.maps.InfoWindow();

    self.populateInfo = function() {
        // Check if the content has already been constructed.
        if (self.info.getContent() != null) {
            return;
        }

        // Construct the URL to make the AJAX request to Flickr's servers
        var flickrURL = "https://api.flickr.com/services/rest/?" +
                        "method=flickr.photos.search&" +
                        // Your API key goes here
                        "api_key=NEED_API_KEY&" +
                        "per_page=1&format=json&nojsoncallback=1&text=";
        // Search for the name of the location for a picture.
        flickrURL += encodeURIComponent(self.name.trim() + " attraction");

        // Construct the info window's content
        var infoWindowContent = '<h5>' + self.name + '</h5>';
        infoWindowContent += 'Flickr Image: <br>';

        $.getJSON(flickrURL, function(data) {
            // Process the list of photos returned by the API call to Flickr
            $.each(data.photos.photo, function(i, item) {
                // To show the image we must construct the URL that points
                // to the image's location.
                var imgURL = 'https://farm' + item.farm +
                             '.staticflickr.com/' + item.server +
                             '/' + item.id + '_' +
                             item.secret + '.jpg';
                // Add the image to the info window
                infoWindowContent += '<img class="flickr-img" height="100px" width="100px" src="' + imgURL + '">';
                self.info.setContent(infoWindowContent);
            });
        }).fail(function() {
            // Display this message if the API call fakes
            infoWindowContent += 'Could not load image.';
            self.info.setContent(infoWindowContent);
        });
    };

    // Close the currently displayed window if there is one
    // and display the info window on the marker clicked.
    self.toggleInfo = function() {
        // Make sure the current displayed location is not this object
        if (currentLocation === self) {
            return;
        // Make sure the location is not null before trying to access members
        } else if (currentLocation !== null) {
            currentLocation.closeInfo();
        }

        self.populateInfo();
        self.openInfo();
        currentLocation = self;
    };

    // Open an info window on the marker
    self.openInfo = function() {
        self.info.open(map, self.marker);
        map.panTo(new google.maps.LatLng(self.latitude, self.longitude));
        self.marker.setAnimation(google.maps.Animation.BOUNCE);
    };

    // Close the info window on the marker
    self.closeInfo = function() {
        self.info.close();
        self.marker.setAnimation(null);
    };

    // Hide a marker from the view
    self.hide = function() {
        self.closeInfo();
        self.marker.setVisible(false);
    };

    // Shows markers that are hidden
    self.show = function() {
        self.marker.setVisible(true);
    };

    // Bring up the info window when clicked
    self.marker.addListener('click', self.toggleInfo);

    // Make sure the info window is closed when a user clicks to close it
    self.info.addListener('closeclick', self.closeInfo);
}

// Viewmodel for the application
function MapViewModel() {
    var self = this;
    self.attractions = ko.observableArray([]);
    self.searchQuery = ko.observable("");

    // Add the locations to the attractions array
    for (i = 0; i < locations.length; i++) {
        var locationInfo = locations[i];
        // add a new location object to the array
        self.attractions.push(new Location(locationInfo.name,
                              locationInfo.lat, locationInfo.lng));
    }

    // Array to hold the results of a search
    self.results = ko.computed(function() {
        // If nothing is typed in the input, display all locations
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
            // If location name matches display it
            if (attraction.name.match(regEx)) {
                attraction.show();
                matched.push(attraction);
            // Hide the location of anything that doesn't match
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

function mapErrorHandler() {
    document.getElementById('map').innerHTML = "Google maps could not load properly";
}

// Model for the app
var locations = [
    {name: "Griffith Park Observatory", lat: 34.1184, lng: -118.3004},
    {name: "Hollywood Walk of Fame", lat: 34.1016, lng: -118.3269},
    {name: "Universal Studios Hollywood", lat: 34.1381, lng: -118.3534},
    {name: "Hollywood Sign", lat: 34.1341, lng: -118.3215},
    {name: "Getty Center", lat: 34.0780, lng: -118.4741}
];
