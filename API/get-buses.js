export default async function handler(req, res) {
    try {
        const response = await fetch('https://v0.ovapi.nl/vehicle/');
        if (!response.ok) throw new Error('OVapi onbereikbaar');
        const data = await response.json();

        // Dit vertelt de browser: "Dit is veilig, je mag het laden"
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}