import { Router, type Request, type Response } from 'express';
import { db } from './database';
import { sensor_data } from './db/schema';
import { eq } from 'drizzle-orm';

const router = Router();

type SensorEntry = {
  moisture: number;
  temperature: number;
  timestamp: Date;
  simulated: boolean;
};

// Neue echte Feuchtigkeitsdaten speichern
router.post('/data', async (req: Request, res: Response) => {
  const { feuchtigkeit } = req.body as { feuchtigkeit?: number };

  if (typeof feuchtigkeit !== 'number') {
    return res.status(400).json({ message: 'Ungültiger Wert. Es muss eine Zahl sein.' });
  }

  const timestamp = new Date();

  const eintrag: SensorEntry = {
    moisture: feuchtigkeit,
    temperature: -1, // Dummywert
    timestamp,
    simulated: false
  };

  try {
    await db.insert(sensor_data).values(eintrag);
    console.log(`🌱 ${timestamp.toLocaleString()} | ECHT | Feuchtigkeit: ${feuchtigkeit}%`);
    res.status(201).json({ message: 'Echter Feuchtigkeitswert gespeichert', eintrag });
  } catch (error) {
    console.error('❌ Fehler beim Speichern:', error);
    res.status(500).json({ message: 'Fehler beim Speichern' });
  }
});

// Alle Sensorwerte
router.get('/', async (_req: Request, res: Response) => {
  const data = await db.select().from(sensor_data);
  res.json(data);
});

// Nur echte Daten
router.get('/data/real', async (_req: Request, res: Response) => {
  const data = await db.select().from(sensor_data).where(eq(sensor_data.simulated, false));
  res.json(data);
});

// Nur simulierte Daten
router.get('/data/simulated', async (_req: Request, res: Response) => {
  const data = await db.select().from(sensor_data).where(eq(sensor_data.simulated, true));
  res.json(data);
});

export default router;
