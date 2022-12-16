import { AxiosError } from "axios";

import { assertError, isAxiosError } from "../errors.util";

describe.concurrent("assertError", () => {
  const validErrors = [{ label: "Error", error: new Error("test") }];

  test.each(validErrors)("does not throw with valid $label", (errorConfig) => {
    try {
      throw errorConfig.error;
    } catch (e: unknown) {
      expect(() => assertError(e)).not.toThrowError();
    }
  });

  test("throws original error for invalid errors", () => {
    const invalidError = "Sample error";

    try {
      throw invalidError;
    } catch (e: unknown) {
      expect(() => assertError(e)).toThrow(invalidError);
    }
  });
});

describe.concurrent("isAxiosError", () => {
  const customAxiosErr = [{ label: "Error", error: new AxiosError("test") }];

  test.each(customAxiosErr)("does not throw with valid $label", (errorConfig) => {
    try {
      throw errorConfig.error;
    } catch (e: unknown) {
      expect(() => isAxiosError(e)).not.toThrowError();
    }
  });

  test("throws original error for invalid errors", () => {
    const invalidError = "Sample error";
    try {
      throw invalidError;
    } catch (e: unknown) {
      expect(isAxiosError(e)).toBe(false);
    }
  });
});
