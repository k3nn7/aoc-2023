const {part1, part2} = require('./day10');

describe('day10', () => {
  const input = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

  const input2 = `.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...`;

  test('part1', () => {
    expect(part1(input)).toBe(8);
  });

  test('part2', () => {
    expect(part2(input2)).toBe(8);
  });
});
