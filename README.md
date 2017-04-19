# neighborhood-map

<h3>General Background</h3>
<div>
This project involves a map of Los Angeles that displays famous locations and
pictures related to those locations. The locations are searchable by a text input
field. The markers corresponding to the locations are hidden or displayed based
on the results of the search. Additionally, the buttons corresponding to the
locations are hidden or displayed simultaneously. The images are fetched
asynchronously with an AJAX request.
</div>

<h3>APIS and Frameworks used</h3>
<div>
To render and perform operations on the map, the Google Maps API was used. The
API is imported into the application with the following script tag in index.html:
<pre><!-- Google Maps API -->
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBL9PC8OpuT8biiIBJzexP0TDCuINoRko&callback=initMap">
    </script>
</pre>

</div>