import express from 'express';
import sensorRouter from './sensor';
import { startSimulation } from './simulation';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/sensor', sensorRouter);

// Simulationsmodus aktivieren?
if (process.env.SIMULATION === 'true') {
  startSimulation();
}

app.listen(port, () => {
  console.log(`✅ Server läuft auf http://localhost:${port}`);
});