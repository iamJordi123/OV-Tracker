export default async function handler(req, res) {
    // We gebruiken nu de Data.ndovloket.nl bron, deze is vaak stabieler
    const url = 'https://data.ndovloket.nl/all/bussen.json'; 
    
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            // Als deze ook plat ligt, proberen we een backup URL
            const backupRes = await fetch('https://v0.ovapi.nl/vehicle/');
            const backupData = await backupRes.json();
            return res.status(200).json(backupData);
        }

        const data = await response.json();
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).json(data);
    } catch (error) {
        // Als alles faalt, sturen we een lege lijst zodat je kaart niet crasht
        return res.status(200).json({});
    }
}