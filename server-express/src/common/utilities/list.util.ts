export const createList = <T>(amount: number, createItem: (idx: number) => T): T[] => {
  return new Array(amount).fill(0).map((_, idx) => createItem(idx));
};
