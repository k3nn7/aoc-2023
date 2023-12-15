function part1(input) {
  const lines = input.split('\n');
  let sum = 0;

  for (const line of lines) {
    const numbers = parseNumbers(line);
    const diff = getNext(numbers);
    sum += diff;
  }

  return sum;
}

function part2(input) {
  const lines = input.split('\n');
  let sum = 0;

  for (const line of lines) {
    const numbers = parseNumbers(line);
    const diff = getPrev(numbers);
    sum += diff;
  }

  return sum;

}

function parseNumbers(line) {
  const matches = line.matchAll(/(-?\d+)/g);
  const result = [];
  for (const match of matches) {
    result.push(parseInt(match[1]));
  }

  return result;
}

function getNext(numbers) {
  const [prevDiff, nextDiff] = getDiff(numbers);

  return numbers[numbers.length-1] + nextDiff;
}

function getPrev(numbers) {
  const [prevDiff, nextDiff] = getDiff(numbers);

  return numbers[0] - prevDiff;
}

function getDiff(numbers) {
  let allZero = true;
  const diffs = [];

  for (let i = 1; i < numbers.length; i++) {
    const diff = numbers[i] - numbers[i-1];
    diffs.push(diff);
    if (diff !== 0) allZero = false;
  }

  if (allZero) return [0, 0];
  const [prevDiff, nextDiff] = getDiff(diffs);

  return [diffs[0] - prevDiff, diffs[diffs.length-1] + nextDiff];
}

module.exports = {part1, part2};
