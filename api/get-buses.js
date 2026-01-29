export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    try {
        // We vertellen OVapi wie we zijn, anders blokkeren ze Vercel
        const response = await fetch('https://v0.ovapi.nl/vehicle/', {
            headers: {
                'User-Agent': 'MijnHobbyProjectOVTracker/1.0'
            }
        });

        if (!response.ok) throw new Error(`OVapi zegt: ${response.status}`);

        const data = await response.json();
        return res.status(200).json(data);
    } catch (error) {
        // Alleen bij een echte crash laten we de test-bus zien
        console.error(error);
        return res.status(200).json({
            "FOUT_BUS": { "Latitude": 52.1326, "Longitude": 5.2913, "OperatorCode": "ERROR" }
        });
    }
}