import database from "@database";
import { Router } from "express";
import { sort } from "fast-sort";

import { getPaginationFromQuery, paginate } from "@common/utilities/pagination.util";
import { getSortParams } from "@common/utilities/sort.util";

import type { Password } from "./password.entity";
import type { PaginatedResult, PaginationQuery } from "@common/types/pagination.types";
import type { Request, Response } from "express";

export const passwordRouter = Router();

// const get

passwordRouter.get(
  "/",
  (
    req: Request<unknown, unknown, unknown, { sort?: string } & PaginationQuery>,
    res: Response<PaginatedResult<Password>>,
  ) => {
    const passwordsRef = database.data!.passwords;
    const passwords = Array.from(passwordsRef.values());

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
