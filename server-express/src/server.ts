import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import HttpStatus from "http-status";

import { accountRouter } from "@resources/account/account.controller";
import { collectionRouter } from "@resources/collection/collection.controller";
import { passwordRouter } from "@resources/password/password.controller";

import { requestLogger } from "./middleware/logger.middleware";

const port = 5001;

const server = express();

server.use(bodyParser.json());
server.use(cors());
server.use(requestLogger);

server.get("/", (req, res) => {
  res.status(HttpStatus.OK).send();
});

server.use("/account", accountRouter);
server.use("/collection", collectionRouter);
server.use("/password", passwordRouter);

server.listen(port, () => {
  console.log(`⚡ Server is running on port '${port}'`);
  console.log(`Server: http://localhost:${port}`);
});
