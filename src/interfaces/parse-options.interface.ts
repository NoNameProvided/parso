import { ParserRegistry } from '../parser-registry.class';

/**
 * Optional options provided to the `parse` and `parseOrThrow` functions.
 */
export interface ParseOptions {
  /**
   * When set to `true` numbers always will be recognized as an epoch reference date in milliseconds.
   *
   * Default: `false`
   */
  handleNumberAsEpoch?: boolean;

  /**
   * When passed in Parso will use this registry instead of the default one.
   *
   * Default: `undefined`
   */
  customRegistry?: ParserRegistry;
}
