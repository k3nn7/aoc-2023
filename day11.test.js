const {part1, part2, add} = require('./day11');

describe('day11', () => {
  const input = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

  test('part1', () => {
    expect(part1(input)).toBe(374);
  });

  test('part2', () => {
    expect(part2(input, 9)).toBe(1030);
  });
});
