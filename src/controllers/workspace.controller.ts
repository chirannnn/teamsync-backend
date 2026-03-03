import { Request, Response } from "express";
import {
  createWorkspaceService,
  getUserWorkspacesService,
} from "../services/workspace.service";

export const createWorkspace = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    const workspace = await createWorkspaceService(name, userId);

    res.status(201).json({
      success: true,
      data: workspace,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to create workspace",
    });
  }
};

export const getWorkspaces = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    const workspaces = await getUserWorkspacesService(userId);

    res.status(201).json({
      success: true,
      data: workspaces,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch workspaces",
    });
  }
};
