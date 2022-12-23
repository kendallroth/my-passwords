import { isArray, isBoolean, isObject } from "../type-checks.util";

describe("type checks", () => {
  describe("isArray", () => {
    const cases = [
      { result: true, value: [] },
      { result: true, value: [true, false] },
      { result: false, value: "true,false" },
      { result: false, value: null },
    ];

    test.each(cases)(".isArray($value)", ({ result, value }) => {
      expect(isArray(value)).toBe(result);
    });
  });

  describe("isBoolean", () => {
    const cases = [
      { result: true, value: true },
      { result: true, value: false },
      { result: false, value: null },
      { result: false, value: "true" },
      { result: false, value: 1 },
    ];

    test.each(cases)(".isBoolean($value)", ({ result, value }) => {
      expect(isBoolean(value)).toBe(result);
    });
  });

  describe("isObject", () => {
    const cases = [
      { result: true, value: {} },
      { result: true, value: { key: "value" } },
      { result: false, value: null },
      { result: false, value: [] },
    ];

    test.each(cases)(".isObject($value)", ({ result, value }) => {
      expect(isObject(value)).toBe(result);
    });
  });
});
