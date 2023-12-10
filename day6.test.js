const {part1, part2} = require('./day6');

describe('day6', () => {
    const input = `Time:      7  15   30
Distance:  9  40  200`;

    test('part1', () => {
        expect(part1(input)).toBe(288);
    });

    test('part2', () => {
        expect(part2(input)).toBe(71503);
    });
});