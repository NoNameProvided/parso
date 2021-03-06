import { ParseOptions } from './interfaces/parse-options.interface';
import { ParsoInvalidInputError } from './errors/invalid-input.error';
import { defaulParserRegistry } from './parser-registry.class';

/**
 * Tries to parse the recieved value into a `Date` object with the registered parsers,
 * returns null if the parsing attempt fails.
 *
 * @param value any string or number to parse into a Date
 * @param parseOptions
 */
export function parse(value: string | number | Date, parseOptions: ParseOptions = {}): Date | null {
  if (value instanceof Date) {
    /** For better developer UX Parso accepts Date objects, but immediatelly returns a clone of them. */
    return new Date(value);
  }

  /** If the recieved value is not string, number or Date, then Parso cannot process it. */
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new ParsoInvalidInputError(value);
  }

  /**
   * When `handleNumberAsEpoch` is set to true we treat numbers as millisecond values.
   */
  if (typeof value == 'number' && parseOptions.handleNumberAsEpoch === true) {
    return new Date(value);
  }

  const currentParsers = parseOptions.customRegistry ? parseOptions.customRegistry.parsers : defaulParserRegistry.parsers;

  const firstWorkingParser = currentParsers.find(parser => parser(value) !== undefined);

  if (firstWorkingParser) {
    return firstWorkingParser(value);
  }

  return null;
}
