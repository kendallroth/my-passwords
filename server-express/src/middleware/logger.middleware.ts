import type { NextFunction, Request, Response } from "express";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const method = req.method.padStart(5, " ");
  const url = req.url;
  const requestLog = `[Request]  ${method} ${url}`;

  console.log(requestLog);

  const requestTimeStart = new Date().getTime();

  res.on("finish", () => {
    const requestTime = new Date().getTime() - requestTimeStart;
    // @ts-ignore TODO: Figure this out...
    let accountId = req.account?.id ?? "";
    accountId = accountId ? ` accountId:${accountId}` : "";

    const responseLog = `[Response] ${method} ${res.statusCode} ${url} (${requestTime}ms)${accountId}`;
    console.log(responseLog);
  });

  next();
};
