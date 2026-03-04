import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRoles } from "../middlewares/role.middleware";
import {
  createWorkspace,
  getWorkspaces,
  addMember,
  removeMember,
  getWorkspaceById,
} from "../controllers/workspace.controller";

const router = Router();

router.post("/", authMiddleware, createWorkspace);

router.get("/", authMiddleware, getWorkspaces);

router.post("/:workspaceId/members", authMiddleware, addMember);

router.delete("/:workspaceId/members/:memberId", authMiddleware, removeMember);

router.get("/:workspaceId", getWorkspaceById);

export default router;
