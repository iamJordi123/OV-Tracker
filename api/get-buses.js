export default async function handler(req, res) {
    // Stel headers in zodat de browser weet dat er JSON aankomt
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');

    try {
        // We gebruiken een kortere timeout en de v0 endpoint
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000); // Stop na 8 sec

        const response = await fetch('https://v0.ovapi.nl/vehicle/', {
            signal: controller.signal,
            headers: { 'User-Agent': 'MyPersonalTracker/1.0' }
        });

        if (!response.ok) throw new Error('OVapi is bezet');

        const data = await response.json();
        
        // We sturen de data direct door zonder zware bewerkingen
        return res.status(200).send(JSON.stringify(data));
    } catch (error) {
        // Als OVapi te traag is, stuur dan een lege lijst in plaats van een 500 error
        console.error("OVapi timeout of error");
        return res.status(200).json({});
    }
}