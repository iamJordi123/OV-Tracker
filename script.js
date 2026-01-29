const map = L.map('map').setView([52.1326, 5.2913], 8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OSM & CARTO'
}).addTo(map);

let busMarkers = {};

async function updateBuses() {
    console.log("Poging tot ophalen van bussen..."); // Dit moet je in je console zien
    try {
        const response = await fetch('/api/get-buses');
        const data = await response.json();
        
        const ids = Object.keys(data);
        console.log("Succes! Aantal voertuigen gevonden:", ids.length);

        ids.forEach(id => {
            const v = data[id];
            if (v.Latitude && v.Longitude) {
                let color = '#ffffff';
                if (v.OperatorCode === 'NS') color = '#ffc917';
                if (v.OperatorCode === 'ARR') color = '#009a9b';
                if (v.OperatorCode === 'GVB') color = '#003082';

                if (busMarkers[id]) {
                    busMarkers[id].setLatLng([v.Latitude, v.Longitude]);
                } else {
                    const icon = L.divIcon({
                        className: 'custom-icon',
                        html: `<div style="background-color: ${color}; width: 10px; height: 10px; border-radius: 50%; border: 1px solid white;"></div>`,
                        iconSize: [10, 10]
                    });
                    busMarkers[id] = L.marker([v.Latitude, v.Longitude], { icon: icon }).addTo(map);
                }
            }
        });
    } catch (err) {
        console.error("Er gaat iets mis bij het tekenen:", err);
    }
}

// Start direct en herhaal elke 15 seconden
updateBuses();
setInterval(updateBuses, 15000);