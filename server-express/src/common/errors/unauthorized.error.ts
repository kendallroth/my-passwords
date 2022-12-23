import { BaseError } from "./base.error";

/** Internal error to indicate authentication issue */
export class UnauthorizedError extends BaseError {
  constructor(message = "Unauthenticated") {
    super(message);
  }
}
