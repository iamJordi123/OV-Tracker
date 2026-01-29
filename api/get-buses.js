export default async function handler(req, res) {
    try {
        const response = await fetch('https://v0.ovapi.nl/vehicle/');
        
        if (!response.ok) {
            return res.status(response.status).json({ error: "OVapi fout" });
        }

        const data = await response.json();

        // Belangrijk: Vercel heeft soms moeite met reusachtige JSON. 
        // We sturen de data direct door.
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}