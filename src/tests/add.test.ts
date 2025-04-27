import { add } from './add';

describe('add function test', () => {
  it('should return sum of a and b', () => {
    const a = 5;
    const b = 3;

    const answer = 9;

    expect(add(a, b)).toBe(answer);
  });
});
