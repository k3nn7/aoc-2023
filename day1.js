

function part1(input) {
  const lines = input.split('\n');
  let sum = 0;

  for (const line of lines) {
    let first = '', last = '';

    for (let i = 0; i < line.length; i++) {
      const c = line.charAt(i);
      if (!isDigit(c) && first != '') {
        break;
      }
      if (isDigit(c)) {
        first += c;
        break;
      }
    }

    for (let i = line.length - 1; i >= 0; i--) {
      const c = line.charAt(i);
      if (!isDigit(c) && last != '') {
        break;
      }
      if (isDigit(c)) {
        last = c + last;
        break;
      }
    }

    sum += parseInt(first + last);
  }

  return sum;
}

function isDigit(c) {
  return c >= '0' && c <= '9';
}

const digitWords = {
  'one': '1', 
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
};

function part2(input) {
  const lines = input.split('\n');
  let sum = 0;

  for (const line of lines) {
    const first = getFirstDigit(line);
    const last = getLastDigit(line);

    sum += parseInt(first + last);
  }

  return sum;
}

function getFirstDigit(input) {
  if (isDigit(input[0])) return input[0];

  for (const [word, digit] of Object.entries(digitWords)) {
    if (input.startsWith(word)) return digit;
  }

  return getFirstDigit(input.substr(1));
}

function getLastDigit(input) {
  const l = input.length - 1;
  if (isDigit(input[l])) return input[l];

  for (const [word, digit] of Object.entries(digitWords)) {
    if (input.substr(l + 1 - word.length) === word) return digit;
  }

  return getLastDigit(input.substr(0, l));
}

module.exports = {part1, part2};
