import { overrideObject } from "../override.util";

describe("overrideObject", () => {
  describe("flat objects", () => {
    const base = { key: "old value", other: "value" };

    test("overrides valid keys", () => {
      const override = { key: "new value" };

      const merged = overrideObject(base, override);

      expect(merged).toStrictEqual({
        key: "new value",
        other: "value",
      });
    });

    test("ignores additional keys", () => {
      const override = { key: "new value", extra: "key" };

      const merged = overrideObject(base, override);

      expect(merged).toStrictEqual({
        key: "new value",
        other: "value",
      });
    });

    test("can add additional keys", () => {
      const override = { key: "new value", extra: "key" };

      const merged = overrideObject(base, override, false);

      expect(merged).toStrictEqual({
        key: "new value",
        extra: "key",
        other: "value",
      });
    });

    test("does not mutate base object", () => {
      const override = { key: "new value" };

      overrideObject(base, override);

      expect(base.key).toBe("old value");
    });
  });

  describe("nested objects", () => {
    const base = {
      key: "old value",
      other: "value",
      child: {
        sub: "old child",
        other: "child value",
      },
    };

    test("overrides valid keys", () => {
      const override = { key: "new value", child: { sub: "new child" } };

      const merged = overrideObject(base, override);

      expect(merged).toStrictEqual({
        key: "new value",
        other: "value",
        child: {
          sub: "new child",
          other: "child value",
        },
      });
    });

    test("ignores additional keys", () => {
      const override = {
        key: "new value",
        extra: "key",
        child: { sub: "new child", extra: "key" },
      };

      const merged = overrideObject(base, override);

      expect(merged).toStrictEqual({
        key: "new value",
        other: "value",
        child: {
          sub: "new child",
          other: "child value",
        },
      });
    });

    test("can add additional keys", () => {
      const override = {
        key: "new value",
        extra: "key",
        child: { sub: "new child", extra: "key" },
      };

      const merged = overrideObject(base, override, false);

      expect(merged).toStrictEqual({
        key: "new value",
        extra: "key",
        other: "value",
        child: {
          extra: "key",
          sub: "new child",
          other: "child value",
        },
      });
    });
  });
});
