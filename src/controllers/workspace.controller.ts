import { Request, Response } from "express";
import {
  createWorkspaceService,
  getUserWorkspacesService,
  addMemberService,
  removeMemberService,
  getWorkspaceByIdService,
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

    res.status(200).json({
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

export const addMember = async (
  req: Request<{ workspaceId: string }, {}, { email: string }>,
  res: Response,
) => {
  try {
    const { workspaceId } = req.params;
    const { email } = req.body;
    const userId = req.user.id;

    const workspace = await addMemberService(workspaceId, userId, email);

    res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: e.message || "Something went wrong",
    });
  }
};

export const removeMember = async (
  req: Request<{ workspaceId: string; memberId: string }>,
  res: Response,
) => {
  try {
    const { workspaceId, memberId } = req.params;
    const userId = req.user.id;

    const workspace = await removeMemberService(workspaceId, userId, memberId);

    res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (e: any) {
    res.status(400).json({
      success: false,
      message: e.message || "Something went wrong",
    });
  }
};

export const getWorkspaceById = async (
  req: Request<{ workspaceId: string }>,
  res: Response,
) => {
  try {
    const { workspaceId } = req.params;

    const workspace = await getWorkspaceByIdService(workspaceId);

    res.status(200).json({
      success: true,
      data: workspace,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch workspace",
    });
  }
};
