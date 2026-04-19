import { query } from "../../config/database.js";

export const findUserByEmail = async (email) => {
    const [rows] = await query(
        "SELECT id, name, email, role FROM users WHERE email = ? LIMIT 1",
        [email]
    );

    return rows[0] || null;
};

export const getAllUsers = async () => {
    const [rows] = await query(
        "SELECT id, name, email, role, created_at, updated_at FROM users"
    );
    return rows;
};
  
export const getUserById = async (id) => {
    const [rows] = await query(
        "SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = ?",
        [id]
    );
    return rows[0] || null;
};

export const createUser = async (payload) => {
    const [result] = await query(
        "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
        [payload.name, payload.email, payload.password, "user"]
    );

    return {
      id: result.insertId,
      name: payload.name,
      email: payload.email,
      role: "user"
    };
};

export const updateUser = async (id, payload) => {
    const [result] = await query(
        "UPDATE users SET name = ?, email = ? WHERE id = ?",
        [payload.name, payload.email, id]
    );
    if (result.affectedRows === 0) return null;

    return { id: parseInt(id), ...payload };
};

export const deleteUser = async (id) => {
    const [result] = await query("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows === 0) return null;

    return { id: parseInt(id) };
};
