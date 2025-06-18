import 'dotenv/config';
import express from 'express';
import sensorRouter from './sensor';
import { startSimulation } from './simulation';

const app = express();
const port = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://plant-sensor-frontend.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});


app.use(express.json());
app.use('/sensor', sensorRouter);

// Simulationsmodus aktivieren?
if (process.env.SIMULATION === 'true') {
  startSimulation();
}

app.get('/', (req, res) => {
  res.send('plant_sensor API läuft!');
});

app.listen(port, () => {
  console.log(`✅ Server läuft auf http://localhost:${port}`);
});
