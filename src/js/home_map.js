(function(){
    // Initialize and add the map
    // @13.6809339,-89.2685604,19.25z?entry=ttu&
    //@13.7015116,-89.2241931,19z
    const lat = 13.7015116;
    const lng = -89.2241931;
    const maps = L.map('home-map').setView([lat, lng ], 14);

    let marker;

    // Geocoding service from Esri Leaflet plugin to get the address from the coordinates
    const geocoderService = L.esri.Geocoding.geocodeService();

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(maps);

})();