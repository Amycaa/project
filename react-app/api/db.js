import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Megkeressük a jelenlegi fájl mappáját
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Beállítjuk, hogy a .env eggyel feljebb van (az Api mappából kiindulva a Backend-ben)
dotenv.config({ path: path.resolve(__dirname, '.env') });

const { Pool } = pg;

console.log("Adatbázis URL betöltve:", process.env.DATABASE_URL ? "IGEN ✅" : "NEM ❌");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});