import type { Collection } from "./collection.types";

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
  username: string;
  collection?: Collection;
}
