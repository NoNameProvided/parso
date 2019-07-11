/* eslint-disable @typescript-eslint/no-explicit-any */

import { parseOrThrow } from './parse-or-throw.function';
import * as innerParse from './parse.function';

describe('parseOrThrow function', () => {
  it('should call the "parse" function with same parameters', () => {
    const value = new Date('2019-01-01');
    const options: any = { mockSettings: true };
    /** Mock the imported inner function */
    const mock = jest.fn(() => value);
    const originalImplementation = innerParse.parse;

    (innerParse as any).parse = mock;
    parseOrThrow(value, options);

    expect(innerParse.parse).toBeCalledWith(value, options);

    /** Re-add the original implementation to prevent breaking the other tests. */
    (innerParse as any).parse = originalImplementation;
  });

  it('should return with the result of the "parse" function', () => {
    const mock = jest.fn(() => 'parse-function-return-value');
    const originalImplementation = innerParse.parse;

    (innerParse as any).parse = mock;
    parseOrThrow('anything');

    expect(innerParse.parse).toReturnWith('parse-function-return-value');

    (innerParse as any).parse = originalImplementation;
  });

  it('should throw error when "parser" function return null', () => {
    const mock = jest.fn(() => null);
    const originalImplementation = innerParse.parse;

    (innerParse as any).parse = mock;

    expect(() => parseOrThrow('anything')).toThrowErrorMatchingInlineSnapshot(`"[Parso] Could not parse \\"anything\\" into a Date!"`);
    expect(innerParse.parse).toReturnWith(null);

    (innerParse as any).parse = originalImplementation;
  });

  it('should throw error when non-parsable value recieved', () => {
    expect(() => parseOrThrow('you-will-never-parse-me')).toThrowErrorMatchingInlineSnapshot(
      `"[Parso] Could not parse \\"you-will-never-parse-me\\" into a Date!"`
    );
  });
});
