import dayjs from "dayjs";

import { encryptPassword } from "../utilities/password";
import { EntityBase, stubEntity } from "./base.entity";

export class Account extends EntityBase {
  username!: string;
  /** Passwords must be encoded before being saved! */
  password!: string;
}

export const stubAccount = stubEntity<Account>;

export const seedAccountIds = {
  admin: "b4d6e26b-fa9f-41a3-836f-9b74a5122530",
  dummy: "48f1a2f2-84b2-49d5-bdec-99221056b133",
};

const seedAccounts = (): Map<string, Account> => {
  const accountList: Account[] = [
    stubAccount({
      createdAt: dayjs().subtract(48, "day").toISOString(),
      id: seedAccountIds["admin"],
      password: encryptPassword("Passw0rd!", seedAccountIds["admin"]),
      username: "admin",
    }),
    stubAccount({
      createdAt: dayjs().subtract(19, "day").toISOString(),
      id: seedAccountIds["dummy"],
      password: encryptPassword("Passw0rd@", seedAccountIds["dummy"]),
      username: "dummy",
    }),
  ];

  return new Map(accountList.map((a) => [a.id, a]));
};

export const seededAccountMap = seedAccounts();
export const seededAccountList = Array.from(seededAccountMap.values());
