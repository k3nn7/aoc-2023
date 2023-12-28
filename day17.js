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


function findMin(board, row, col, direction, moves) {
  const key = `${row},${col}`;
  const memoKey = `${row},${col},${direction},${moves}`;
  if (memoKey in memo) return memo[memoKey];
  if (key in visited) {
    return -1;
  }
  visited[key] = true;
  if (row < 0 || col < 0 || row === board.length || col === board[row].length) {
    memo[memoKey] = -1;
    delete visited[key];
    return -1;
  }
  if (row === board.length - 1 && col === board[row].length - 1) {
    delete visited[key];
    return board[row][col];
  }

  let result = Number.MAX_SAFE_INTEGER;
  let found = false;
  const directions = getPossibleDirections(direction, moves);
  for (const newDirection of directions) {
    const [newRow, newCol] = directionToCoord(row, col, newDirection);
    const newMoves = direction === newDirection ? moves + 1 : 1;
    const thisResult = findMin(board, newRow, newCol, newDirection, newMoves);

    if (thisResult !== -1 && thisResult < result) {
      result = thisResult;
      found = true;
    }
  }

  delete visited[key];
  if (found) {
    memo[memoKey] = result + board[row][col];

    return result + board[row][col];
  }

  memo[memoKey] = -1;

  return -1;
}

function getPossibleDirections(direction, moves) {
  switch (direction) {
    case 'up':
      if (moves < 3) return ['up', 'left', 'right'];
      return ['left', 'right'];
    case 'down':
      if (moves < 3) return ['down', 'left', 'right'];
      return ['left', 'right'];
    case 'left':
      if (moves < 3) return ['left', 'up', 'down'];
      return ['up', 'down'];
    case 'right':
      if (moves < 3) return ['right', 'up', 'down'];
      return ['up', 'down'];
  }
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
