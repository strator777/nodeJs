import rateLimit from "express-rate-limit";

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Terlalu banyak request, coba lagi nanti"
  },
  standardHeaders: true,
  legacyHeaders: false
});

export default rateLimitMiddleware;