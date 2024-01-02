function part1(input) {
  const board = parseInput(input);

  return findMin(board);
}

function part2(input) {
  const board = parseInput(input);
  
  return findMin2(board);
}

function findMin(board) {
  const pq = new MinPQ();
  const visited = {};

  pq.add({direction: 'right', moves: 0, row: 0, col: 0, cost: 0}, 0);
  visited['0,0,1,right'] = true;

  let min = Number.MAX_SAFE_INTEGER;
  while (!pq.empty()) {
    const v = pq.removeMin();

    if (v.row === board.length-1 && v.col === board[0].length-1) {
      if (v.cost < min) min = v.cost;
    }

    const directions = getPossibleDirections(v.direction, v.moves, v.row, v.col, board);
    for (const direction of directions) {
      const [newRow, newCol] = directionToCoord(v.row, v.col, direction);
      const newMoves = direction === v.direction ? v.moves+1 : 1;
      const newCost = v.cost + board[newRow][newCol];
      const key = `${newRow},${newCol},${newMoves},${direction}`;
      if (!(key in visited)) {
        pq.add({direction, moves: newMoves, row: newRow, col: newCol, cost: newCost}, newCost);
        visited[key] = true;
      }
    }
  }

  return min;
}

function findMin2(board) {
  const pq = new MinPQ();
  const visited = {};

  pq.add({direction: 'right', moves: 0, row: 0, col: 0, cost: 0}, 0);
  pq.add({direction: 'down', moves: 0, row: 0, col: 0, cost: 0}, 0);

  let min = Number.MAX_SAFE_INTEGER;
  while (!pq.empty()) {
    const v = pq.removeMin();
    const key = `${v.row},${v.col},${v.moves},${v.direction}`;
    if (key in visited) continue;
    visited[key] = true;

    if (v.row === board.length-1 && v.col === board[0].length-1 && v.moves >= 4) {
      return v.cost;
      //if (v.cost < min) min = v.cost;
    }

    const directions = getPossibleDirections2(v.direction, v.moves, v.row, v.col, board);
    for (const direction of directions) {
      const [newRow, newCol] = directionToCoord(v.row, v.col, direction);
      const newMoves = direction === v.direction ? v.moves+1 : 1;
      const newCost = v.cost + board[newRow][newCol];
      pq.add({direction, moves: newMoves, row: newRow, col: newCol, cost: newCost}, newCost);
    }
  }

  return min;
}

function getPossibleDirections(direction, moves, row, col, board) {
  let result = [];
  switch (direction) {
    case 'up':
      if (moves < 3 && row > 0) result.push('up');
      if (col > 0) result.push('left');
      if (col < board[row].length - 1) result.push('right');
      break;

    case 'down':
      if (moves < 3 && row < board.length - 1) result.push('down');
      if (col > 0) result.push('left');
      if (col < board[row].length - 1) result.push('right');
      break;

    case 'left':
      if (moves < 3 && col > 0) result.push('left');
      if (row > 0) result.push('up');
      if (row < board.length - 1) result.push('down');
      break;

    case 'right':
      if (moves < 3 && col < board[row].length - 1) result.push('right');
      if (row > 0) result.push('up');
      if (row < board.length - 1) result.push('down');
      break;
  }

  return result;
}

function getPossibleDirections2(direction, moves, row, col, board) {
  let result = [];
  const max = 10;
  const min = 4;
  switch (direction) {
    case 'up':
      if (moves < max && row > 0) result.push('up');
      if (moves >= min && col > 0) result.push('left');
      if (moves >= min && col < board[row].length - 1) result.push('right');
      break;

    case 'down':
      if (moves < max && row < board.length - 1) result.push('down');
      if (moves >= min && col > 0) result.push('left');
      if (moves >= min && col < board[row].length - 1) result.push('right');
      break;

    case 'left':
      if (moves < max && col > 0) result.push('left');
      if (moves >= min && row > 0) result.push('up');
      if (moves >= min && row < board.length - 1) result.push('down');
      break;

    case 'right':
      if (moves < max && col < board[row].length - 1) result.push('right');
      if (moves >= min && row > 0) result.push('up');
      if (moves >= min && row < board.length - 1) result.push('down');
      break;
  }

  return result;
}

function directionToCoord(row, col, direction) {
  switch (direction) {
    case 'up':
      return [row - 1, col];
    case 'down':
      return [row + 1, col];
    case 'left':
      return [row, col - 1];
    case 'right':
      return [row, col + 1];
  }
}

function parseInput(input) {
  return input
    .split('\n')
    .map(l => l.split('').map(n => parseInt(n)))
    .filter(l => l.length > 0);
}

class MinPQ {
  constructor() {
    this.arr = [null];
    this.index = {};
  }

  add(key, priority) {
    const node = {key, priority};
    this.index[key] = node;
    this.arr.push(node);

    this.swim(this.arr.length - 1);
  }

  update(key, priority) {
    const node = this.index[key];
    const i = node.i;
    if (priority > node.priority) {
      node.priority = priority;
      this.sink(i);
    } if (priority < node.priority) {
      node.priority = priority;
      this.swim(i);
    }
  }

  removeMin() {
    const result = this.arr[1].key;
    if (this.arr.length > 2) {
      this.arr[1] = this.arr.pop();
      this.sink(1);
    } else {
      this.arr.pop();
    }

    return result;
  }

  peek() {
    return this.arr[1].key;
  }

  empty() {
    return this.arr.length === 1;
  }

  swim(n) {
    let i = n;
    while (Math.floor(i/2) > 0) {
      const parentIndex = Math.floor(i / 2);
      if (this.arr[parentIndex].priority < this.arr[i].priority) return;
      const tmp = this.arr[i];
      this.arr[i] = this.arr[parentIndex];
      this.arr[i].i = i;
      this.arr[parentIndex] = tmp;
      this.arr[parentIndex].i = parentIndex;
      i = parentIndex;
    }
  }

  sink(n) {
    let i = n;
    while (i*2 < this.arr.length) {
      const leftChild = i * 2;
      const rightChild = i * 2 + 1;
      const priority = this.arr[i].priority;
      const leftPriority = this.arr[leftChild].priority;
      const rightPriority = this.arr[rightChild]?.priority ?? Number.MAX_SAFE_INTEGER;

      if (leftPriority < priority && leftPriority < rightPriority) {
        const tmp = this.arr[i];
        this.arr[i] = this.arr[leftChild];
        this.arr[i].i = i;
        this.arr[leftChild] = tmp;
        this.arr[leftChild].i = leftChild;
        i = i*2;
      } else if (rightPriority < priority) {
        const tmp = this.arr[i];
        this.arr[i] = this.arr[rightChild];
        this.arr[i].i = i;
        this.arr[rightChild] = tmp;
        this.arr[rightChild].i = rightChild;
        i = i*2 + 1;
      } else {
        return;
      }
    }
  }
}

module.exports = {part1, part2, MinPQ};
