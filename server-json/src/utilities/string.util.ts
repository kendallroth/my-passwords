export const capitalizeWords = (input: string): string =>
  input
    .split(" ")
    .map((w) => w[0].toUpperCase() + w.substring(1))
    .join(" ");
