import express, { Express, Request, Response } from "express";
import authRoutes from "./routes/auth.routes";

const app: Express = express();

app.use(express.json());

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Teamsync Backend is running!");
});

app.use("/api/v1", authRoutes);

export default app;
