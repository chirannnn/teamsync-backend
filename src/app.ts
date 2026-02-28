import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Teamsync Backend is running!");
});

export default app;
