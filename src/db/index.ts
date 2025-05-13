import { Pool } from "pg";

import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: "postgresql://postgres:123456@mydb:5432/mydb",
});

export const db = drizzle(pool);
