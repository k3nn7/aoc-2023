function part1(input) {
  const patterns = getPatterns(input.split('\n'));

  let result = 0;
  let i = 0;
  for (const pattern of patterns) {
    const colReflection = findReflectionCol(pattern);
    if (colReflection !== null) {
      result += (colReflection + 1);
    }
    const rowReflection = findReflectionRow(pattern);
    if (rowReflection !== null) {
      result += 100 * (rowReflection + 1);
    }

    if (colReflection === null && rowReflection === null) console.log(i);
    i++;
  }

  return result;
}

function part2(input) {
  const patterns = getPatterns(input.split('\n'));

  let result = 0;
  let i = 0;
  for (const pattern of patterns) {
    result += getValueForPattern(pattern, i);
    i++;
  }

  return result;
}

function getReflection(pattern) {
  const colReflection = findReflectionCol(pattern);
  const rowReflection = findReflectionRow(pattern);

  return [colReflection, rowReflection];
}

function getValueForPattern(pattern, i) {
  const originalReflection = getReflection(pattern);

  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      const original = pattern[row][col];
      const opposite = toOpposite(pattern[row][col]);
      pattern[row][col] = opposite;

      if (original == opposite) console.log(original);

      const newReflection = getReflection(pattern);
      if (newReflection[0] !== null && newReflection[0] !== originalReflection[0]) {
        return newReflection[0] + 1;
      }
      if (newReflection[1] !== null && newReflection[1] !== originalReflection[1]) {
        return 100 * (newReflection[1] + 1);
      }

      pattern[row][col] = original;
    }
  }

  if (originalReflection[0] !== null) return originalReflection[0] + 1;
  if (originalReflection[1] !== null) return 100 * (originalReflection[1] + 1);
}

function toOpposite(c) {
  if (c === '.') return '#';
  return '.';
}

function getPatterns(input) {
  const result = [];

  let pattern = [];
  for (let row = 0; row < input.length; row++) {
    if (input[row] === '') {
      result.push(pattern);
      pattern = [];
    } else {
      pattern.push(input[row].split(''));
    }
  }

  result.push(pattern);

  return result;
}

function findReflectionCol(pattern) {
  for (let col = 0; col < pattern[0].length - 1; col++) {
    if (isReflectionAcrossCol(pattern, col)) return col;
  }

  return null;
}

function findReflectionRow(pattern) {
  for (let row = 0; row < pattern.length - 1; row++) {
    if (isReflectionAcrossRow(pattern, row)) return row;
  }

  return null;
}

function isReflectionAcrossCol(pattern, acrossCol) {
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      const oppositeCol = getOpposite(col, acrossCol, pattern[row].length);
      if (oppositeCol === null) continue;
      if (pattern[row][col] !== pattern[row][oppositeCol]) return false;
    }
  }

  return true;
}

function isReflectionAcrossRow(pattern, acrossRow) {
  for (let row = 0; row < pattern.length; row++) {
    for (let col = 0; col < pattern[row].length; col++) {
      const oppositeRow = getOpposite(row, acrossRow, pattern.length);
      if (oppositeRow === null) continue;
      if (pattern[row][col] !== pattern[oppositeRow][col]) return false;
    }
  }

  return true;
}

function getOpposite(i, across, length) {
  const dist = i - across;
  const opposite = i - (2 * dist - 1);
  if (opposite >= 0 && opposite < length) return opposite;

  return null;
}

module.exports = {part1, part2};
