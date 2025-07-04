# 🌱 Pflanzenüberwachungssystem mit ESP32 und Cloud-Anbindung

Ein smartes System zur Überwachung der Bodenfeuchtigkeit über einen ESP32-Sensor. Die erfassten Daten werden in der Cloud gespeichert und über ein modernes Web-Frontend visualisiert.

---

## 🔧 Verwendete Technologien

- **Hardware:** ESP32 (Bodenfeuchtigkeitssensor)
- **Backend:** Express.js (Node.js), REST API
- **Datenbank:** Azure PostgreSQL
- **Frontend:** Next.js mit Tailwind CSS (hosted auf Vercel)
- **Deployment:** Azure Cloud

---

## ⚙️ Setup-Anleitung

### Voraussetzungen

- Node.js & Bun installiert
- Azure PostgreSQL-Instanz
- ESP32 mit korrekt installiertem Code zur Datenübertragung

### Lokale Entwicklung

1. **Backend starten**

```bash
bun install
bun run src/app.ts
```

2. **Frontend starten**

```bash
cd frontend
bun install
bun dev
```

3. **Sensor konfigurieren**

ESP32 muss so programmiert sein, dass er periodisch Feuchtigkeitsdaten per HTTP POST an `/sensor/data` sendet.

---

## 👥 Projekkt URL mit echten live Daten

```bash
https://plant-sensor-frontend.vercel.app/
```

---

## 👥 Zielnutzer

Das System eignet sich besonders für:

- Studierende, die IoT- und Cloud-Projekte umsetzen

---

## 📊 Funktionen im Überblick

- Realtime-Upload von Bodenfeuchtigkeitsdaten via ESP32
- Speicherung in einer cloudbasierten PostgreSQL-Datenbank
- Visualisierung der Werte im Frontend-Dashboard:
  - Aktuelle Werte
- Skalierbares Deployment dank Azure und Vercel

---

## ✅ Umsetzung & Besonderheiten

- Der Fokus lag auf einer einfachen, aber funktionalen IoT-Architektur
- Statt lokaler Speicherung wurde direkt eine Azure-Datenbank angebunden
- Das System ist modular aufgebaut und kann beliebig erweitert werden

