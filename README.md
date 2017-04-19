# Neighborhood Map

<h3>General Background</h3>
<div>
This project involves a map of Los Angeles that displays famous locations and
pictures related to those locations. The locations are searchable by a text input
field. The markers corresponding to the locations are hidden or displayed based
on the results of the search. Additionally, the buttons corresponding to the
locations are hidden or displayed simultaneously. The images are fetched
asynchronously with an AJAX request.
<strong>Note: Be aware that the application will not run as is. An API key is
required to obtain photos from Flickr's photos API. Instructions on how to obtain
an API key and how to insert it into the project to make it run properly are
provided below in the Flickr Image API section.</strong>
</div>

<h3>APIS and Frameworks used</h3>
<div>
Note: Not much installation is required to use this project. Most of the third
party APIS and Frameworks used are delivered automatically to the project through
content delivery networks (CDNs). This makes it very convenient to use and nothing
has to be stored locally for testing. The exception is the Flickr API which will be
described in detail below.
</div>

<h4>Google Maps API</h4>
<div>
To render and perform operations on the map, the Google Maps API was used. The
API is imported into the application with the following script tag in index.html:
<pre>
    <!-- Google Maps API -->
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDBL9PC8OpuT8biiIBJzexP0TDCuINoRko&callback=initMap">
    </script>
</pre>
This loads the API into the project and specifies the method to call when the map
is loaded (initMap). Using the API, it is possible to specify markers on the UI
that identify locations based on their latitude and longitude. It is possible to
attach windows to the markers to display information about the location when the
marker is clicked. To learn more about how Google Maps API works visit this
<a href="https://developers.google.com/maps/">link</a>.
</div>

<h4>Knockout Framework</h4>
<div>
Knockout allows applications to easily implement an MVVM design pattern to manage
data and how it is displayed. Knockout simplifies the hassle of making sure the data
a user sees (the view) corresponds to the data in the background of the application
(the model). This is done by creating a custom ViewModel class that tells Knockout
how to track the data in the model and update the view accordingly. In the index.html
file the following script tag imports knockout through a CDN:
<pre>
    <!-- Knockout CDN -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/knockout/3.4.1/knockout-min.js"></script>
</pre>
Knockout is used to adjust the visibility of the buttons and markers based on
search results from user input. It is also used to track the text typed in the
search bar itself. To learn more about Knockout and how to download it visit this
<a href="http://knockoutjs.com/">link</a>.
</div>

<h4>JQuery Library</h4>
<div>
JQuery is an extensive JavaScript library that simplifies a lot of the pain of
dealing with vanilla JavaScript while supporting cross browser compatability.
The main use of JQuery in this project was to simplify the process of making an
AJAX request for data. JQuery is included in this project through a call to a CDN
in the following line in index.html:
<pre>
    <!-- JQuery CDN -->
    <script
    src="https://code.jquery.com/jquery-3.2.1.min.js"
    integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
    crossorigin="anonymous"></script>
</pre>
JQuery offers many features that were not utilized in this project so for the
scope of this project only the JQuery AJAX methods are relevant. To read more
about how JQuery supports AJAX requests visit this
<a href="http://api.jquery.com/jquery.ajax/">link</a>.
</div>

<h4>Flickr Image API</h4>
<div>
This is the most important aspect to making this project run successfully. Flickr
provides an image request API where Flickr provides images based on search parameters.
When clicking a location marker, the application make an AJAX request to a Flickr
server using the name of the location as the search parameter for the image to return.
However, in this current state the request will fail because Flickr requires an
application making a request to their servers to have a unique API key. The following
line in the map.js file is relavent to making this feature work properly:
<pre>
    // Construct the URL to make the AJAX request to Flickr's servers
    var flickrURL = "https://api.flickr.com/services/rest/?" +
                    "method=flickr.photos.search&" +
                    // Your API key goes here
                    "api_key=NEED_API_KEY&" +
                    "per_page=1&format=json&nojsoncallback=1&text=";
</pre>
The parameter in the URL named "api_key" is where one would put their key to
allow the application to request data. Follow these instructions to get an API
key from Flickr:
<ul>
    <li>
    First navigate to <a href="https://www.flickr.com/">https://www.flickr.com/</a>
    and sign up for an account if you don't have one. If you have a Flickr account,
    simply sign in.
    </li>
    <li>
    Next, while logged in, go to <a href="https://www.flickr.com/services/apps/create/apply/">
    https://www.flickr.com/services/apps/create/apply/</a>. This is where you
    can apply for a Flickr API key. There are two types of keys available: commercial
    and non-commercial. For our purpose we will select non-commercial, so click
    on the button that says "Apply for a non-commercial key".
    </li>
    <li>
    You will then be taken to a form where you will be asked to give some details
    about the application the key will be used for. Next to "What's the name of
    your app?" type "Neighborhood Map". In the textarea next to "What are you building?"
    type "A Google Maps based map application that displays photos relating to certain
    locations". Check mark the boxes saying you acknowledge Flickr's terms of use and
    that your application won't infringe on the copyrights of the owners of the photos.
    </li>
    <li>
    Once you click submit on the API key application form you will be taken to a page
    that will give you your API key and API secret. We are only interested in the
    API key. Copy the API key and replace the bolded part below in map.js with your
    API key:
    <pre>
    // Construct the URL to make the AJAX request to Flickr's servers
    var flickrURL = "https://api.flickr.com/services/rest/?" +
                    "method=flickr.photos.search&" +
                    // Your API key goes here
                    "api_key=<b>NEED_API_KEY</b>&" +
                    "per_page=1&format=json&nojsoncallback=1&text=";
    </pre>
    </li>
</ul>
Once you have added your API key to map.js, you can open index.html in your browser
and the application will run as intended. Alternatively, if you have problems
getting an API key or would rather not take the time to obtain one, contact me
at tthrafnsson123@gmail.com and I will give you mine to use to test it.
</div>

<h3>How to Run</h3>
<div>
Once you have completed the steps above the application is ready to run. To run
the application clone the repository to your local machine. To do this, press the
clone or download button at the top of the repository and either download the zip
or use the URL provided to clone by running 'git clone URL' in Git Bash. Once the
repository is on your machine navigate to the folder containing the repository.
Open the file named index.html in your browser of choice. At this point you should
see the map to the right and a list of the locations in a left sidebar. You can
view the name of a location along with a picture related to it by either clicking
its corresponding button or its marker on the map. In the search bar above the locations
list, you can search for locations based on if the location contains what is typed
in the search bar.
</div>
