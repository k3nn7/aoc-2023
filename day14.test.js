const {part1, part2} = require('./day14');

describe('day12', () => {
  const input = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

  test('part1', () => {
    expect(part1(input)).toBe(136);
  });

  test('part2', () => {
    expect(part2(input)).toBe(64);
  });
});
