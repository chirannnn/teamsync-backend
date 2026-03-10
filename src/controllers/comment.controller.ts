import { Request, Response } from "express";
import {
  addCommentservice,
  getCommentsByTaskService,
  deleteCommentService,
} from "../services/comment.service";

export const addComment = async (
  req: Request<{}, {}, { content: string; taskId: string }>,
  res: Response,
) => {
  try {
    const { content, taskId } = req.body;
    const userId = req.user.id;

    const comment = await addCommentservice(content, taskId, userId);

    res.status(201).json({
      success: true,
      data: comment,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getComments = async (
  req: Request<{ taskId: string }>,
  res: Response,
) => {
  try {
    const { taskId } = req.params;

    const comments = await getCommentsByTaskService(taskId);

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteComments = async (
  req: Request<{ commentId: string }>,
  res: Response,
) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const result = await deleteCommentService(commentId, userId);

    res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
