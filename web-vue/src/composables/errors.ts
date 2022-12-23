import { isAxiosError } from "@utilities";

// Default error that will be used when no error message is found
const DEFAULT_ERROR_MESSAGE = "An unknown error occurred";

/**
 * Get an error message from an error
 *
 * @param   error          - Error object/string
 * @param   defaultMessage - Default error message
 */
const getError = (error: unknown, defaultMessage?: string): string => {
  if (!error) {
    return "";
  }

  const errorMessage = getErrorMessage(error);
  if (!errorMessage) {
    return defaultMessage ?? DEFAULT_ERROR_MESSAGE;
  }

  return errorMessage;
};

/**
 * Get an error code string from an error (for UI error checks)
 *
 * @param   error - Error object/string
 */
const getErrorCode = (error: unknown): string | null => {
  if (!isAxiosError(error)) {
    return null;
  }

  // API errors are returned in an interesting nested format
  if (error?.response?.data) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (error.response.data as any).code;
  }

  return null;
};

/**
 * Get an error message from an error
 *
 * @param   error - Error object/string
 */
const getErrorMessage = (error: unknown): string | null => {
  if (!error) {
    return null;
  }

  // Errors are often provided as an object, but the message 'key' may vary
  if (typeof error === "object") {
    const errorObject = error as any;
    // API errors are returned in an interesting nested format
    let message = errorObject.message;
    if (errorObject?.response?.data) {
      message = errorObject.response.data?.message;
      return Array.isArray(message) ? message[0] : message;
    }

    // 'message' key should always be checked last (most common, likely not set manually)
    if (message) {
      return message;
    }
  }
  // A bare error code may be provided instead of an error object
  else if (typeof error === "string") {
    return error;
  }

  return null;
};

/**
 * Determine whether an error includes a specific error code string
 *
 * @param   error           - Error object/string
 * @param   targetErrorCode - Target error code
 */
const hasError = (error: unknown, targetErrorCode: string): boolean => {
  if (!error) {
    return false;
  }

  const errorCode = getErrorCode(error);
  if (!errorCode) {
    return false;
  }

  return errorCode === targetErrorCode;
};

/**
 * Determine whether an error includes a specific error status code number
 *
 * @param   error           - Error object/string
 * @param   targetErrorStatus - Target error status code
 */
const hasStatusCode = (error: unknown, targetErrorStatus: number): boolean => {
  if (!isAxiosError(error)) {
    return false;
  }

  return error.response?.status === targetErrorStatus;
};

const useErrors = () => {
  return {
    getError,
    getErrorCode,
    getErrorMessage,
    hasError,
    hasStatusCode,
  };
};

export { useErrors };
