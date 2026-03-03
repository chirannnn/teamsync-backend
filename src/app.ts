import express, { Express, Request, Response } from "express";
import authRoutes from "./routes/auth.routes";
import workspacesRoutes from "./routes/workspace.routes";

const app: Express = express();

app.use(express.json());

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Teamsync Backend is running!");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/workspaces", workspacesRoutes);

export default app;
