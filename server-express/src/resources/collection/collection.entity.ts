import { EntityBase, stubEntity } from "@common/entity";

export class Collection extends EntityBase {
  accountId!: string;
  name!: string;
  icon!: string | null;
}

export const stubCollection = stubEntity<Collection>;
