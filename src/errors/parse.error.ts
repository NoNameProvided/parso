export class ParsoParseError extends Error {

  public readonly name: string = 'ParsoParseError';
  
  constructor(value: string | number | Date) {
    super(`Could not parse ${value} into a Date representation!`);
  }
}