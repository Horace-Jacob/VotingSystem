import { Request, Response } from "express";
import { Session } from "express-session";
import Redis from "ioredis";

declare module "express-session" {
  interface Session {
    accountId: number;
  }

  interface Session {
    adminId: number;
  }
}

export type MyContext = {
  req: Request & { session: Session };
  res: Response;
  redis: Redis;
};
