import { Request, Response } from "express";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Registration failed",
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Login failed",
    });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { currentPassword, newPassword } = req.body;

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Password change failed",
    });
  }
};
