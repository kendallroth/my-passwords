import { seededAccountList, seededCollectionList, seededPasswordList } from "./entities";

import type { Account, Collection, Password } from "./entities";

export interface Database {
  accounts: Account[];
  collections: Collection[];
  passwords: Password[];
}

export const createDatabase = (): Database => {
  return {
    accounts: seededAccountList,
    collections: seededCollectionList,
    passwords: seededPasswordList,
  };
};
