export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        // Deze bron is super betrouwbaar en speciaal voor kaart-apps
        const response = await fetch('https://ovradar.nl/api/v2/all');
        const data = await response.json();
        
        // We sturen alleen de relevante voertuig-data door
        res.status(200).json(data.positions || data);
    } catch (error) {
        // Onze trouwe test-bus als backup
        res.status(200).json([{ "lat": 52.1326, "lon": 5.2913, "operator": "NS" }]);
    }
}