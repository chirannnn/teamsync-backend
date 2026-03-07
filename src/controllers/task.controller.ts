import { Request, Response } from "express";
import {
  createTaskService,
  getTasksByProjectService,
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
