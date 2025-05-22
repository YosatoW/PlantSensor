import express from 'express';
import sensorRouter, {
  generateFakeSensorData,
  addSensorData
} from './sensor';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/sensor', sensorRouter);

// Automatische Live-Simulation
setInterval(async() => {
  const fakeData = generateFakeSensorData();
  await addSensorData(fakeData);
  console.log('📡 Automatisch simulierte Sensor-Daten:', fakeData);
}, 15_000);

// Starten des Servers
app.listen(port, () => {
  console.log(`✅ Server läuft auf http://localhost:${port}`);
});