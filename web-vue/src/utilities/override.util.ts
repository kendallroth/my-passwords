import { isObject } from "./type-checks.util";

/**
 * Override a base object with partial object
 *
 * TODO: Investigate supporting 'Partial<T>' for overrides (cannot get it to work yet...)
 *
 * @param   base        - Base object (defines shape)
 * @param   override    - Override object
 * @param   limitToBase - Whether to limit to keys existing on base object
 * @returns Overidden base object
 */
export const overrideObject = <T extends object>(base: T, override: any, limitToBase = true): T => {
  const merged = { ...base };

  Object.keys(override).forEach((key) => {
    // Prevent overriding keys that do not exist on the base object
    if (limitToBase && !Object.prototype.hasOwnProperty.call(base, key)) {
      return;
    }

    const baseValue = base[key as keyof T];
    let overrideValue = override[key as keyof T];

    if (isObject(baseValue)) {
      overrideValue = overrideObject(baseValue, overrideValue, limitToBase);
    }

    // Necessary because TypeScript cannot associate keys to appropriate values
    // @ts-ignore
    merged[key] = overrideValue;
  });

  return merged;
};
