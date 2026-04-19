import { Sequelize } from "sequelize";
import { env } from "./env.js";

const sequelize = new Sequelize(
  env.DB_NAME,
  env.DB_USER,
  env.DB_PASSWORD,
  {
    host: env.DB_HOST,
    port: env.DB_PORT,
    dialect: "mysql",
    logging: false,

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const normalizeQueryOptions = (input = []) => {
  if (Array.isArray(input)) {
    return { replacements: input };
  }

  if (input && typeof input === "object") {
    return input;
  }

  return {};
};


//helper untuk query biasa (SELECT, SHOW, dll) yang mengembalikan data
export const query = async (sql, options = {}) => {
  return sequelize.query(sql, normalizeQueryOptions(options));
};
//atau bisa juga untuk query biasa yang mengembalikan data, tapi dengan nama method yang lebih umum
export const execute = async (sql, options = []) => {
  return sequelize.query(sql, normalizeQueryOptions(options));
};

sequelize.execute = execute;

const formatConnectionError = (error) => {
  const code = error?.original?.code || error?.parent?.code || error?.code || "UNKNOWN";
  const message =
    error?.original?.message ||
    error?.parent?.message ||
    error?.message ||
    "Unknown database error";

  return {
    code,
    message,
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER
  };
};

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected (Sequelize)");
    return sequelize;
  } catch (error) {
    const detail = formatConnectionError(error);
    console.error("❌ DB Error:", detail.message);
    console.error(
      `Database target: mysql://${detail.user}@${detail.host}:${detail.port}/${detail.database}`
    );
    console.error(`Database error code: ${detail.code}`);

    if (detail.code === "ECONNREFUSED") {
      console.error("MySQL tidak menerima koneksi. Pastikan service MySQL aktif dan listen di host/port tersebut.");
    }

    throw error;
  }
};

export default sequelize;
