function part1(input) {
  const parsed = parse(input);
  const [trench, boundaries] = build(parsed);

  return getVolume(trench, boundaries);
}

function part2(input) {
  const parsed = parse2(input);
  const coords = build2(parsed);
  const boundaryPoints = coundBoundaryPoints(coords);
  const area = calculateArea(coords);
  const interiorPoints = area - boundaryPoints / 2 + 1;

  return boundaryPoints + interiorPoints;  
}

function parse(input) {
  const lines = input.split('\n');

  return lines
    .filter(line => line.length > 0)
    .map((line) => {
      const parts = line.split(' ');
      return [
        parts[0],
        parseInt(parts[1]),
        parts[2].substr(2, parts[2].length - 3)
      ]
    });
}

function parse2(input) {
  const lines = input.split('\n');

  return lines
    .filter(line => line.length > 0)
    .map((line) => {
      const parts = line.split(' ');
      const code = parts[2].substr(2, parts[2].length - 3);

      return parseCode(code);
    });
}

function parseCode(code) {
  const directionMap = ['R', 'D', 'L', 'U'];
  const dist = parseInt(code.substr(0, code.length-1), 16);
  const direction = directionMap[parseInt(code.substr(code.length-1, 1))];

  return [direction, dist];
}

function build(commands) {
  const result = {};
  let maxCol = Number.MIN_SAFE_INTEGER;
  let maxRow = Number.MIN_SAFE_INTEGER;
  let minCol = Number.MAX_SAFE_INTEGER;
  let minRow = Number.MAX_SAFE_INTEGER;

  let current = [0, 0, commands[0][0]];
  for (const command of commands) {
    for (let i = 0; i < command[1]; i++) {
      const [row, col] = current;
      if (row > maxRow) maxRow = row;
      if (row < minRow) minRow = row;
      if (col > maxCol) maxCol = col;
      if (col < minCol) minCol = col;

      const next = move(current, command[0]);
      const key = `${current[0]},${current[1]}`;
      result[key] = getSegment(current[2], next[2]);

      current = next;
    }

    const [row, col] = current;
    if (row > maxRow) maxRow = row;
    if (row < minRow) minRow = row;
    if (col > maxCol) maxCol = col;
    if (col < minCol) minCol = col;
  }

  result['0,0'] = getSegment(commands[commands.length-1][0], commands[0][0]);

  return [result, [minRow, maxRow, minCol, maxCol]];
}

function build2(commands) {
  const coords = [[0, 0]];
  for (const command of commands) {
    const [direction, dist] = command;
    const previousCoord = coords[coords.length - 1];
    const newCoord = [previousCoord[0], previousCoord[1]];
    switch (direction) {
      case 'U':
        newCoord[0] -= dist;
        break;
      case 'D':
        newCoord[0] += dist;
        break;
      case 'L':
        newCoord[1] -= dist;
        break;
      case 'R':
        newCoord[1] += dist;
        break;
    }
    coords.push(newCoord);
  }

  return coords;
}

function coundBoundaryPoints(coords) {
  let sum = 0;
  for (let i = 1; i < coords.length; i++) {
    sum += Math.abs(coords[i][0] - coords[i-1][0]) 
      + Math.abs(coords[i][1] - coords[i-1][1]);
  }

  return sum;
}

function calculateArea(coords) {
  let area = 0;
  for (let i = 1; i < coords.length; i++) {
    const item = (coords[i-1][1] * coords[i][0])
      - (coords[i][1] * coords[i-1][0]);
    area += item;
  }

  return area / 2;
}

function move([row,col], direction) {
  switch (direction) {
    case 'U':
      return [row-1, col, direction];
    case 'D':
      return [row+1, col, direction];
    case 'L':
      return [row, col-1, direction];
    case 'R':
      return [row, col+1, direction];
  }
}

function getSegment(prev, curr) {
  switch (prev) {
    case 'U':
      if (curr === 'U') return '|';
      if (curr === 'L') return '7';
      if (curr === 'R') return 'F';
    case 'D':
      if (curr === 'D') return '|';
      if (curr === 'L') return 'J';
      if (curr === 'R') return 'L';
    case 'L':
      if (curr === 'L') return '-';
      if (curr === 'U') return 'L';
      if (curr === 'D') return 'F';
    case 'R':
      if (curr === 'R') return '-';
      if (curr === 'U') return 'J';
      if (curr === 'D') return '7';
  }

  if (prev === 'U' && curr === 'U') {
    return '|';
  }
  if (prev === 'D' && curr === 'D') {
    return '|';
  }
  if (prev === 'L' && curr === 'L') {
    return '-';
  }
  if (prev === 'R' && curr === 'R') {
    return '-';
  }
}

function getVolume(trench, boundaries) {
  const [minRow, maxRow, minCol, maxCol] = boundaries;
  let volume = 0;

  for (let row = minRow; row <= maxRow; row++) {
    let previous = [0, 0, undefined];
    let inside = false;
    for (let col = minCol; col <= maxCol; col++) {
      const key = `${row},${col}`;
      switch (trench[key]) {
        case '-':
          volume++;
          break;
        case '|':
          volume++;
          if (inside) {
            volume += (col - previous[1]) - 1;
          }
          inside = !inside;
          previous = [row, col, trench[key]];
          break;
        case 'L':
          volume++;
          if (inside) {
            volume += (col - previous[1]) - 1;
          }
          previous = [row, col, trench[key]];
          break;
        case 'F':
          volume++;
          if (inside) {
            volume += (col - previous[1]) - 1;
          }
          previous = [row, col, trench[key]];
          break;
        case 'J':
          if (previous[2] === 'F') {
            inside = !inside;
          }
          volume++;
          previous = [row, col, trench[key]];
          break;
        case '7':
          if (previous[2] === 'L') {
            inside = !inside;
          }
          volume++;
          previous = [row, col, trench[key]];
          break;
      }
      
    }
  }

  return volume;
}

module.exports = {part1, part2};
