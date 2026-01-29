const map = L.map('map').setView([52.1326, 5.2913], 8);

L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OSM & CARTO'
}).addTo(map);

let busMarkers = {};

async function updateBuses() {
    try {
        // Geen https:// of proxy meer nodig, Vercel snapt dit pad
        const response = await fetch('/api/get-buses');
        const data = await response.json();
        
        // ... de rest van je code om de stipjes te tekenen ...
        console.log("Data geladen via Vercel!");
    } catch (err) {
        console.error("Fout:", err);
    }
}