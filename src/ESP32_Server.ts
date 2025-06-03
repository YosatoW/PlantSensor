import express from "express";
import type { Request, Response } from "express";

const app = express();
const port = 3000;

app.use(express.json());

app.post("/data", (req: Request, res: Response) => {
  const wert = (req.body as { feuchtigkeit: number }).feuchtigkeit;
  const zeit = new Date().toLocaleString();

  console.log(`🌱 ${zeit} | Feuchtigkeit empfangen: ${wert}%`);

  res.status(200).send(); // Erfolg zurückgeben
});

app.listen(port, () => {
  console.log(`🌐 Server läuft auf http://localhost:${port}`);
});

