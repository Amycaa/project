import { pool } from "../db.js";

export default async function handler(req, res) {
  const { userId } = req.query;

  const eredmeny = await pool.query(
    "SELECT * FROM messages WHERE receiver_id = $1",
    [userId]
  );

  res.json(eredmeny.rows);
}
