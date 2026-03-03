import { IUser } from "../models/User";

declare namespace Express {
  interface Request {
    user?: { id: string };
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
