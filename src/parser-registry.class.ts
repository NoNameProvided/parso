import { DateParser } from './interfaces';

const RESTRICTED_REGISTRY_STORE: DateParser[] = (<any>(global || window))[Symbol('parso-registry')] = [];

/**
 * Static parser registry. 
 */
export class ParserRegistry {
  
  /**
   * Returns the list of registered parsers.
   */
  public static get parsers(): DateParser[] {
    return [...RESTRICTED_REGISTRY_STORE];
  }

  public static get hasParsers(): boolean {
    return !!RESTRICTED_REGISTRY_STORE.length;
  }

  /**
   * Register one or more parsers into the registry.
   * 
   * @param singleOrMultipeParser one or an array of parsers implementing the `DateParser` type.
   */
  public static registerParsers(singleOrMultipeParser: DateParser | DateParser[]): void {
    if(Array.isArray(singleOrMultipeParser)) {
      RESTRICTED_REGISTRY_STORE.push(...singleOrMultipeParser);
    } else {
      RESTRICTED_REGISTRY_STORE.push(singleOrMultipeParser);
    }
  };

  /**
   * Removes one or more parsers by reference.
   * 
   * @param singleOrMultipeParser one or an array of parsers implementing the `DateParser` type.
   */
  public static removeParser(singleOrMultipeParser: DateParser | DateParser[]): void {
    if(Array.isArray(singleOrMultipeParser)) {
      singleOrMultipeParser.forEach(singleParser => this.internalRemoveParser(singleParser));
    } else {
      this.internalRemoveParser(singleOrMultipeParser);
    }
  };

  public static internalRemoveParser(singleParser: DateParser): void {
    const index = RESTRICTED_REGISTRY_STORE.findIndex(existingParser => existingParser !== singleParser);

    if(index > -1) {
      RESTRICTED_REGISTRY_STORE.splice(index, 1);
    }
  };

  /**
   * Removes all registered parsers.
   */
  public static resetParsers(): void {
    // remove elements in place without re-assigning the array
    RESTRICTED_REGISTRY_STORE.splice(0, RESTRICTED_REGISTRY_STORE.length);
  }

}