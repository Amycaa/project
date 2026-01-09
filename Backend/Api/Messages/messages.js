import { pool } from "../db.js";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { senderId, receiverId, content } = req.body;

    await pool.query(
      "INSERT INTO messages (sender_id, receiver_id, content) VALUES ($1, $2, $3)",
      [senderId, receiverId, content]
    );

    return res.json({ uzenet: "Üzenet elküldve" });
  }

  res.status(405).end();
}


