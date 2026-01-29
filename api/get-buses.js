export default async function handler(req, res) {
    const url = 'https://v0.ovapi.nl/vehicle/';
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            return res.status(response.status).json({ error: "OVapi onbereikbaar" });
        }

        const data = await response.json();

        // Standaard headers voor CORS en JSON
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        
        // Stuur de data direct terug
        return res.status(200).json(data);
    } catch (error) {
        console.error("Fetch error:", error);
        return res.status(500).json({ error: "Server kon data niet ophalen" });
    }
}