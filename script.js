const map = L.map('map').setView([52.1326, 5.2913], 8);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

let busMarkers = {};

async function updateBuses() {
    try {
        const response = await fetch('/api/get-buses');
        const data = await response.json();
        
        // Zorg dat we altijd een lijst hebben om doorheen te lopen
        const vehicles = Array.isArray(data) ? data : Object.values(data);
        console.log("Data binnen! Aantal stipjes:", vehicles.length);

        vehicles.forEach((v, i) => {
            const lat = v.Latitude || v.lat;
            const lon = v.Longitude || v.lon;
            const id = v.VehicleNumber || i;

            if (lat && lon) {
                if (busMarkers[id]) {
                    busMarkers[id].setLatLng([lat, lon]);
                } else {
                    busMarkers[id] = L.circleMarker([lat, lon], {
                        radius: 5,
                        fillColor: "#ffc917",
                        color: "#fff",
                        weight: 1,
                        opacity: 1,
                        fillOpacity: 0.8
                    }).addTo(map);
                }
            }
        });
    } catch (e) { console.log("Foutje:", e); }
}

setInterval(updateBuses, 10000);
updateBuses();