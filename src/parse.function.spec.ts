/* eslint-disable @typescript-eslint/no-explicit-any */

import { parse } from './parse.function';
import { ParsoInvalidInputError } from './errors/invalid-input.error';

describe('parse function', () => {
  it('should return a new Date with same value when a Date instance is passed', () => {
    const intialDate = new Date('2019-01-01');
    const returnValue = parse(intialDate);

    expect(returnValue.getTime()).toBe(intialDate.getTime());
    expect(returnValue).not.toBe(intialDate);
  });

  it('should throw error when a not a number, string or Date is recieved', () => {
    expect(() => parse('invalid')).not.toThrowError();
    expect(() => parse(43242343)).not.toThrowError();
    expect(() => parse(new Date('2019-01-01'))).not.toThrowError();

    expect(() => parse(null)).toThrowError(ParsoInvalidInputError);
    expect(() => parse(undefined)).toThrowError(ParsoInvalidInputError);
    expect(() => parse({} as any)).toThrowError(ParsoInvalidInputError);
    expect(() => parse(Date as any)).toThrowError(ParsoInvalidInputError);
  });

  it('should return error when recieved value cannot be parsed', () => {
    expect(parse('invalid')).toBe(null);
  });

  it('should respect the parseOptions.handleNumberAsEpoch option', () => {
    const epochValue = 1546300800000; // 2019-01-01
    const parsed = parse(epochValue, { handleNumberAsEpoch: true });

    expect(parsed).toBeInstanceOf(Date);
    expect(parsed.getTime()).toBe(epochValue);
  });
});
