import { DateParser } from './interfaces/date-parser.type';

/**
 * The parser registry, it allows to register custom parsers.
 */
export class ParserRegistry {
  private readonly PARSERS: DateParser[] = [];

  /**
   * Returns an array of registered parsers.
   */
  public get parsers(): DateParser[] {
    return [...this.PARSERS];
  }

  /**
   * Returns `true` if there are registered parsers and `false` otherwise.
   */
  public get hasParsers(): boolean {
    return !!this.PARSERS.length;
  }

  /**
   * Register one or more parsers into the registry.
   *
   * @param singleOrMultipeParser one or an array of parsers implementing the `DateParser` type.
   */
  public registerParsers(singleOrMultipeParser: DateParser | DateParser[]): void {
    if (Array.isArray(singleOrMultipeParser)) {
      this.PARSERS.push(...singleOrMultipeParser);
    } else {
      this.PARSERS.push(singleOrMultipeParser);
    }
  }

  /**
   * Removes one or more parsers by reference.
   *
   * @param singleOrMultipeParser one or an array of parsers implementing the `DateParser` type.
   */
  public removeParser(singleOrMultipeParser: DateParser | DateParser[]): void {
    if (Array.isArray(singleOrMultipeParser)) {
      singleOrMultipeParser.forEach(singleParser => this.internalRemoveParser(singleParser));
    } else {
      this.internalRemoveParser(singleOrMultipeParser);
    }
  }

  private internalRemoveParser(singleParser: DateParser): void {
    const index = this.PARSERS.findIndex(existingParser => existingParser !== singleParser);

    if (index > -1) {
      this.PARSERS.splice(index, 1);
    }
  }

  /**
   * Removes all registered parsers.
   */
  public resetParsers(): void {
    this.PARSERS.splice(0, this.PARSERS.length);
  }
}

/**
 * The defult parser registry. Parso will use the parsers registed in this
 * instance when no custom registry is provided in the options object.
 */
export const defaulParserRegistry = new ParserRegistry();
