/** Clone an object (removes database references) */
export const cloneObject = <T>(input: T): T => ({ ...input });

/** Clone an array of objects (removes database references) */
export const cloneArray = <T>(input: T[]): T[] => input.map(cloneObject);
