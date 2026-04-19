import fs from "fs";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";
import db, { query } from "../config/database.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const migrationsDir = path.join(__dirname, "migrations");

const ensureMigrationsTable = async () => {
  await query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
};

const getExecutedMigrations = async () => {
  const [rows] = await query("SELECT name FROM migrations");
  return rows.map((row) => row.name);
};

const runMigration = async (file) => {
  const filePath = path.join(migrationsDir, file);

  // ubah path Windows menjadi file:// URL
  const fileUrl = pathToFileURL(filePath).href;

  const migration = await import(fileUrl);

  if (typeof migration.up !== "function") {
    throw new Error(`Migration ${file} tidak punya function 'up'`);
  }

  console.log(`▶ Menjalankan migration: ${file}`);
  await migration.up(db);

  await query(
    "INSERT INTO migrations (name) VALUES (?)",
    [file]
  );

  console.log(`✅ Selesai: ${file}`);
};

export const migrate = async () => {
  await ensureMigrationsTable();

  const executed = await getExecutedMigrations();
  const files = fs
    .readdirSync(migrationsDir)
    .filter((file) => file.endsWith(".js"))
    .sort();

  for (const file of files) {
    if (!executed.includes(file)) {
      console.log(`⏳ Migrasi baru terdeteksi: ${file}`);
      await runMigration(file);
    }
  }

  console.log("✅ Semua migration selesai");
};