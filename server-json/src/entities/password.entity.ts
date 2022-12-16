import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { createList } from "../utilities/list.util";
import { encryptPassword } from "../utilities/password";
import { getRandomFromList, getRandomFromRange } from "../utilities/random.util";
import { capitalizeWords } from "../utilities/string.util";
import { seedAccountIds, seededAccountList } from "./account.entity";
import { EntityBase, stubEntity } from "./base.entity";
import { seedCollectionIds, seededCollectionList } from "./collection.entity";

export class Password extends EntityBase {
  accountId!: string;
  collectionId!: string | null;
  name!: string;
  username!: string;
  password!: string;
  starredAt!: string | null;
  requirePassword!: boolean;
  notes!: string | null;
}

export const stubPassword = stubEntity<Password>;

export const seedPasswordIds = {
  admin_work_email: "0c9cd111-d55c-4c21-b1c0-9af21700c716",
  admin__movies: "98eb6697-2de7-4ed1-ba70-0f425ae961be",
};

const seedPasswords = (): Map<string, Password> => {
  const randomPasswords = createList<Password>(50, () => {
    const randomAccount = getRandomFromList(seededAccountList);

    return stubPassword({
      accountId: randomAccount.id,
      collectionId: getRandomFromList([...seededCollectionList, null])?.id ?? null,
      name: capitalizeWords(faker.word.noun()),
      notes: getRandomFromList([null, faker.lorem.words(getRandomFromRange(5, 20))]),
      password: encryptPassword(
        faker.internet.password(getRandomFromRange(8, 24)),
        randomAccount.id,
      ),
      requirePassword: getRandomFromList([true, false]),
      starredAt: getRandomFromList([null, null, null, dayjs().toISOString()]),
      username: faker.internet.email(),
    });
  });

  const passwordList: Password[] = [
    stubPassword({
      createdAt: dayjs().subtract(32, "day").toISOString(),
      accountId: seedAccountIds["admin"],
      collectionId: seedCollectionIds["admin_work"],
      name: "Email",
      notes: null,
      password: encryptPassword("Passw0rd!", seedAccountIds["admin"]),
      requirePassword: false,
      starredAt: dayjs().subtract(2, "day").toISOString(),
      username: "admin@example.com",
    }),
    stubPassword({
      createdAt: dayjs().subtract(17, "day").toISOString(),
      accountId: seedAccountIds["admin"],
      collectionId: null,
      name: "Movies",
      notes: "Some notes about this password",
      password: encryptPassword("Sampl3!", seedAccountIds["admin"]),
      requirePassword: true,
      starredAt: null,
      username: "test@example.com",
    }),
    ...randomPasswords,
  ];

  return new Map(passwordList.map((p) => [p.id, p]));
};

export const seededPasswordMap = seedPasswords();
export const seededPasswordList = Array.from(seededPasswordMap.values());
