import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Use DATABASE_URL from your `.env` file
  ssl: { rejectUnauthorized: false }, // Ensure SSL is enabled for NeonDB
});

export const query = (text: string, params?: any[]) => {
  return pool.query(text, params);
};
