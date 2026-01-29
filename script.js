const map = L.map('map').setView([52.1326, 5.2913], 8);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

let busMarkers = {};

async function updateBuses() {
    console.log("Poging tot ophalen...");
    try {
        const response = await fetch('/api/get-buses');
        const data = await response.json();
        
        // NDOV data zit vaak direct in de lijst, OVapi in een object. We checken beide:
        const vehicles = data.isRegistered ? Object.values(data) : (Array.isArray(data) ? data : Object.values(data));
        console.log("Succes! Aantal voertuigen gevonden:", vehicles.length);

        vehicles.forEach((v, index) => {
            // Gebruik een uniek ID of anders gewoon het index-nummer
            const id = v.VehicleNumber || v.RegistrationNumber || index;
            const lat = v.Latitude || v.lat;
            const lon = v.Longitude || v.lon;

            if (lat && lon) {
                let color = '#ffffff';
                if (v.OperatorCode === 'NS' || v.operator === 'NS') color = '#ffc917';
                
                if (busMarkers[id]) {
                    busMarkers[id].setLatLng([lat, lon]);
                } else {
                    const icon = L.divIcon({
                        className: 'custom-icon',
                        html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%; border: 1px solid white;"></div>`,
                        iconSize: [10, 10]
                    });
                    busMarkers[id] = L.marker([lat, lon], { icon: icon }).addTo(map);
                }
            }
        });
    } catch (err) {
        console.error("Fout:", err);
    }
}

updateBuses();
setInterval(updateBuses, 15000);