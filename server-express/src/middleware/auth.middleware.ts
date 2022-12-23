import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "@common/errors";
import database from "@database";
import { getAccountById } from "@resources/account/account.util";

export const JWT_SECRET = "secret";

export const authRequest = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedError();
  }

  const [, token] = authHeader.split(" ");
  if (!token) {
    throw new UnauthorizedError();
  }

  jwt.verify(token, JWT_SECRET, (err, jwtToken) => {
    if (err) {
      // TODO: Log error message
      throw new UnauthorizedError();
    }

    const accountId = (jwtToken as jwt.JwtPayload).accountId;
    if (!accountId) {
      throw new UnauthorizedError();
    }

    const account = getAccountById(database, accountId);
    if (!account) {
      throw new UnauthorizedError();
    }

    req.account = account;

    next();
  });
};
