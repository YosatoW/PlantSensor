import { integer, pgTable, timestamp, real } from "drizzle-orm/pg-core";

export const sensor_data = pgTable("sensor", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  moisture: integer('moisture').notNull(),
  temperature: real('temperature').notNull(),
  timestamp: timestamp('timestamp').defaultNow().notNull(),
});
