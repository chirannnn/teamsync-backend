import { Router } from "express";
import {
  register,
  login,
  changePassword,
} from "../controllers/auth.controller";

const router = Router();

// public routes
router.post("/register", register);
router.post("/login", login);

// protected route
router.patch("/change-password", changePassword);

export default router;
