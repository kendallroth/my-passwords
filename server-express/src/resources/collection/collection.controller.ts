import database from "@database";
import { Router } from "express";
import { sort } from "fast-sort";

import { paginate } from "@common/utilities/pagination.util";
import { getSortParams } from "@common/utilities/sort.util";

import type { Collection } from "./collection.entity";
import type { PaginatedResult } from "@common/types/pagination.types";
import type { Request, Response } from "express";

export const collectionRouter = Router();

collectionRouter.get(
  "/",
  (
    req: Request<unknown, unknown, unknown, { sort?: string }>,
    res: Response<PaginatedResult<Collection>>,
  ) => {
    const collectionsRef = database.data!.collections;
    const collections = Array.from(collectionsRef.values());

    const sortKeys = ["name"];
    const sortList = getSortParams(req.query.sort, sortKeys, "name");
    const sortedCollections = sortList.length ? sort(collections).by(sortList) : collections;

    const paginatedCollections = paginate(sortedCollections, {
      page: 1,
      size: 10,
    });

    res.json(paginatedCollections);
  },
);
