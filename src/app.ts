import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json());

app.get("/api/v1", (req: Request, res: Response) => {
  res.send("Teamsync Backend is running!");
});

export default app;
