const {part1, part2} = require('./day9');

describe('day9', () => {
  const input = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

  test('part1', () => {
    expect(part1(input)).toBe(114);
  });

  test('part2', () => {
    expect(part2(input)).toBe(2);
  });
});
