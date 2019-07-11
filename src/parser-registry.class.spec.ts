/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { ParserRegistry } from './parser-registry.class';
import { DateParser } from './interfaces/date-parser.type';

describe('ParserRegistry class', () => {
  let registry: ParserRegistry;

  beforeEach(() => {
    registry = new ParserRegistry();
  });

  describe('parsers getter', () => {
    it('should return the stored parsers', () => {
      const parser: DateParser = value => new Date();

      registry.registerParsers(parser);

      expect(registry.parsers).toEqual([parser]);
    });

    it('should return empty array when no parser is registered', () => {
      expect(registry.parsers).toEqual([]);
    });
  });

  describe('hasParsers getter', () => {
    it('should return true when parsers are registered', () => {
      const parser: DateParser = value => new Date();

      registry.registerParsers(parser);

      expect(registry.hasParsers).toBe(true);
    });

    it('should return false when no parser is registered', () => {
      expect(registry.hasParsers).toBe(false);
    });
  });

  describe('registerParsers function', () => {
    it('should store registered date parser', () => {
      const parser: DateParser = value => new Date();

      registry.registerParsers(parser);

      expect(registry.parsers[0]).toBe(parser);
    });

    it('should store date parsers registered in array', () => {
      const parser1: DateParser = value => new Date();
      const parser2: DateParser = value => new Date();

      registry.registerParsers([parser1, parser2]);

      expect(registry.parsers[0]).toBe(parser1);
      expect(registry.parsers[1]).toBe(parser2);
    });

    it('should now allow registering the same parser twice', () => {
      const parser1: DateParser = value => new Date();

      registry.registerParsers(parser1);

      expect(() => registry.registerParsers(parser1)).not.toThrowError();
      expect(registry.parsers.length).toBe(1);
      expect(registry.parsers[0]).toBe(parser1);
    });

    it('should keep the registration order', () => {
      const parser1: DateParser = value => new Date();
      const parser2: DateParser = value => new Date();
      const parser3: DateParser = value => new Date();

      registry.registerParsers(parser1);
      registry.registerParsers([parser2, parser3]);

      expect(registry.parsers[0]).toBe(parser1);
      expect(registry.parsers[1]).toBe(parser2);
      expect(registry.parsers[2]).toBe(parser3);
    });
  });

  describe('removeParser function', () => {
    it('should remove passed single parser when called', () => {
      const parser1: DateParser = value => new Date();
      const parser2: DateParser = value => new Date();

      registry.registerParsers(parser1);
      registry.registerParsers(parser2);
      registry.removeParser(parser1);

      expect(registry.parsers.length).toBe(1);
      expect(registry.parsers[0]).toBe(parser2);
    });

    it('should remove passed array of parsers when called', () => {
      const parser1: DateParser = value => new Date();
      const parser2: DateParser = value => new Date();
      const parser3: DateParser = value => new Date();
      const parser4: DateParser = value => new Date();

      registry.registerParsers([parser1, parser2, parser3, parser4]);

      registry.removeParser([parser1, parser3]);

      expect(registry.parsers.length).toBe(2);
      expect(registry.parsers[0]).toBe(parser2);
      expect(registry.parsers[1]).toBe(parser4);
    });

    it('should do nothing when passed parser is not registered', () => {
      const parser1: DateParser = value => new Date();
      const parser2: DateParser = value => new Date();

      registry.registerParsers(parser1);
      registry.removeParser(parser2);

      expect(registry.parsers.length).toBe(1);
      expect(registry.parsers[0]).toBe(parser1);
    });
  });

  describe('reset function', () => {
    it('should remove all registered parsers when called', () => {
      const parser1: DateParser = value => new Date();
      const parser2: DateParser = value => new Date();

      registry.registerParsers(parser1);
      registry.registerParsers([parser2]);

      expect(registry.parsers.length).toBe(2);

      registry.resetParsers();

      expect(registry.parsers.length).toBe(0);
    });

    it('should do nothing if no parser is registered', () => {
      expect(() => registry.resetParsers()).not.toThrowError();
      expect(registry.parsers.length).toBe(0);
    });
  });
});
