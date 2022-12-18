import { AES, enc } from "crypto-js";

export const encryptPassword = (rawPassword: string, key: string): string => {
  return AES.encrypt(rawPassword, key).toString();
};

export const decryptPassword = (encryptedPassword: string, key: string): string => {
  return AES.decrypt(encryptedPassword, key).toString(enc.Utf8);
};
