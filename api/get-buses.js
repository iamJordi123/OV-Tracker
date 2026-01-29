import GtfsRealtimeBindings from 'gtfs-realtime-bindings';

export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    try {
        const response = await fetch('https://gtfs.ovapi.nl/nl/vehiclePositions.pb');
        if (!response.ok) throw new Error('GTFS niet bereikbaar');

        const buffer = await response.arrayBuffer();
        const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));

        const vehicles = feed.entity.map(entity => ({
            id: entity.id,
            lat: entity.vehicle.position.latitude,
            lon: entity.vehicle.position.longitude,
            label: entity.vehicle.vehicle.label
        }));

        return res.status(200).json(vehicles);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}