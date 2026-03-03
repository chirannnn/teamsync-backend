import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import {
  createWorkspace,
  getWorkspaces,
} from "../controllers/workspace.controller";

const router = Router();

router.post("/", authMiddleware, createWorkspace);

router.get("/", authMiddleware, getWorkspaces);

export default router;
