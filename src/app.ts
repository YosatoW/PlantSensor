import 'dotenv/config';
import express from 'express';
import sensorRouter from './sensor';
import { startSimulation } from './simulation';
import cors from 'cors'; 

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "https://plant-sensor-frontend.vercel.app",
    methods: ["GET", "POST"],
  })
);


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
