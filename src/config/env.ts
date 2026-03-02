import dotenv from "dotenv";

dotenv.config();

const requiredEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Config Error: Environment variable "${key}" is missing!`);
  }
  return value;
};

export const ENV = {
  PORT: process.env.PORT || 5000,

  MONGO_URI: requiredEnv("MONGO_URI"),
  JWT_SECRET: requiredEnv("JWT_SECRET"),

  NODE_ENV: process.env.NODE_ENV || "development",
} as const;
