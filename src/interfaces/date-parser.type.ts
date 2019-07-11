/**
 * DateParsers are the building blocks of Parso. They are responsible for
 * parsing only **one** form of a date representation into a `Date` object or return `undefined` otherwise.
 */
export type DateParser = (value: string | number) => Date | undefined;
