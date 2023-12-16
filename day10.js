let ground = [];

function part1(input) {
  ground = input.split('\n');
  const sPos = getS();
  const startPositions = [
    [sPos[0]-1, sPos[1]-1],
    [sPos[0]-1, sPos[1]],
    [sPos[0]-1, sPos[1]+1],
    [sPos[0], sPos[1]-1],
    [sPos[0], sPos[1]+1],
    [sPos[0]+1, sPos[1]-1],
    [sPos[0]+1, sPos[1]],
    [sPos[0]+1, sPos[1]+1],
  ];

  let longest = 0;
  for (const startPosition of startPositions) {
    const len = loopLength(sPos, startPosition);
    if (len > longest) longest = len;
  }

  return parseInt(longest / 2);
}

function getS() {
  for (let row = 0; row < ground.length; row++) {
    for (let col = 0; col < ground[0].length; col++) {
      if (ground[row][col] === 'S') return [row, col];
    }
  }
}

function loopLength(previous, current) {
  let length = 0;

  while (true) {
    const currentValue = getValue(current);

    if (currentValue === '.') return -1;

    length++;
    if (currentValue === 'S') break;

    const next = getNext(previous, current);
    if (!next) return -1;

    previous = current;
    current = next;
  }

  return length;
}

function part2(input) {
}

function getValue([row, col]) {
  if (row < 0 || col < 0) return '.';
  if (row === ground.length || col === ground[0].length) return '.';

  return ground[row][col];
}

function getNext(previous, current) {
  const [row, col] = current;
  const [prevRow, prevCol] = previous;
  const currentValue = getValue(current);

  switch (currentValue) {
    case 'S':
      return current;
    case '.':
      return current;
    case '|':
      if (prevRow < row) return [row + 1, col];
      return [row - 1, col];
    case '-':
      if (prevCol < col) return [row, col + 1];
      return [row, col - 1];
    case 'L':
      if (prevRow < row) return [row, col + 1];
      return [row - 1, col];
    case 'J':
      if (prevRow < row) return [row, col - 1];
      return [row - 1, col];
    case 'F':
      if (prevRow > row) return [row, col + 1];
      return [row + 1, col];
    case '7':
      if (prevRow > row) return [row, col - 1];
      return [row + 1, col];
    default:
      return null;
  }
}

module.exports = {part1, part2};
