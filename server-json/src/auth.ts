import { decryptPassword } from "./utilities/password";

import type { Account } from "./entities";
import type { DatabaseLowdb } from "./server";

export const getAccount = (db: DatabaseLowdb, username: string): Account | null => {
  return (
    db
      .get("accounts")
      .find((a) => a.username === username)
      .value() ?? null
  );
};

export const getAccountByCredentials = (
  db: DatabaseLowdb,
  username: string,
  password: string,
): Account | null => {
  const account = getAccount(db, username);
  if (!account) return null;

  return checkCredentials(account, password) ? account : null;
};

export const checkCredentials = (account: Account, password: string): boolean => {
  return decryptPassword(account.password, account.id) === password;
};

export const retrieveBasicAuth = (
  headers: Record<string, string>,
): { username: string; password: string } | null => {
  const { authorization: authorizationRaw } = headers;
  if (!authorizationRaw) return null;

  const [, authorizationString] = authorizationRaw.split(" ");
  if (!authorizationString) return null;

  const credentialString = Buffer.from(authorizationString, "base64").toString();
  const [username, password] = credentialString.split(":");
  if (!username || !password) return null;

  return { username, password };
};
