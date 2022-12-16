import dayjs from "dayjs";
import jsonServer from "json-server";

import { getAccountByCredentials, retrieveBasicAuth } from "./auth";
import { createDatabase } from "./database";
import { configureAuthenticatedRoutes, configureUnauthenticatedRoutes } from "./routes";

import type { Database } from "./database";

export type DatabaseLowdb = ReturnType<typeof jsonServer.router<Database>>["db"];
export type Server = ReturnType<typeof jsonServer.create>;

const database = createDatabase();

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const router = jsonServer.router(database);
const port = 5001;

// Default middleware include logging, static content, cors, etc
server.use(middlewares);
server.use(jsonServer.bodyParser);

configureUnauthenticatedRoutes(server, router.db);

// Require basic authentication for all routes
server.use((req, res, next) => {
  const credentials = retrieveBasicAuth(req.headers as Record<string, string>);
  if (!credentials) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  const account = getAccountByCredentials(router.db, credentials.username, credentials.password);
  if (!account) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  next();
});

configureAuthenticatedRoutes(server, router.db);

// Set 'updatedAt' field when modifying entities
server.use((req, res, next) => {
  if (["PATCH", "PUT"].includes(req.method)) {
    req.body.updatedAt = dayjs().toISOString();
  }

  next();
});

// TODO: Limit routes to only resources that the user "owns", potentially by ensuring
//         that a query filter was set matching user ID?

(router as any).render = (req: any, res: any) => {
  // Pagination will only be triggered (by 'json-server') if '_page' was requested in query!
  const headers = res.getHeaders();
  const paginationTotal = headers["x-total-count"]?.value();
  if (paginationTotal !== undefined && res.locals.pagination) {
    return res.json({
      data: res.locals.data,
      pagination: res.locals.pagination,
    });
  }

  return res.json(res.locals.data);
};

// NOTE: Route redirections must come before 'server.use(router)'!
server.use(jsonServer.rewriter({}));

server.use(router);
server.listen(port, () => {
  console.log(`⚡ JSON server is running on port '${port}'`);
  console.log(`Server: http://localhost:${port}`);
});
