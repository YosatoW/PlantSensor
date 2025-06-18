import 'dotenv/config';
import express from 'express';
import sensorRouter from './sensor';
import { startSimulation } from './simulation';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  'https://plant-sensor-frontend-5nuprlk0z-chvvns-projects.vercel.app',
  'https://plant-sensor-frontend-git-main-chvvns-projects.vercel.app',
  'https://plant-sensor-frontend.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Nicht erlaubter Origin: ' + origin));
    }
  },
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
