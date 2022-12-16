import axios from "axios";

import type { AxiosError } from "axios";

/**
 * Assert that an unknown error derives from 'Error' (changes type after function call)
 *
 * Use to ensure that 'unknown' errors from try/catch blocks are actually derived from 'Error' class,
 *   to prevent invalidly accessing standard error properties (ie. 'message'). Invalid errors will
 *   be thrown as-is, and caught by the NestJS unhandled exception handler.
 *
 * @param  error - Unknown error shape
 * @throws Original error if not derived from 'Error' class
 *
 * @example
 * try {
 *   ...
 * } catch (e: unknown) {
 *   assertError(e);  // Will assert that 'e' is an 'Error' or throw otherwise
 *   console.log(e.message);
 * }
 */
// NOTE: Strange type syntax is necessary to fix 'Assertions require every name in the call...' error
//         when using "standard" TS assertion typing (ie. on right side of function vs left).
// Source: https://github.com/microsoft/TypeScript/pull/33622#issuecomment-575301357
export const assertError: (error: unknown) => asserts error is Error = (error: unknown) => {
  if (!(error instanceof Error)) {
    // TODO: Determine whether this actually makes sense, as it will effectively throw errors with 'catch'
    //         clauses which will not be handled in the same way as the server!
    throw error;
  }
};

/**
 * Type guard utility to detect Axios errors with type safety
 *
 * @param   error - Unkown error shape
 * @returns Whether error is an Axios error (with type safety)
 *
 * @source https://github.com/axios/axios/issues/3612#issuecomment-1198490390
 * @example
 * if (isAxiosError(error)) {
 *   const status = error.response?.statusCode;  // TS will acknowledge that 'error' is an 'AxiosError'
 * }
 */
export const isAxiosError = <ResponseType>(error: unknown): error is AxiosError<ResponseType> => {
  return axios.isAxiosError(error);
};
