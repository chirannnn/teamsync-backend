import { Workspace } from "../models/Workspace";
import { User } from "../models/User";

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

export const addMemberService = async (
  workspaceId: string,
  ownerId: string,
  memberEmail: string,
) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new Error("workspace not found");
  }

  // check owner
  if (workspace.owner.toString() !== ownerId) {
    throw new Error("Only owner can add members");
  }

  const user = await User.findOne({ email: memberEmail });

  if (!user) {
    throw new Error("User not found");
  }

  // prevent duplicate
  if (workspace.members.includes(user._id)) {
    throw new Error("User already a member");
  }

  workspace.members.push(user._id);
  await workspace.save();

  return workspace;
};

export const removeMemberService = async (
  workspaceId: string,
  ownerId: string,
  memberId: string,
) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new Error("workspace not found");
  }

  if (workspace.owner.toString() !== ownerId) {
    throw new Error("Only owner can remove members");
  }

  workspace.members = workspace.members.filter(
    (id) => id.toString() !== memberId,
  );

  await workspace.save();

  return workspace;
};

export const getWorkspaceByIdService = async (workspaceId: string) => {
  return Workspace.findById(workspaceId)
    .populate("owner", "username email")
    .populate("members", "username email");
};
