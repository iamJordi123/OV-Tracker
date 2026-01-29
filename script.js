const map = L.map('map').setView([52.1326, 5.2913], 8);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

let busMarkers = {};

async function updateBuses() {
    try {
        const response = await fetch('/api/get-buses');
        const vehicles = await response.json();
        
        vehicles.forEach((v) => {
            if (v.lat && v.lon) {
                if (busMarkers[v.id]) {
                    busMarkers[v.id].setLatLng([v.lat, v.lon]);
                } else {
                    busMarkers[v.id] = L.circleMarker([v.lat, v.lon], {
                        radius: 4,
                        fillColor: "#ffc917",
                        color: "#000",
                        weight: 1,
                        fillOpacity: 0.8
                    }).addTo(map);
                }
            }
        });
    } catch (e) { console.log("Wachten op data..."); }
}

setInterval(updateBuses, 10000);
updateBuses();