import 'dotenv/config';
import express from 'express';
import sensorRouter from './sensor';
import { startSimulation } from './simulation';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigin = 'http://plant-sensor-app-chvvn17.azurewebsites.net/sensor/data';

app.use(cors({
  origin: allowedOrigin,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));


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
