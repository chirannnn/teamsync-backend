import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  addComment,
  getComments,
  deleteComments,
} from "../controllers/comment.controller";

const router = Router();

router.post("/", authMiddleware, addComment);

router.get("/:taskId", authMiddleware, getComments);

router.delete("/:commentId", authMiddleware, deleteComments);

export default router;
