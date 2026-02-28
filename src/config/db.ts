import mongoose from "mongoose";
import { ENV } from "./env";

export const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(ENV.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("MongoDB connection failed:", err);
    process.exit(1);
  }
};
