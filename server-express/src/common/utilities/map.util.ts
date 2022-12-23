/** Convert a Map to an Array */
export const mapToArray = <T>(map: Map<string, T>): T[] => {
  return Array.from(map.values());
};
