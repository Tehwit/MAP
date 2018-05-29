mapboxgl.accessToken = 'pk.eyJ1IjoidGxlbmNsb3MiLCJhIjoiY2pobTVrbXB6Mm4wczNkbzYwZ2VjNDZidyJ9.oU289U_hNWEmxp1FmAaxqw';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v9',
    center: [1.094819, 49.439903],
    zoom: 7
});

map.addControl(new mapboxgl.NavigationControl());

// Marker html
const el = document.createElement('div');
el.className = 'marker';

// Images picker
const input = document.querySelector('input[type=file]');
input.addEventListener('change', function() {
    const files = input.files;

    for (var i = 0; i < files.length; i++) {
        const file = files[i];

        EXIF.getData(file, function() {
            const allMetaData = EXIF.getAllTags(this);

            // Some photos are missing geolocation
            if (allMetaData.GPSLatitude) {
                const position = dms2dec(
                    [
                        allMetaData.GPSLatitude[0],
                        allMetaData.GPSLatitude[1],
                        allMetaData.GPSLatitude[2]
                    ], 
                    "N",
                    [
                        allMetaData.GPSLongitude[0],
                        allMetaData.GPSLongitude[1],
                        allMetaData.GPSLongitude[2]
                    ], 
                    "E"
                );
        
                // Popup
                const popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(`
                    <img src="${URL.createObjectURL(file)}" width="500" />
                `);
                
                // Marker
                new mapboxgl.Marker()
                .setLngLat([position[1], position[0]])
                .setPopup(popup)
                .addTo(map);
            }
        });
    }
});