// ... (map setup)

async function updateBuses() {
    try {
        const response = await fetch('/api/get-buses');
        const data = await response.json();
        
        // Verander het object van OVapi in een lijst die we kunnen tekenen
        const vehicleKeys = Object.keys(data);
        console.log("Echte OVapi bussen gevonden:", vehicleKeys.length);

        vehicleKeys.forEach((key) => {
            const v = data[key];
            if (v.Latitude && v.Longitude) {
                if (busMarkers[key]) {
                    busMarkers[key].setLatLng([v.Latitude, v.Longitude]);
                } else {
                    busMarkers[key] = L.circleMarker([v.Latitude, v.Longitude], {
                        radius: 4,
                        fillColor: "#ffc917",
                        color: "#000",
                        weight: 1,
                        fillOpacity: 0.9
                    }).addTo(map);
                }
            }
        });
    } catch (e) {
        console.log("Wachten op OVapi respons...");
    }
}