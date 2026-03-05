import { Project } from "../models/Project";
import { Workspace } from "../models/Workspace";

export const createProjectService = async (
  name: string,
  workspaceId: string,
  userId: string,
) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  // permission: must be workspace member
  const isMember = workspace.members.some(
    (member) => member.toString() === userId,
  );

  if (!isMember) {
    throw new Error("You are not a member of this workspace");
  }

  const project = await Project.create({
    name,
    workspace: workspaceId,
    createdBy: userId,
  });

  return project;
};

export const getProjectsByWorkspaceService = async (
  workspaceId: string,
  userId: string,
) => {
  const workspcae = await Workspace.findById(workspaceId);

  if (!workspcae) {
    throw new Error("Workspace not found");
  }

  const isMember = workspcae.members.some(
    (member) => member.toString() === userId,
  );

  if (!isMember) {
    throw new Error("Access denied");
  }

  return Project.find({ workspace: workspaceId }).populate(
    "createdBy",
    "username email",
  );
};

export const updateProjectService = async (
  projectId: string,
  userId: string,
  newName: string,
) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  const workspace = await Workspace.findById(project.workspace);

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  // Only workspace owner OR project creator can update
  if (
    workspace.owner.toString() !== userId &&
    project.createdBy.toString() !== userId
  ) {
    throw new Error("You don't have permission to update this project");
  }

  project.name = newName;
  await project.save();

  return project;
};

export const deleteProjectService = async (
  projectId: string,
  userId: string,
) => {
  const project = await Project.findById(projectId);

  if (!project) {
    throw new Error("Project not found");
  }

  const workspace = await Workspace.findById(project.workspace);

  if (!workspace) {
    throw new Error("Workspace not found");
  }

  // Only workspace owner can delete
  if (workspace.owner.toString() !== userId) {
    throw new Error("Only workspace owner can delete project");
  }

  await project.deleteOne();

  return { message: "Project deleted successfully" };
};
