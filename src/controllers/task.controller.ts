import { Request, Response } from "express";
import {
  createTaskService,
  getTasksByProjectService,
  updateTaskService,
  deleteTaskService,
  getWorkspaceStatsService,
} from "../services/task.service";

export const createTask = async (
  req: Request<
    {},
    {},
    {
      title: string;
      description?: string;
      priority?: "low" | "medium" | "high";
      dueDate?: Date;
      project: string;
      workspace: string;
      assignedTo?: string;
    }
  >,
  res: Response,
) => {
  try {
    const userId = req.user.id;

    const task = await createTaskService(req.body, userId);

    res.status(201).json({
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

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const status = req.query.status as string;

    const tasks = await getTasksByProjectService(
      projectId,
      page,
      limit,
      status,
    );

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
  req: Request<
    { taskId: string },
    {},
    {
      title?: string;
      description?: string;
      priority?: "low" | "medium" | "high";
      dueDate?: Date;
      status?: "todo" | "in-progress" | "done";
      assignedTo?: string;
    }
  >,
  res: Response,
) => {
  try {
    const { taskId } = req.params;
    const userId = req.user.id;
    const task = await updateTaskService(taskId, userId, req.body);

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

    const userId = req.user.id;

    await deleteTaskService(taskId, userId);

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
