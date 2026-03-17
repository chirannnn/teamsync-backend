import { Request, Response } from "express";
import {
  registerUser,
  loginUser,
  changeUserPassword,
} from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const data = await registerUser({ username, email, password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const data = await loginUser({ email, password });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data,
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const data = await changeUserPassword(userId, currentPassword, newPassword);

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (e) {
    res.status(401).json({
      success: false,
      message: "Password change failed",
    });
  }
};
