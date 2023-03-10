import dayjs from "dayjs";

import { mapToArray } from "@common/utilities/map.util";

import { seedAccountIds } from "../account/account.seed";
import { stubCollection } from "./collection.entity";

import type { Collection } from "./collection.entity";

export const seedCollectionIds = {
  admin_work: "1da2a171-37ff-43b0-8911-d02cf536bd4e",
  admin_finance: "8b1b8eab-8cf7-4555-83ec-c5813d6e3953",
  dummy_list: "ce1c2170-8a1a-4901-91fa-09518b1b3acf",
};

const seedCollections = (): Map<string, Collection> => {
  const collectionList: Collection[] = [
    stubCollection({
      createdAt: dayjs().subtract(41, "day").toISOString(),
      id: seedCollectionIds["admin_work"],
      accountId: seedAccountIds["admin"],
      icon: null,
      name: "Work",
    }),
    stubCollection({
      createdAt: dayjs().subtract(8, "day").toISOString(),
      id: seedCollectionIds["admin_finance"],
      accountId: seedAccountIds["admin"],
      icon: null,
      name: "Finance",
    }),
    stubCollection({
      createdAt: dayjs().subtract(19, "day").toISOString(),
      id: seedCollectionIds["dummy_list"],
      accountId: seedAccountIds["dummy"],
      icon: null,
      name: "Assorted",
    }),
  ];

  return new Map(collectionList.map((c) => [c.id, c]));
};

export const seededCollectionMap = seedCollections();
export const seededCollectionList = mapToArray(seededCollectionMap);
