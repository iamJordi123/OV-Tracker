export default async function handler(req, res) {
  try {
    const response = await fetch('https://v0.ovapi.nl/vehicle/');
    const data = await response.json();

    // Vertel de browser dat alles oké is
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Content-Type', 'application/json');
    
    // Stuur de data direct terug naar je telefoon
    res.status(200).send(JSON.stringify(data));
  } catch (error) {
    res.status(500).json({ error: "Server error", details: error.message });
  }
}