import { Router } from "express";
import type { Request, Response } from "express";
import { sort } from "fast-sort";

import { mapToArray } from "@common/utilities/map.util";
import { getPaginationFromQuery, paginate } from "@common/utilities/pagination.util";
import { sleep } from "@common/utilities/sleep.util";
import { getSortParams } from "@common/utilities/sort.util";
import database from "@database";
import { authRequest } from "@middleware";

import type { Password } from "./password.entity";
import type { PaginatedResult, PaginationQuery } from "types/pagination.types";

export const passwordRouter = Router();

passwordRouter.get(
  "/",
  authRequest,
  async (
    req: Request<unknown, unknown, unknown, { sort?: string; name?: string } & PaginationQuery>,
    res: Response<PaginatedResult<Password>>,
  ) => {
    await sleep(100);

    const passwordsRef = database.data!.passwords;
    const passwords = mapToArray(passwordsRef).filter((p) => {
      if (p.accountId !== req.account?.id) return false;

      const name = req.query.name?.trim().toLowerCase();
      if (name && !p.name.toLowerCase().includes(name)) {
        return false;
      }

      return true;
    });

    const sortKeys = ["name"];
    const sortList = getSortParams(req.query.sort, sortKeys, "name");
    const sortedPasswords = sortList.length ? sort(passwords).by(sortList) : passwords;

    const pagination = getPaginationFromQuery(req.query);
    const paginatedPasswords = paginate(sortedPasswords, pagination);

    paginatedPasswords.data = paginatedPasswords.data.map((password) => ({
      ...password,
      collection: password.collectionId
        ? database.data!.collections.get(password.collectionId) ?? null
        : null,
    }));

    res.json(paginatedPasswords);
  },
);
