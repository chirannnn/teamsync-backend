import { Task } from "../models/Task";

export const createTaskService = async (data: any, userId: string) => {
  const task = await Task.create({
    ...data,
    createdBy: userId,
  });

  return task;
};

export const getTasksByProjectService = async (projectId: string) => {
  return Task.find({ project: projectId })
    .populate("assignedTo", "username email")
    .populate("createdBy", "username email");
};
