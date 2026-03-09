import { Request, Response } from "express";
import {
  createTaskService,
  getTasksByProjectService,
  updateTaskService,
  deleteTaskService,
  getWorkspaceStatsService,
} from "../services/task.service";

export const createTask = async (req: any, res: Response) => {
  try {
    const userId = req.user.id;

    const task = await createTaskService(req.body, userId);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getTasksByProject = async (
  req: Request<{ projectId: string }>,
  res: Response,
) => {
  try {
    const { projectId } = req.params;

    const tasks = await getTasksByProjectService(projectId);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateTask = async (
  req: Request<{ taskId: string }>,
  res: Response,
) => {
  try {
    const { taskId } = req.params;

    const task = await updateTaskService(taskId, req.body);

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteTask = async (
  req: Request<{ taskId: string }>,
  res: Response,
) => {
  try {
    const { taskId } = req.params;

    await deleteTaskService(taskId);

    res.status(200).json({
      success: true,
      message: "Task deleted",
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getWorkspaceStats = async (
  req: Request<{ workspaceId: string }>,
  res: Response,
) => {
  try {
    const { workspaceId } = req.params;

    const stats = await getWorkspaceStatsService(workspaceId);

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
