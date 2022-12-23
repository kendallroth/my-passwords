/* eslint @typescript-eslint/no-explicit-any: off */

export const isBoolean = (value: any): boolean => {
  return value === true || value === false;
};

export const isArray = (value: any): boolean => {
  return Array.isArray(value);
};

export const isObject = (value: any): value is object => {
  return typeof value === "object" && !isArray(value) && value !== null;
};
