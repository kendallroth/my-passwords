import { Low as LowDB, Memory as MemoryAdapter } from "lowdb";

import { seededAccountMap } from "@resources/account/account.seed";
import { seededCollectionMap } from "@resources/collection/collection.seed";
import { seededPasswordMap } from "@resources/password/password.seed";

import type { Account } from "@resources/account/account.entity";
import type { Collection } from "@resources/collection/collection.entity";
import type { Password } from "@resources/password/password.entity";

export interface Database {
  accounts: Map<string, Account>;
  collections: Map<string, Collection>;
  passwords: Map<string, Password>;
}

const createDatabase = (): LowDB<Database> => {
  const adapter = new MemoryAdapter<Database>();
  const database = new LowDB(adapter);

  database.data = {
    accounts: seededAccountMap,
    collections: seededCollectionMap,
    passwords: seededPasswordMap,
  };

  database.write();
  return database;
};

export default createDatabase();
