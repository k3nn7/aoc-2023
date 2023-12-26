const {part1, part2} = require('./day16');

describe('day16', () => {
  const input = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;

  test('part1', () => {
    expect(part1(input)).toBe(46);
  });

  test('part2', () => {
    expect(part2(input)).toBe(51);
  });
});
