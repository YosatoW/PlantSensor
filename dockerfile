# Base Image mit Bun
FROM oven/bun:latest

# Arbeitsverzeichnis setzen
WORKDIR /app

# Source Code kopieren
COPY . .

# Abhängigkeiten installieren
RUN bun install

# Port für Azure App Service freigeben (sehr wichtig!)
ENV PORT=3000
EXPOSE 3000

# Anwendung starten
CMD ["bun", "run", "src/app.ts"]
