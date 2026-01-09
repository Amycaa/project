import bcrypt from "bcrypt";
import { pool } from "../../db.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ hiba: "Csak POST engedélyezett" });
  }

  const { felhasznaloNev, jelszo } = req.body;

  if (!felhasznaloNev || !jelszo) {
    return res.status(400).json({ hiba: "Minden mező kitöltése kötelező" });
  }

  try {
    // Ellenőrizzük, hogy létezik-e már a felhasználó
    const userCheck = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [felhasznaloNev]
    );

    if (userCheck.rows.length > 0) {
      return res.status(409).json({ hiba: "Felhasználónév már foglalt" });
    }

    const hash = await bcrypt.hash(jelszo, 10);

    const result = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username",
      [felhasznaloNev, hash]
    );

    const user = result.rows[0];

    res.status(201).json({
      uzenet: "Regisztráció sikeres",
      userId: user.id,
      username: user.username,
    });
  } catch (err) {
    console.error("DB hiba:", err);
    res.status(500).json({ hiba: "Szerverhiba" });
  }
}
