import type { ISortByObjectSorter } from "fast-sort";

export const getSortParams = <T>(
  sort: string | string[] | undefined,
  validKeys: string[],
  defaultSort?: string | string[],
): ISortByObjectSorter<T>[] => {
  if (!validKeys.length) return [];

  const sortRaw = sort ?? defaultSort;
  const sortListRaw: string[] = Array.isArray(sortRaw) ? sortRaw : sortRaw?.split(",") ?? [];
  const sortList = sortListRaw.filter((s) => validKeys.includes(s.replace("-", "").toLowerCase()));
  if (!sortList.length) return [];

  const sortConfig = sortList.reduce((accum: ISortByObjectSorter<T>[], key) => {
    const direction = key.startsWith("-") ? "desc" : "asc";
    // @ts-ignore
    const sort: ISortByObjectSorter<T> = {
      [direction]: key.replace("-", ""),
    };
    return [...accum, sort];
  }, []);

  return sortConfig;
};
