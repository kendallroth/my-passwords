export const getRandomFromList = <T>(list: T[]): T => {
  return list[Math.floor(Math.random() * list.length)];
};

export const getRandomFromRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * max) + min;
};
