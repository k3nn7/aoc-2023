let visited = {};
let memo = {};
let depth = 0;

function part1(input) {
  const board = parseInput(input);

  visited = {}; 
  memo ={};
  const min1 = findMin(board, 0, 0, 'down', 1);
  visited = {}; 
  memo ={};
  const min2 = findMin(board, 0, 0, 'right', 1);

  return [min1, min2];
}

function part2(input) {
}

function findMin2(board, direction) {
  const distTo = {};
  const pq = new MinPQ();
  const details = {};

  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      const key = `${row},${col}`;
      distTo[key] = Number.MAX_SAFE_INTEGER;
    }
  }
  distTo['0,0'] = 0;
  pq.add('0.0', 0);
  details['0.0'] = {direction, moves: 1, row: 0, col: 0, key: '0.0'};
  while (!pq.empty()) {
    relax(board, details[pq.removeMin()];
  }
}

function relax(board, v, dist, details) {
  const directions = getPossibleDirections(v.direction, v.moves, v.row, v.col, board);
  for (const direction of directions) {
    const [newRow, newCol] = directionToCoord(v.row, v.col, direction);
    const key = `${newRow},${newCol}`;
  }
}

function getPossibleDirections(direction, moves, row, col, board) {
  let moves = [];
  switch (direction) {
    case 'up':
      if (moves < 3 && row > 0) moves.push('up');
      if (col > 0) moves.push('left');
      if (col < board[row].length - 1) moves.push('right');
      break;

    case 'down':
      if (moves < 3 && row < board.length - 1) moves.push('down');
      if (col > 0) moves.push('left');
      if (col < board[row].length - 1) moves.push('right');
      break;

    case 'left':
      if (moves < 3 && col > 0) moves.push('left');
      if (row > 0) moves.push('up');
      if (row < board.length - 1) moves.push('down');
      break;

    case 'right':
      if (moves < 3 && col < board[row].length - 1) moves.push('right');
      if (row > 0) moves.push('up');
      if (row < board.length - 1) moves.push('down');
      break;
  }

  return moves;
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
    .filter(l => l.length > 0)
    .map(l => l.split('').map(n => parseInt(n)));
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
    this.arr[1] = this.arr.pop();
    const node = this.arr[1];
    this.sink(1);

    return result;
  }

  peek() {
    return this.arr[1].key;
  }

  empty() {
    return this.arr.length > 1;
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
      } else if (rightPriority < priority) {
        const tmp = this.arr[i];
        this.arr[i] = this.arr[rightChild];
        this.arr[i].i = i;
        this.arr[rightChild] = tmp;
        this.arr[rightChild].i = rightChild;
      } else {
        return;
      }
    }
  }
}

module.exports = {part1, part2, MinPQ};
