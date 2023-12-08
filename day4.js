function part1(input) {
    const lines = input.split('\n');
    let sum = 0;
    for (const line of lines) {
        const parsed = parseLine(line);
        sum += countPoints(parsed);
    }

    return sum;
}

function parseLine(line) {
    const numbers = line
        .substring(line.indexOf(':') + 1)
        .split('|');
   
    return [parseNumbers(numbers[0]), parseNumbers(numbers[1])];
}

function parseNumbers(s) {
    const matches = s
        .matchAll(/(\d+)/g);

    const result = [];
    for (const match of matches) {
        result.push(parseInt(match[0]));
    }

    return result;
}

function countPoints(input) {
    const winningNumbers = {};
    for (const n of input[0]) {
        winningNumbers[n] = true;
    }

    let result = 0;
    for (const n of input[1]) {
        if (winningNumbers[String(n)]) {
            if (result === 0) {
                result = 1;
            } else {
                result *= 2;
            }
        }
    }

    return result;
}

function countMatches(input) {
    const winningNumbers = {};
    for (const n of input[0]) {
        winningNumbers[n] = true;
    }

    let result = 0;
    for (const n of input[1]) {
        if (winningNumbers[String(n)]) {
            result++;
        }
    }

    return result;
}

function part2(input) {
    const lines = input.split('\n');
    const numbers = [];
    
    for (const line of lines) {
        const parsed = parseLine(line);
        numbers.push(countMatches(parsed));
    }

    const memo = new Array(numbers.length);

    let result = 0;
    for (let i = 0; i < numbers.length; i++) {
        result += countCards(numbers, memo, i);
    }

    return result;
}

function countCards(input, memo, current) {
    if (memo[current] !== undefined) return memo[current];

    if (input[current] === 0) {
        memo[current] = 1;

        return 1;
    }

    let sum = 1;
    for (let i = 0; i < input[current]; i++) {
        sum += countCards(input, memo, current + i + 1);
    }
    memo[current] = sum;

    return sum;
}

module.exports = {part1, part2};