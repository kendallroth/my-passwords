import { EntityBase, stubEntity } from "@common/entity";

import type { Collection } from "../collection/collection.entity";

export class Password extends EntityBase {
  accountId!: string;
  collectionId!: string | null;
  name!: string;
  username!: string;
  password!: string;
  starredAt!: string | null;
  requirePassword!: boolean;
  notes!: string | null;

  collection?: Collection | null;
}

export const stubPassword = stubEntity<Password>;
