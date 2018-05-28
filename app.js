mapboxgl.accessToken = 'pk.eyJ1IjoidGxlbmNsb3MiLCJhIjoiY2pobTVrbXB6Mm4wczNkbzYwZ2VjNDZidyJ9.oU289U_hNWEmxp1FmAaxqw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [1.094819, 49.439903],
    zoom: 9
});

// Marker
var el = document.createElement('div');
el.className = 'marker';

// make a marker for each feature and add to the map
new mapboxgl.Marker(el)
.setLngLat([1.094819, 49.439903])
.addTo(map);