import mongoose from "mongoose";
import { Task } from "../models/Task";
import { Project } from "../models/Project";
import { Workspace } from "../models/Workspace";
import { User } from "../models/User";

// CREATE TASK
export const createTaskService = async (data: any, userId: string) => {
  const {
    title,
    description,
    priority,
    dueDate,
    project,
    workspace,
    assignedTo,
  } = data;

  if (!title || !project || !workspace) {
    throw new Error("Title, project and workspace are required");
  }

  if (
    !mongoose.Types.ObjectId.isValid(project) ||
    !mongoose.Types.ObjectId.isValid(workspace)
  ) {
    throw new Error("Invalid project or workspace ID");
  }

  const projectDoc = await Project.findById(project);
  if (!projectDoc) {
    throw new Error("Project not found");
  }

  const workspaceDoc = await Workspace.findById(workspace);
  if (!workspaceDoc) {
    throw new Error("Workspace not found");
  }

  if (projectDoc.workspace.toString() !== workspace) {
    throw new Error("Project does not belong to this workspace");
  }

  if (assignedTo) {
    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      throw new Error("Invalid assigned user ID");
    }

    const user = await User.findById(assignedTo);
    if (!user) {
      throw new Error("Assigned user not found");
    }
  }

  const task = await Task.create({
    title,
    description,
    priority,
    dueDate,
    project,
    workspace,
    assignedTo,
    createdBy: userId,
  });

  return task;
};

// GET TASKS BY PROJECT
export const getTasksByProjectService = async (projectId: string) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project ID");
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project not found");
  }

  return Task.find({ project: projectId })
    .populate("assignedTo", "username email")
    .populate("createdBy", "username email");
};

// UPDATE TASK
export const updateTaskService = async (taskId: string, data: any) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid Task ID");
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const { title, description, priority, dueDate, status, assignedTo } = data;

  if (title) task.title = title;
  if (description) task.description = description;
  if (priority) task.priority = priority;
  if (dueDate) task.dueDate = dueDate;
  if (status) task.status = status;

  if (assignedTo) {
    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      throw new Error("Invalid assigned User ID");
    }

    const user = await User.findById(assignedTo);
    if (!user) {
      throw new Error("Assigned user not found");
    }

    task.assignedTo = assignedTo;
  }

  await task.save();

  return task;
};

// DELETE Task
export const deleteTaskService = async (taskId: string) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task Id");
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  await task.deleteOne();

  return { message: "Task deleted successfully" };
};

// TASK STATS BY WORKSPACE
export const getWorkspaceStatsService = async (workspaceId: string) => {
  if (!mongoose.Types.ObjectId.isValid(workspaceId)) {
    throw new Error("Invalid workspace Id");
  }

  const workspace = await Workspace.findById(workspaceId);
  if (!workspace) {
    throw new Error("Workspace not found");
  }

  const stats = await Task.aggregate([
    {
      $match: {
        workspace: new mongoose.Types.ObjectId(workspaceId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
  ]);

  return stats;
};
