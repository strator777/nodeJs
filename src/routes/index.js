import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import userRoutes from "../modules/users/user.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/users", authMiddleware, userRoutes);

export default router;
