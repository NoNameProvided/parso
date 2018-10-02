import { ParsoParseError } from './parse.error';

describe('ParsoParseError', () => {

  it('should be instance of Error', () => {
    expect(new ParsoParseError('xxx') instanceof Error).toBe(true);
  });

  it('should have name ParsoParseError on prototype', () => {
    expect(ParsoParseError.name).toEqual('ParsoParseError');
  });

  it('should have name ParsoParseError on instance', () => {
    expect(new ParsoParseError('xxx').name).toEqual('ParsoParseError');
  });
})