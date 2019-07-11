import { ParsoParseError } from './parse.error';

describe('ParsoParseError', () => {
  it('should be instance of Error', () => {
    expect(new ParsoParseError('test-val') instanceof Error).toBe(true);
  });

  it('should have name ParsoParseError on prototype', () => {
    expect(ParsoParseError.name).toEqual('ParsoParseError');
  });

  it('should have name ParsoParseError on instance', () => {
    expect(new ParsoParseError('test-val').name).toEqual('ParsoParseError');
  });

  it('should store the recieved value on "recievedValue" property', () => {
    expect(new ParsoParseError('test-val').recievedValue).toEqual('test-val');
  });
});
