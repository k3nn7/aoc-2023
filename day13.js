function part1(input) {
  const patterns = getPatterns(input.split('\n'));

  let result = 0;
  let i = 0;
  for (const pattern of patterns) {
    const colReflection = findReflectionCol(pattern);
    if (colReflection.length > 0) {
      result += (colReflection[0] + 1);
    }
    const rowReflection = findReflectionRow(pattern);
    if (rowReflection.length > 0) {
      result += 100 * (rowReflection[0] + 1);
    }

    if (colReflection.length === 0 && rowReflection.length === 0) console.log(i);
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
      pattern[row][col] = toOpposite(pattern[row][col]);;

      const newReflection = getReflection(pattern);
      const chosen = chooseReflection(originalReflection, newReflection);
      if (chosen !== null) return chosen;

      pattern[row][col] = toOpposite(pattern[row][col]);;
    }
  }

  return null;
}

function chooseReflection(original, modified) {
  for (const reflection of modified[0]) {
    if (reflection !== original[0][0]) return reflection + 1;
  }
  for (const reflection of modified[1]) {
    if (reflection !== original[1][0]) return 100 * (reflection + 1);
  }

  return null;
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
  const reflections = [];
  for (let col = 0; col < pattern[0].length - 1; col++) {
    if (isReflectionAcrossCol(pattern, col)) reflections.push(col);
  }

  return reflections;
}

function findReflectionRow(pattern) {
  const reflections = [];
  for (let row = 0; row < pattern.length - 1; row++) {
    if (isReflectionAcrossRow(pattern, row)) reflections.push(row);
  }

  return reflections;
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
