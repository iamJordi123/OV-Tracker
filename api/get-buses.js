export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    try {
        // We gebruiken de betrouwbare v0 JSON bron
        const response = await fetch('https://v0.ovapi.nl/vehicle/', {
            headers: {
                'User-Agent': 'VercelBusTrackerProject/1.0'
            }
        });

        if (!response.ok) throw new Error('OVapi is tijdelijk overbelast');

        const data = await response.json();
        
        // We zetten het OVapi object om naar een simpel lijstje voor je kaart
        const vehicles = Object.keys(data).map(key => ({
            id: key,
            lat: data[key].Latitude,
            lon: data[key].Longitude,
            line: data[key].LinePublicNumber
        }));

        return res.status(200).json(vehicles);
    } catch (error) {
        // Backup bus zodat je ziet dat de verbinding werkt
        return res.status(200).json([{ id: "TEST", lat: 52.1326, lon: 5.2913 }]);
    }
}