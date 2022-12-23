import { Router } from "express";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { UnauthorizedError } from "@common/errors";
import { sleep } from "@common/utilities/sleep.util";
import database from "@database";
import { authRequest, JWT_SECRET } from "@middleware";

import { getAccountByCredentials, getAccountById } from "./account.util";

import type { Account } from "./account.entity";

export const accountRouter = Router();

accountRouter.get("/", authRequest, async (req: Request, res: Response<Account | null>) => {
  const account = getAccountById(database, req.account!.id)!;

  await sleep(1000);

  return res.json(account);
});

accountRouter.post(
  "/login",
  async (
    req: Request<unknown, unknown, { email: string; password: string }>,
    res: Response<{ token: string }>,
  ) => {
    const { email, password } = req.body;

    await sleep(500);

    const account = getAccountByCredentials(database, email, password);
    if (!account) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const token = jwt.sign(
      {
        accountId: account.id,
        email: account.email,
      },
      JWT_SECRET,
      { expiresIn: "1d" },
    );

    return res.json({ token });
  },
);
