import { Router } from "express";
import {
  register,
  login,
  changePassword,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// public routes
router.post("/register", register);
router.post("/login", login);

// protected route
router.patch("/change-password", authMiddleware, changePassword);

export default router;
