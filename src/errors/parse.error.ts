/**
 * Thrown when Parso could not parse the recieved value into Date.
 */
export class ParsoParseError extends Error {
  public readonly name: string = 'ParsoParseError';

  constructor(public recievedValue: string | number | Date) {
    super(`[Parso] Could not parse "${recievedValue}" into a Date!`);
  }
}
