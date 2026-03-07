import { Request, Response } from "express";
import {
  createProjectService,
  getProjectsByWorkspaceService,
  updateProjectService,
  deleteProjectService,
} from "../services/project.service";

export const createProject = async (
  req: Request<{}, {}, { name: string; workspaceId: string }>,
  res: Response,
) => {
  try {
    const { name, workspaceId } = req.body;
    const userId = req.user.id;

    const project = await createProjectService(name, workspaceId, userId);

    res.status(201).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getProjectsByWorkspace = async (
  req: Request<{ workspaceId: string }>,
  res: Response,
) => {
  try {
    const { workspaceId } = req.params;
    const userId = req.user.id;

    const projects = await getProjectsByWorkspaceService(workspaceId, userId);

    res.status(200).json({
      success: true,
      data: projects,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateProject = async (
  req: Request<{ id: string }, {}, { name: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    const project = await updateProjectService(id, userId, name);

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProject = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await deleteProjectService(id, userId);

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
