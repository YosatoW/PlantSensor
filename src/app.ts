import 'dotenv/config';
import express from 'express';
import sensorRouter from './sensor';
import { startSimulation } from './simulation';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = [
  'https://plant-sensor-frontend.vercel.app',
  'https://plant-sensor-frontend-git-main-chvwns-projects.vercel.app',
  'https://plant-sensor-frontend-5nuprk0z-chvwns-projects.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o => origin.startsWith(o))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
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
