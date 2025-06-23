#include <WiFi.h>
#include "secrets.h"
#include <HTTPClient.h>

const int sensorPin = 36; // VP = GPIO36

void setup() {
  Serial.begin(115200);

  // WLAN verbinden
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  Serial.print("Verbinde mit WLAN...");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n✅ WLAN verbunden!");
  Serial.print("IP-Adresse: ");
  Serial.println(WiFi.localIP());

  // ⏰ Zeitzone konfigurieren (Europe/Zurich)
  configTime(7200, 3600, "pool.ntp.org", "time.nist.gov");
}

void loop() {
  int rawValue = analogRead(sensorPin);

  // Wertebereich individuell anpassen!
  int trocken = 3500;   // komplett trocken
  int nass = 1000;      // komplett nass

  int prozent = map(rawValue, trocken, nass, 0, 100);
  prozent = constrain(prozent, 0, 100);

  Serial.print("Feuchtigkeit: ");
  Serial.print(prozent);
  Serial.println("%");

  if (WiFi.status() == WL_CONNECTED) {
    WiFiClient client;
    HTTPClient http;

    http.begin(client, "http://plant-sensor-app-chvvn17.azurewebsites.net/sensor/data");
    http.addHeader("Content-Type", "application/json");

    time_t now = time(nullptr);
    struct tm* timeinfo = localtime(&now);

    char timeStr[25];
    strftime(timeStr, sizeof(timeStr), "%Y-%m-%dT%H:%M:%S", timeinfo);

    String body = "{\"feuchtigkeit\": " + String(prozent) + ", \"timestamp\": \"" + String(timeStr) + "\"}";
    int status = http.POST(body);

    Serial.print("HTTP-Status: ");
    Serial.println(status);

    http.end();
  }
  else {
    Serial.println("⚠️ WLAN nicht verbunden, POST übersprungen.");
  }

  delay(1800000);  // 30 Minuten warten
  //delay(60000);  // 1 Minute warten - Testing
}