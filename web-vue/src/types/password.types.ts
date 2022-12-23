import type { Collection } from "./collection.types";

export type PasswordStrength = "none" | "weak" | "average" | "strong" | "exceptional";

export class PasswordStats {
  color!: string;
  strength!: PasswordStrength;
  score!: number;
}

export interface Password {
  id: string;
  createdAt: string;
  accountId: string;
  collectionId: string | null;
  name: string;
  notes: string | null;
  password: string;
  requirePassword: boolean;
  starredAt: string | null;
  stats: PasswordStats;
  username: string;
  collection?: Collection;
}
