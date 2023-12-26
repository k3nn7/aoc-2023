function part1(input) {
  return getEnergizedCount(input, 0, 0, 'right');
}

function part2(input) {
  const board = input.split('\n');

  let max = 0;
  for (let row = 0; row < board.length; row++) {
    const count = getEnergizedCount(input, row, 0, 'right');
    if (count > max) max = count;
  }
  for (let row = 0; row < board.length; row++) {
    const count = getEnergizedCount(input, row, board[0].length-1, 'left');
    if (count > max) max = count;
  }
  for (let col = 0; col < board[0].length; col++) {
    const count = getEnergizedCount(input, 0, col, 'down');
    if (count > max) max = count;
  }
  for (let col = 0; col < board[0].length; col++) {
    const count = getEnergizedCount(input, board.length-1, col, 'up');
    if (count > max) max = count;
  }

  return max;
}

function getEnergizedCount(input, row, col, direction) {
  const board = parseInput(input);

  visit(board, row, col, direction);

  let result = 0;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col].energized) {
        result++;
      }
    }
  }

  return result;
}

function parseInput(input) {
  return input
    .split('\n')
    .map((line) => {
      return line
        .split('')
        .map((c) => ({
          tile: c,
          energized: false,
          up: false,
          down: false,
          left: false,
          right: false
        }));
    }).filter((l) => l.length > 0);
}

function visit(board, row, col, direction) {
  if (row < 0 || col < 0 || row === board.length || col === board[row].length) return;

  if (board[row][col][direction]) return;

  board[row][col][direction] = true;
  board[row][col].energized = true;

  switch (board[row][col].tile) {
    case '.':
      return visit(board, ...empty(row, col, direction));
    case '/':
      return visit(board, ...mirror1(row, col, direction));
    case '\\':
      return visit(board, ...mirror2(row, col, direction));
    case '|':
      if (direction === 'left' || direction === 'right') {
        const [p1, p2] = vertical(row, col, direction);
        visit(board, ...p1);
        return visit(board, ...p2);
      }
      return visit(board, ...vertical(row, col, direction));
    case '-':
      if (direction === 'up' || direction === 'down') {
        const [p1, p2] = horizontal(row, col, direction);
        visit(board, ...p1);
        return visit(board, ...p2);
      }
      return visit(board, ...horizontal(row, col, direction));
  }
}

function empty(row, col, direction) {
  switch (direction) {
    case 'up':
      return [row-1, col, direction];
    case 'down':
      return [row+1, col, direction];
    case 'left':
      return [row, col-1, direction];
    case 'right':
      return [row, col+1, direction];
  }
}

function mirror1(row, col, direction) {
  switch (direction) {
    case 'up':
      return [row, col+1, 'right'];
    case 'down':
      return [row, col-1, 'left'];
    case 'left':
      return [row+1, col, 'down'];
    case 'right':
      return [row-1, col, 'up'];
  }
}

function mirror2(row, col, direction) {
  switch (direction) {
    case 'up':
      return [row, col-1, 'left'];
    case 'down':
      return [row, col+1, 'right'];
    case 'left':
      return [row-1, col, 'up'];
    case 'right':
      return [row+1, col, 'down'];
  }
}

function vertical(row, col, direction) {
  switch (direction) {
    case 'up':
      return [row-1, col, 'up'];
    case 'down':
      return [row+1, col, 'down'];
    case 'left':
    case 'right':
      return [[row-1, col, 'up'], [row+1, col, 'down']];
  }
}

function horizontal(row, col, direction) {
  switch (direction) {
    case 'up':
    case 'down':
      return [[row, col-1, 'left'], [row, col+1, 'right']];
    case 'left':
      return [row, col-1, 'left'];
    case 'right':
      return [row, col+1, 'right']
  }
}

module.exports = {part1, part2};
