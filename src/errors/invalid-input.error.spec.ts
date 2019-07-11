import { ParsoInvalidInputError } from './invalid-input.error';

describe('ParsoInvalidInputError', () => {
  it('should be instance of Error', () => {
    expect(new ParsoInvalidInputError('test-val') instanceof Error).toBe(true);
  });

  it('should have name ParsoInvalidInputError on prototype', () => {
    expect(ParsoInvalidInputError.name).toEqual('ParsoInvalidInputError');
  });

  it('should have name ParsoInvalidInputError on instance', () => {
    expect(new ParsoInvalidInputError('test-val').name).toEqual('ParsoInvalidInputError');
  });

  it('should store the recieved value on "recievedValue" property', () => {
    expect(new ParsoInvalidInputError('test-val').recievedValue).toEqual('test-val');
  });
});
