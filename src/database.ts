// import 'dotenv/config'
// import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres'
// import * as schema from './db/schema'

// type DBSchema = NodePgDatabase<typeof schema>

// const db: DBSchema = drizzle(process.env.DATABASE_URL!)
// export { db }

import 'dotenv/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './db/schema';

type DBSchema = NodePgDatabase<typeof schema>;

const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  ssl: {
    rejectUnauthorized: false, // notwendig für Azure
  },
});

const db: DBSchema = drizzle(pool);

export { db };