export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    try {
        // We gebruiken een publieke proxy om de data op te halen als backup
        const url = 'https://api.allorigins.win/raw?url=' + encodeURIComponent('https://data.ndovloket.nl/all/bussen.json');
        
        const response = await fetch(url);
        if (!response.ok) throw new Error('Netwerk reageert niet');
        
        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        // Als zelfs dit faalt, sturen we een nep-bus om te testen of je kaart werkt
        return res.status(200).json({
            "TEST_BUS": { "Latitude": 52.1326, "Longitude": 5.2913, "OperatorCode": "NS" }
        });
    }
}