import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import { createList } from "@common/utilities/list.util";
import { getRandomFromList, getRandomFromRange } from "@common/utilities/random.util";
import { capitalizeWords } from "@common/utilities/string.util";
import { seedCollectionIds, seededCollectionList } from "@resources/collection/collection.seed";

import { seedAccountIds, seededAccountList } from "../account/account.seed";
import { stubPassword } from "./password.entity";
import { encryptPassword } from "./password.util";

import type { Password } from "./password.entity";

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
      username: faker.internet.email().toLowerCase(),
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
