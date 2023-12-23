const {part1, part2} = require('./day13');

describe('day13', () => {
  test("part1", () => {
    input = 
`#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

    expect(part1(input)).toBe(405);
  });

  test("part2", () => {
    expect(part2(input)).toBe(400);
  });
});
