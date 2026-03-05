import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createProject,
  getProjectsByWorkspace,
  updateProject,
  deleteProject,
} from "../controllers/project.controller";

const router = Router();

router.post("/", authMiddleware, createProject);

router.get("/:workspaceId", authMiddleware, getProjectsByWorkspace);

router.patch("/:id", authMiddleware, updateProject);

router.delete("/:id", authMiddleware, deleteProject);

export default router;
