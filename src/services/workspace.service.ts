import { Workspace } from "../models/Workspace";

export const createWorkspaceService = async (name: string, userId: string) => {
  const workspace = await Workspace.create({
    name,
    owner: userId,
    members: [userId],
  });

  return workspace;
};

export const getUserWorkspacesService = async (userId: string) => {
  return Workspace.find({ members: userId }).populate(
    "owner",
    "username email",
  );
};
