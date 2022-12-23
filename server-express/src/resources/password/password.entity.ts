import { EntityBase, stubEntity } from "@common/entity";

import type { Collection } from "../collection/collection.entity";

export type PasswordStrength = "none" | "weak" | "average" | "strong" | "exceptional";

export class PasswordStats {
  color!: string;
  strength!: PasswordStrength;
  score!: number;
}

export class Password extends EntityBase {
  accountId!: string;
  collectionId!: string | null;
  name!: string;
  username!: string;
  password!: string;
  starredAt!: string | null;
  requirePassword!: boolean;
  notes!: string | null;
  stats!: PasswordStats;

  collection?: Collection | null;
}

export const stubPassword = stubEntity<Password>;
