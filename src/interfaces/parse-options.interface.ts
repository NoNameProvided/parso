
/**
 * Optional options provided to the `parse` and `parseOrThrow` functions.
 */
export interface ParseOptions { 

  /**
   * When set to `true` numbers will be recognized as an epoch reference date in milliseconds.
   * 
   * Default: `false`
   */
  handleNumberAsEpoch: boolean;

  /**
   * When set to `true` an instance of `ParsoParseError` will be thrown when the parsing of a value has failed. 
   * (Note: This option is ingored when using `parseOrThrow`.)
   * 
   * Default: `false`
   */
  throwOnFail: boolean;
}