import { Router } from "express";
import { createTask, getTasksByProject } from "../controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
const router = Router();

router.post("/", authMiddleware, createTask);

router.get("/:projectId", authMiddleware, getTasksByProject);

export default router;
