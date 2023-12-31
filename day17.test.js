const {part1, part2, MinPQ} = require('./day17');

describe('day17', () => {
  const input = `2413432311323
3215453535623
3255245654254
3446585845452
4546657867536
1438598798454
4457876987766
3637877979653
4654967986887
4564679986453
1224686865563
2546548887735
4322674655533`;

  const input2 = `111111111111
999999999991
999999999991
999999999991
999999999991`;

  test('heap', () => {
    const h = new MinPQ();
    h.add('a', 10);
    h.add('b', 8);
    h.add('c', 12);
    h.add('d', 3);

    expect(h.peek()).toBe('d');
    expect(h.removeMin()).toBe('d');
    expect(h.removeMin()).toBe('b');
    expect(h.removeMin()).toBe('a');
    expect(h.removeMin()).toBe('c');

    h.add('a', 10);
    h.add('b', 8);
    h.add('c', 12);
    h.add('d', 3);
    expect(h.removeMin()).toBe('d');
    h.add('f', 5);
    expect(h.removeMin()).toBe('f');
    h.update('a', 7);
    expect(h.removeMin()).toBe('a');
    expect(h.removeMin()).toBe('b');
    expect(h.removeMin()).toBe('c');
  });

  test('part1', () => {
    expect(part1(input)).toBe(102);
  });

  test('part2', () => {
    expect(part2(input)).toBe(94);
    expect(part2(input2)).toBe(71);
  });
});
