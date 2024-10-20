(function() {
    // @13.6809339,-89.2685604,19.25z?entry=ttu&
    //@13.7015116,-89.2241931,19z
    const lat = document.querySelector('#latitude').value || 13.7015116;
    const lng = document.querySelector('#longitude').value || -89.2241931;
    const maps = L.map('maps').setView([lat, lng ], 14);

    let marker;

    // Geocoding service from Esri Leaflet plugin to get the address from the coordinates
    const geocoderService = L.esri.Geocoding.geocodeService();
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(maps);

    // Add marker
    marker = L.marker([lat, lng], {
        draggable: true, // Allow the marker to be dragged
        autoPan: true // Automatically pan the map to the marker's location
    }).addTo(maps); // Add the marker to the map

    marker.on('moveend', function(e){
        const position = marker.getLatLng();
        maps.panTo( new L.LatLng(position.lat, position.lng) );

        // get information from street and city
        geocoderService.reverse().latlng(position, 14).run( function(error, result){
            marker.bindPopup( result.address.Match_addr ).openPopup();

            document.querySelector('.street').textContent = result?.address?.Address ?? '';

            document.querySelector('#street').value = result?.address?.Address ?? '---';
            document.querySelector('#latitude').value = result?.latlng.lat ?? '';
            document.querySelector('#longitude').value = result?.latlng.lng ?? '';
        } );
    });

})()
