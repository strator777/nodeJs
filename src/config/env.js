import dotenv from 'dotenv';

dotenv.config();

const toNumber = (value, fallback) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const getRequiredEnv = (key, options = {}) => {
    const value = process.env[key]?.trim();
    const invalidValues = options.invalidValues || [];

    if (!value) {
        throw new Error(`Environment variable ${key} wajib diisi`);
    }

    if (invalidValues.includes(value)) {
        throw new Error(`Environment variable ${key} masih memakai placeholder atau nilai tidak aman`);
    }

    if (options.minLength && value.length < options.minLength) {
        throw new Error(
            `Environment variable ${key} minimal ${options.minLength} karakter`
        );
    }

    return value;
};

export const env = {
    PORT: process.env.PORT || 3000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    DB_HOST: process.env.DB_HOST || 'localhost',
    DB_PORT: toNumber(process.env.DB_PORT, 3306),
    DB_USER: getRequiredEnv('DB_USER'),
    DB_PASSWORD: getRequiredEnv('DB_PASSWORD', {
        invalidValues: ['your_database_password']
    }),
    DB_NAME: getRequiredEnv('DB_NAME'),
    JWT_SECRET: getRequiredEnv('JWT_SECRET', {
        invalidValues: ['replace-with-a-strong-secret'],
        minLength: 16
    }),
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '1d',
};
