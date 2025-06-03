import { db } from './database';
import { plantSensor } from './db/schema';

type SensorEntry = {
  moisture: number;
  temperature: number;
  timestamp: Date;
  simulated: boolean;
};

export function generateFakeSensorData(): SensorEntry {
  const moisture = Math.floor(Math.random() * 101);
  const temperature = +(15 + Math.random() * 30).toFixed(2);
  const timestamp = new Date();

  return { moisture, temperature, timestamp, simulated: true };
}

export async function addSensorData(eintrag: SensorEntry) {
  await db.insert(plantSensor).values(eintrag);
}

export async function startSimulation(intervalMs = 60_000) {
  setInterval(async () => {
    const data = generateFakeSensorData();
    await addSensorData(data);
    console.log('🧪 Simulierte Sensor-Daten:', data);
  }, intervalMs);
}
