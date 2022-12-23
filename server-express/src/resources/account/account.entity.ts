import { EntityBase, stubEntity } from "@common/entity/base.entity";

export class Account extends EntityBase {
  email!: string;
  /** Passwords must be encoded before being saved! */
  password!: string;
}

export const stubAccount = stubEntity<Account>;
