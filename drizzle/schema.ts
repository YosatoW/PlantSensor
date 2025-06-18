import { pgTable, integer, timestamp, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const plantSensor = pgTable("plant_sensor", {
	id: integer().primaryKey().generatedAlwaysAsIdentity({ name: "plant_sensor_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 2147483647, cache: 1 }),
	feuchtigkeit: integer().notNull(),
	timestamp: timestamp({ mode: 'string' }).defaultNow().notNull(),
	simulated: boolean().default(false).notNull(),
});
