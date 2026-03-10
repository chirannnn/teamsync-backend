import mongoose from "mongoose";
import { Comment } from "../models/Comment";
import { Task } from "../models/Task";

export const addCommentservice = async (
  content: string,
  taskId: string,
  userId: string,
) => {
  if (!content) {
    throw new Error("Comment content is required");
  }

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const comment = await Comment.create({
    content,
    task: taskId,
    user: userId,
  });

  return comment;
};

export const getCommentsByTaskService = async (taskId: string) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const comments = await Comment.find({ task: taskId })
    .populate("user", "username email")
    .sort({ createdAt: -1 });

  return comments;
};

export const deleteCommentService = async (
  commentId: string,
  userId: string,
) => {
  if (!mongoose.Types.ObjectId.isValid(commentId)) {
    throw new Error("Invalid comment ID");
  }

  const comment = await Comment.findById(commentId);
  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.user.toString() !== userId) {
    throw new Error("You are not allowed to delete this comment");
  }

  await comment.deleteOne();

  return { message: "Comment deleted successfully" };
};
