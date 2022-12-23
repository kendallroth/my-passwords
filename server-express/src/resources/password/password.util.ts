import { passwordStrength } from "check-password-strength";
import { AES, enc } from "crypto-js";

import type { PasswordStats, PasswordStrength } from "./password.entity";

export const encryptPassword = (rawPassword: string, key: string): string => {
  return AES.encrypt(rawPassword, key).toString();
};

export const decryptPassword = (encryptedPassword: string, key: string): string => {
  return AES.decrypt(encryptedPassword, key).toString(enc.Utf8);
};

export const checkPasswordStrength = (rawPassword: string): PasswordStats => {
  const strengthResult = passwordStrength(rawPassword);

  const passwordStrengthMap: Record<
    number,
    { code: PasswordStrength; color: string; minScore: number }
  > = {
    0: { code: "none", color: "#f44336", minScore: 0 },
    1: { code: "weak", color: "#ff5722", minScore: 25 },
    2: { code: "average", color: "#ff9800", minScore: 50 },
    3: { code: "strong", color: "#8bc34a", minScore: 75 },
    4: { code: "exceptional", color: "#4caf50", minScore: 100 },
  };
  const strengthConfig = passwordStrengthMap[strengthResult.id] ?? "none";

  // Calculate offset between numbers from 0 - 100
  const offset = Math.floor(100 / Object.keys(passwordStrengthMap).length);
  const minScore = offset * strengthResult.id;

  // TODO: Calculate actual score based on something else???

  return {
    color: strengthConfig.color,
    score: strengthResult.id + 1,
    strength: strengthConfig.code,
  };
};
