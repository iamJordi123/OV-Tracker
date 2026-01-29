const map = L.map('map').setView([52.1326, 5.2913], 8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OSM & CARTO'
}).addTo(map);

let busMarkers = {};

async function updateBuses() {
    try {
        const response = await fetch('/api/get-buses');
        const data = await response.json();
        
        // We maken er altijd een lijst van, of het nu een object of array is
        const vehicles = Array.isArray(data) ? data : Object.values(data);
        console.log("Data binnen! Aantal stipjes:", vehicles.length);

        vehicles.forEach((v, i) => {
            // De '||' betekent: gebruik de eerste die niet leeg is
            const lat = v.lat || v.Latitude || v.latitude;
            const lon = v.lon || v.Longitude || v.longitude;
            const id = v.VehicleNumber || v.RegistrationNumber || i;

            if (lat && lon) {
                if (busMarkers[id]) {
                    busMarkers[id].setLatLng([lat, lon]);
                } else {
                    // We tekenen een mooi cirkeltje voor elke bus
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
    } catch (e) { 
        console.log("Foutje in script.js:", e); 
    }
}

// Elke 10 seconden verversen
setInterval(updateBuses, 10000);
updateBuses();