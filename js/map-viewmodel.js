/*
    Object used to represent a location. The marker associated
    with it on the map and an info window are tracked to make
    accessing them easier.
*/
function Location(name, lat, lng) {
    // Basic information about the location
    this.name = name;
    this.lat = lat;
    this.lng = lng;

    // Creates the map marker and info window 
    this.marker = new google.maps.Marker({
        position: {lat: this.lat, lng: this.lng},
        map: map, // map comes from map.js
        clickable: true
    });
    this.info = new google.maps.InfoWindow({
        content: this.name
    });

    this.marker.addListener('click', function() {
        infowindow.open(map, marker);
    });
}

// Array of locations
var locations = [

    new Location("Griffith Observatory", 34.1184, -118.3004),
    new Location("Hollywood Walk of Fame", 34.0985, -118.3256)

];

/*
    Viewmodel for the app. 
*/
// function MapViewModel() {
//     this.mapLocations = ko.observableArray(locations);
//     // for (i = 0; i < locations.length; i++) {
//     //     var location = locations[i];
//     //     var newMarker = new google.maps.Marker({
//     //         position: {lat: location.lat, lng: location.lng},
//     //         map: map,
//     //         clickable: true
//     //     });
//     //     var newInfoWindow = new google.maps.InfoWindow({
//     //         content: location.name
//     //     });
//     //     google.maps.event.addListener(newMarker, 'click', this.toggleInfo());
//     //     this.mapLocations.push(
//     //         {name: location.name, marker: newMarker, infoWindow: newInfoWindow}
//     //     );
//     // }

//     this.currentLocation = ko.observable(null);
//     this.toggleInfo = ko.computed(function() {
//         if (currentLocation != null) {
//             currentLocation.infoWindow.close();
//             currentLocation.marker.setAnimation(null);
//         }

//         currentLocation = this;
//         currentLocation.infoWindow.open(map, currentLocation.marker);
//         currentLocation.marker.setAnimation(google.maps.Animation.BOUNCE);
//     });
// }
