import type { Account } from "@resources/account/account.entity";

// NOTE: Type overrides should use a module directory layout
// https://www.npmjs.com/package/ts-node#missing-types

declare global {
  namespace Express {
    export interface Request {
      account?: Account;
    }
  }
}
