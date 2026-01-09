import bcrypt from "bcrypt";
import { pool } from "../db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { felhasznaloNev, jelszo } = req.body;

  if (!felhasznaloNev || !jelszo) {
    return res.status(400).json({ hiba: "Hiányzó adatok" });
  }

  try {
    const hash = await bcrypt.hash(jelszo, 10);

    await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2)",
      [felhasznaloNev, hash]
    );

    res.status(200).json({ uzenet: "Sikeres regisztráció" });
  } catch {
    res.status(400).json({ hiba: "Felhasználó már létezik" });
  }
}
