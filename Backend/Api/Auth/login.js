import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
    const result = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [felhasznaloNev]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ hiba: "Hibás felhasználónév vagy jelszó" });
    }

    const user = result.rows[0];

    const match = await bcrypt.compare(jelszo, user.password_hash);
    if (!match) {
      return res.status(401).json({ hiba: "Hibás felhasználónév vagy jelszó" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      token,
      userId: user.id,
      username: user.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ hiba: "Szerverhiba" });
  }
}
