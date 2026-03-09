import { Router } from "express";
import {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask,
  getWorkspaceStats,
} from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.post("/", authMiddleware, createTask);

router.get("/:projectId", authMiddleware, getTasksByProject);

router.patch("/:taskId", authMiddleware, updateTask);

router.delete("/:taskId", authMiddleware, deleteTask);

router.get("/stats/:workspaceId", authMiddleware, getWorkspaceStats);

export default router;
