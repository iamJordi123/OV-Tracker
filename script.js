// ... (bovenkant van je script met de map)

async function updateBuses() {
    try {
        const response = await fetch('/api/get-buses');
        const data = await response.json();
        
        // OVapi specifieke manier om door data te lussen
        const vehicleKeys = Object.keys(data);
        console.log("OVapi data binnen! Aantal bussen:", vehicleKeys.length);

        vehicleKeys.forEach((key) => {
            const v = data[key];
            const lat = v.Latitude;
            const lon = v.Longitude;

            if (lat && lon) {
                if (busMarkers[key]) {
                    busMarkers[key].setLatLng([lat, lon]);
                } else {
                    busMarkers[key] = L.circleMarker([lat, lon], {
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
        console.log("Script fout:", e); 
    }
}