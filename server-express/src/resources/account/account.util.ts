import { mapToArray } from "@common/utilities/map.util";

import { decryptPassword } from "../password/password.util";

import type { Account } from "./account.entity";
import type { Database } from "@database";
import type { Low } from "lowdb";

export const getAccount = (db: Low<Database>, email: string, scrub = true): Account | null => {
  const account = mapToArray(db.data!.accounts).find((a) => a.email === email);
  return account ? scrubAccount(account, scrub) : null;
};

export const getAccountById = (db: Low<Database>, id: string, scrub = true): Account | null => {
  const account = mapToArray(db.data!.accounts).find((a) => a.id === id);
  return account ? scrubAccount(account, scrub) : null;
};

/** Obfuscate password from account */
export const scrubAccount = (account: Account, scrub = true): Account => {
  return scrub ? { ...account, password: "SCRUBBED" } : account;
};

export const getAccountByCredentials = (
  db: Low<Database>,
  email: string,
  password: string,
): Account | null => {
  const account = getAccount(db, email, false);
  if (!account) return null;

  return checkCredentials(account, password) ? scrubAccount(account) : null;
};

export const checkCredentials = (account: Account, password: string): boolean => {
  return decryptPassword(account.password, account.id) === password;
};
