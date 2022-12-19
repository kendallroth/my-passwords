import database from "@database";
import { Router } from "express";
import { sort } from "fast-sort";

import { paginate } from "@common/utilities/pagination.util";
import { getSortParams } from "@common/utilities/sort.util";

import type { Account } from "./account.entity";
import type { PaginatedResult } from "@common/types/pagination.types";
import type { Request, Response } from "express";

export const accountRouter = Router();

// TODO: Secure behind devops header check
accountRouter.get(
  "/",
  (
    req: Request<unknown, unknown, unknown, { sort?: string }>,
    res: Response<PaginatedResult<Account>>,
  ) => {
    const accountsRef = database.data!.accounts;
    const accounts = Array.from(accountsRef.values());

    const sortKeys = ["name"];
    const sortList = getSortParams(req.query.sort, sortKeys, "name");
    const sortedAccounts = sortList.length ? sort(accounts).by(sortList) : accounts;

    const paginatedCollections = paginate(sortedAccounts, {
      page: 1,
      size: 10,
    });

    res.json(paginatedCollections);
  },
);
