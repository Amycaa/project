import { pool } from "../db.js";

async function tesztKapcsolat() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("DB kapcsolat OK ✅", res.rows[0]);
  } catch (err) {
    console.error("Hiba a kapcsolatban ❌", err);
  } finally {
    await pool.end(); 
  }
}

tesztKapcsolat();