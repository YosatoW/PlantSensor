import { boolean, integer, pgTable, timestamp, real } from "drizzle-orm/pg-core";

export const plantSensor = pgTable("plant_sensor", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  feuchtigkeit: integer('feuchtigkeit').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
  simulated: boolean('simulated').default(false).notNull(),
});