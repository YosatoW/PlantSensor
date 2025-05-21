import { Router, type Request, type Response } from 'express';
import { db } from './database';
import { sensor_data } from './db/schema';

const router = Router();

const sensorData: SensorEntry[] = [];

type SensorEntry = {
  moisture: number;
  temperature: number;
  timestamp: Date;
};







// Funktion zum Hinzufügen von Sensordaten zur Datenbank
export async function addSensorData(data: SensorEntry) {
  await db.insert(sensor_data).values(data);
}






// Funktion zur Generierung von simulierten Sensordaten
export function generateFakeSensorData(): SensorEntry {
  const moisture = Math.floor(Math.random() * 101); // 0–100 %
  const temperature = +(15 + Math.random() * 30).toFixed(2); // 15–45 °C
  const timestamp = new Date();
  return { moisture, temperature, timestamp };
}



// Route für den Zugriff auf Sensordaten
router.get('/', async  (req: Request, res: Response) =>{
  const data = await db.select().from(sensor_data);
  res.json(data);
});





// Route für den Zugriff auf die Durchschnittswerte
router.get('/average', (_req: Request, res: Response) => {
  if (sensorData.length === 0) {
    return res.status(404).json({ message: 'Keine Daten verfügbar' });
  }

  const avgMoisture =
    sensorData.reduce((sum, entry) => sum + entry.moisture, 0) / sensorData.length;
  const avgTemp =
    sensorData.reduce((sum, entry) => sum + entry.temperature, 0) / sensorData.length;

  res.json({
    averageMoisture: +avgMoisture.toFixed(2),
    averageTemperature: +avgTemp.toFixed(2),
    count: sensorData.length
  });
});








// Route für das Speichern von simulierten Sensordaten
router.post('/', async (_req: Request, res: Response) => {
  const data = generateFakeSensorData();
  await sensorData.push(data);

  res.status(201).json({
    message: 'Simulierter Sensorwert gespeichert',
    data
  });
});










// Route für das Löschen aller Sensorwerte
router.delete('/', (_req: Request, res: Response) => {
  sensorData.length = 0;
  res.json({ message: 'Alle Sensorwerte gelöscht' });
});

export default router;
