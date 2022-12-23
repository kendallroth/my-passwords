import type { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { BadRequestError, NotFoundError, UnauthorizedError } from "@common/errors";

/**
 * Handle converting internal errors to appropriate status codes
 *
 * NOTE: Must be called last as it will not pass errors onto the next handler!
 */
export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  // TODO: Consider logging

  if (error instanceof UnauthorizedError) {
    res.status(httpStatus.UNAUTHORIZED).json({ message: error.message });
  } else if (error instanceof BadRequestError) {
    res.status(httpStatus.BAD_REQUEST).json({ message: error.message });
  } else if (error instanceof NotFoundError) {
    res.status(httpStatus.NOT_FOUND).json({ message: error.message });
  } else {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: "Unknown error occurred", error });
  }
};
