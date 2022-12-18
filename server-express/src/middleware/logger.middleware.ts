import type { NextFunction, Request, Response } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  const url = req.url;
  const requestLog = `[Request] ${method} ${url}`;

  console.log(requestLog);

  next();
};
