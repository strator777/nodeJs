import db, { query } from "../../config/database.js";

export const findUserByEmail = async (email) => {
  const [rows] = await query(
    "SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1",
    [email]
  );

  return rows[0] || null;
};

export const createUser = async ({ name, email, password }) => {
  const [result] = await query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, password, "user"]
  );

  return {
    id: result.insertId,
    name,
    email,
    role: "user"
  };
};