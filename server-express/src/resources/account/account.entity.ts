import { EntityBase, stubEntity } from "@common/entity/base.entity";

export class Account extends EntityBase {
  username!: string;
  /** Passwords must be encoded before being saved! */
  password!: string;
}

export const stubAccount = stubEntity<Account>;
