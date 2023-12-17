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
    const [len, path] = loopLength(sPos, startPosition);
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
  const path = [previous];

  while (true) {
    path.push(current);
    const currentValue = getValue(current);

    if (currentValue === '.') return [-1, path];

    length++;
    if (currentValue === 'S') break;

    const next = getNext(previous, current);
    if (!next) return [-1, path];

    previous = current;
    current = next;
  }

  return [length, path];
}

function part2(input) {
  ground = input.split('\n');
  for (let i = 0; i < ground.length; i++) {
    ground[i] = ground[i].split('');
  }

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
  let longestPath;
  for (const startPosition of startPositions) {
    const [len, path] = loopLength(sPos, startPosition);
    if (len > longest) {
      longest = len;
      longestPath = path;
    }
  }

  ground[sPos[0]][sPos[1]] = segmentForS(longestPath[longestPath.length - 2], longestPath[1]);

  const polygon = {};
  for (const coordinate of longestPath) {
    const value = getValue(coordinate); 
    if (['|', 'L', 'J', 'F', '7'].includes(value)) {
      polygon[`${coordinate[0]}-${coordinate[1]}`] = value;   
    }
  }

  let inside = 0;
  for (let row = 0; row < ground.length; row++) {
    let crosses = 0;
    for (let col = 0; col < ground[row].length; col++) {
      const coord = `${row}-${col}`;
      let value = getValue([row, col]);
      
      if (coord in polygon && ['F', 'L'].includes(value)) {
        const start = value;
        do {
          col++
          value = getValue([row, col]);
        } while (!['7', 'J'].includes(value))
        if (start === 'F' && value === 'J') crosses++;
        if (start === 'L' && value === '7') crosses++;
      } else if (coord in polygon) {
        crosses++;
      } else if (crosses % 2 !== 0) {
        inside++;
      }
    }
  }

  return inside;
}

function getValue([row, col]) {
  if (row < 0 || col < 0) return '.';
  if (row === ground.length || col === ground[0].length) return '.';

  return ground[row][col];
}

function segmentForS([beforeRow, beforeCol], [afterRow, afterCol]) {
  if (beforeCol === afterCol) return '|';
  if (beforeRow === afterRow) return '-';
  if (afterRow > beforeRow && afterCol > beforeCol) return 'L';
  if (afterRow > beforeRow && afterCol < beforeCol) return 'J';
  if (afterRow < beforeRow && afterCol > beforeCol) return 'F';
  if (afterRow < beforeRow && afterCol < beforeCol) return '7';
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
