import { getAccountByCredentials } from "./auth";

import type { DatabaseLowdb, Server } from "./server";

export const configureUnauthenticatedRoutes = (server: Server, database: DatabaseLowdb) => {
  server.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const account = getAccountByCredentials(database, username, password);
    console.log(account);
    if (!account) {
      return res.status(401).json({ message: "Unauthenticated" });
    }

    const token = Buffer.from(`${username}:${password}`).toString("base64");
    return res.status(200).json({ account, token });
  });
};

export const configureAuthenticatedRoutes = (server: Server, database: DatabaseLowdb) => {
  // TODO
};
