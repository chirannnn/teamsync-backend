import mongoose from "mongoose";
import { Task } from "../models/Task";
import { Project } from "../models/Project";
import { Workspace } from "../models/Workspace";
import { User } from "../models/User";

interface CreateTaskInput {
  title: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: Date;
  project: string;
  workspace: string;
  assignedTo?: string;
}

interface UpdateTaskInput {
  title?: string;
  description?: string;
  priority?: "low" | "medium" | "high";
  dueDate?: Date;
  status?: "todo" | "in-progress" | "done";
  assignedTo?: string;
}

// CREATE TASK
export const createTaskService = async (
  data: CreateTaskInput,
  userId: string,
) => {
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

  let assignedUserId;
  if (assignedTo) {
    if (!mongoose.Types.ObjectId.isValid(assignedTo)) {
      throw new Error("Invalid assigned user ID");
    }
    const user = await User.findById(assignedTo);
    if (!user) throw new Error("Assigned user not found");

    assignedUserId = new mongoose.Types.ObjectId(assignedTo);
  }

  const taskData: any = {
    title,
    project,
    workspace,
    createdBy: userId,
  };

  if (description !== undefined) taskData.description = description;
  if (priority !== undefined) taskData.priority = priority;
  if (dueDate !== undefined) taskData.dueDate = dueDate;
  if (assignedUserId !== undefined) taskData.assignedTo = assignedUserId;

  // Create task
  const task = await Task.create(taskData);

  return task;
};

// GET TASKS BY PROJECT
export const getTasksByProjectService = async (
  projectId: string,
  page: number,
  limit: number,
  status?: string,
) => {
  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    throw new Error("Invalid project ID");
  }

  const project = await Project.findById(projectId);
  if (!project) {
    throw new Error("Project not found");
  }

  const filter: any = { project: projectId };

  if (status) {
    filter.status = status;
  }

  const tasks = await Task.find(filter)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("assignedTo", "username email")
    .populate("createdBy", "username email");

  return tasks;
};

// UPDATE TASK
export const updateTaskService = async (
  taskId: string,
  userId: string,
  data: UpdateTaskInput,
) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid Task ID");
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const workspace = await Workspace.findById(task.workspace);

  if (
    task.createdBy.toString() !== userId &&
    workspace?.owner.toString() !== userId
  ) {
    throw new Error("You are not allowed to update this task");
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

    task.assignedTo = new mongoose.Types.ObjectId(assignedTo);
  }

  await task.save();

  return task;
};

// DELETE Task
export const deleteTaskService = async (taskId: string, userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task Id");
  }

  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Task not found");
  }

  const workspace = await Workspace.findById(task.workspace);

  if (
    task.createdBy.toString() !== userId &&
    workspace?.owner.toString() !== userId
  ) {
    throw new Error("You are not allowed to delete this task");
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
