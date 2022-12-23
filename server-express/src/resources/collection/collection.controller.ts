import { Router } from "express";
import type { Request, Response } from "express";
import { sort } from "fast-sort";

import { mapToArray } from "@common/utilities/map.util";
import { getPaginationFromQuery, paginate } from "@common/utilities/pagination.util";
import { sleep } from "@common/utilities/sleep.util";
import { getSortParams } from "@common/utilities/sort.util";
import database from "@database";
import { authRequest } from "@middleware";

import type { Collection } from "./collection.entity";
import type { PaginatedResult, PaginationQuery } from "types/pagination.types";

export const collectionRouter = Router();

collectionRouter.get(
  "/",
  authRequest,
  async (
    req: Request<unknown, unknown, unknown, { sort?: string } & PaginationQuery>,
    res: Response<PaginatedResult<Collection>>,
  ) => {
    await sleep(100);

    const collectionsRef = database.data!.collections;
    const passwords = mapToArray(database.data!.passwords).filter(
      (p) => p.collectionId !== null && p.accountId === req.account?.id,
    );
    const collections = mapToArray(collectionsRef)
      .filter((c) => c.accountId === req.account?.id)
      .map((c) => ({
        ...c,
        passwords: passwords.filter((p) => p.collectionId === c.id).length,
      }));

    const sortKeys = ["name"];
    const sortList = getSortParams(req.query.sort, sortKeys, "name");
    const sortedCollections = sortList.length ? sort(collections).by(sortList) : collections;

    const pagination = getPaginationFromQuery(req.query);
    const paginatedCollections = paginate(sortedCollections, pagination);

    res.json(paginatedCollections);
  },
);
