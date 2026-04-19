import { env } from "../config/env.js";

const isDuplicateEmailError = (err) => {
    const code = err?.original?.code || err?.parent?.code || err?.code;
    const message =
        err?.original?.sqlMessage ||
        err?.parent?.sqlMessage ||
        err?.message ||
        "";

    return code === "ER_DUP_ENTRY" && message.toLowerCase().includes("email");
};

const normalizeError = (err) => {
    if (isDuplicateEmailError(err)) {
        const normalizedError = new Error("Email sudah terdaftar");
        normalizedError.statusCode = 409;
        return normalizedError;
    }

    return err;
};

const errorMiddleware = (err, req, res, next) => {
    const normalizedError = normalizeError(err);
    const statusCode = normalizedError.statusCode || 500;
    const isProduction = env.NODE_ENV === "production";
    const requestLabel = `${req.method} ${req.originalUrl}`;

    if (statusCode >= 500) {
        console.error(`[ERROR] ${requestLabel}`);
        console.error(normalizedError);
    } else if (!isProduction) {
        console.warn(`[WARN] ${requestLabel} -> ${statusCode} ${normalizedError.message}`);
    }

    res.status(statusCode).json({
        success: false,
        message: isProduction && statusCode === 500
            ? "Internal server error"
            : (normalizedError.message || "Internal server error")
    });
};

export default errorMiddleware;
