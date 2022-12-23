import dayjs from "dayjs";

import { mapToArray } from "@common/utilities/map.util";

import { encryptPassword } from "../password/password.util";
import { stubAccount } from "./account.entity";

import type { Account } from "./account.entity";

export const seedAccountIds = {
  admin: "b4d6e26b-fa9f-41a3-836f-9b74a5122530",
  dummy: "48f1a2f2-84b2-49d5-bdec-99221056b133",
};

const seedAccounts = (): Map<string, Account> => {
  const accountList: Account[] = [
    stubAccount({
      createdAt: dayjs().subtract(48, "day").toISOString(),
      email: "admin@example.com",
      id: seedAccountIds["admin"],
      password: encryptPassword("Passw0rd!", seedAccountIds["admin"]),
    }),
    stubAccount({
      createdAt: dayjs().subtract(19, "day").toISOString(),
      email: "dummy@example.com",
      id: seedAccountIds["dummy"],
      password: encryptPassword("Passw0rd@", seedAccountIds["dummy"]),
    }),
  ];

  return new Map(accountList.map((a) => [a.id, a]));
};

export const seededAccountMap = seedAccounts();
export const seededAccountList = mapToArray(seededAccountMap);
