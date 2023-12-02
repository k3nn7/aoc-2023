const {part1, part2} = require('./day1');

describe('day1', () => {
  test("part1", () => {
    input = 
`1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;

    const result = part1(input);
    expect(result).toBe(142);
  });

  test("part2", () => {
    input = 
`two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;

    const result = part2(input);
    expect(result).toBe(281);
  });
});
