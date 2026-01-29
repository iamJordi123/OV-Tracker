export default async function handler(req, res) {
    // Lijst met bronnen die we gaan proberen
    const sources = [
        'https://data.ndovloket.nl/all/bussen.json',
        'https://api.ovapi.nl/vehicle/',
        'https://v0.ovapi.nl/vehicle/'
    ];

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    for (let url of sources) {
        try {
            console.log("Proberen:", url);
            const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
            if (!response.ok) continue;

            const data = await response.json();
            
            // Check of er echt data in zit
            const keys = Object.keys(data);
            if (keys.length > 0) {
                console.log("Data gevonden op:", url);
                return res.status(200).json(data);
            }
        } catch (e) {
            console.log("Faal op:", url);
            continue;
        }
    }

    return res.status(500).json({ error: "Alle bronnen zijn momenteel leeg of onbereikbaar" });
}