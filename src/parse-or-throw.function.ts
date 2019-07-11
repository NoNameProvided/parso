import { ParseOptions } from './interfaces/parse-options.interface';
import { ParsoParseError } from './errors/parse.error';
import { parse } from './parse.function';

/**
 * Tries to parse the recieved value into a `Date` object with the registered parsers,
 * throws an instance of `ParsoParseError` error if the parsing attempt fails.
 *
 * @param value any string or number to parse into a Date
 * @param parseOptions
 */
export function parseOrThrow(value: string | number | Date, parseOptions: ParseOptions): Date {
  const parseResult = parse(value, parseOptions);

  if (parseResult == null) {
    throw new ParsoParseError(value);
  }

  return parseResult;
}
