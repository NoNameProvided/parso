/**
 * Thrown when Parso recieves an invalid input value.
 */
export class ParsoInvalidInputError extends Error {
  public readonly name: string = 'ParsoInvalidInputError';

  constructor(public recievedValue: unknown) {
    super(`[Parso] Invalid input value! Only string, number and Date instances can be passed to the parsers.`);
  }
}
