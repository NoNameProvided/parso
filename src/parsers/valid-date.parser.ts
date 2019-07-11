import { DateParser } from '../interfaces/date-parser.type';

/**
 * Parses a valid date string.
 */
export const validDateParser: DateParser = (value: string | number): Date | undefined => {
  const invalidDate = Number.isNaN(new Date(value).getTime());

  return invalidDate ? undefined : new Date(value);
};
