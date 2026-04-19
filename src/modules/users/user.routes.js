import { Router } from "express";
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from "./user.controller.js";
import validate from "../../middlewares/validate.middleware.js";
import authorizeRoles from "../../middlewares/role.middleware.js";
import { createUserSchema, getUserByIdSchema, updateUserSchema, deleteUserSchema } from "./user.validate.js";

const router = Router();

router.get("/", authorizeRoles("admin", "user"), getAllUsers);
router.get("/:id", authorizeRoles("admin", "user"), validate(getUserByIdSchema), getUserById);
router.post("/", authorizeRoles("admin"), validate(createUserSchema), createUser);
router.put("/:id", authorizeRoles("admin"), validate(updateUserSchema), updateUser);
router.delete("/:id", authorizeRoles("admin"), validate(deleteUserSchema), deleteUser);

export default router;
