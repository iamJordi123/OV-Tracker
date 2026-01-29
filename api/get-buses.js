export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    try {
        // We gebruiken een proxy die de data "schoonmaakt" voor Vercel
        const response = await fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent('https://data.ndovloket.nl/all/bussen.json'));
        
        if (!response.ok) throw new Error('Bron weigert');
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        // Alleen als alles écht faalt zie je de test-bus
        return res.status(200).json([{ "lat": 52.1326, "lon": 5.2913, "operator": "TEST" }]);
    }
}