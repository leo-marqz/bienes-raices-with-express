(function(){
    let latitude = document.querySelector('#latitude').textContent;
    let longitude = document.querySelector('#longitude').textContent;
    let street = document.querySelector('#street').textContent;

    console.log(latitude, longitude, street);

    let map = L.map('show_map').setView([latitude, longitude], 16);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Add a marker
    L.marker([latitude, longitude])
        .addTo(map)
        .bindPopup(`Direccion: ${street}`);
})()