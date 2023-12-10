function part1(input) {
    const lines = input.split('\n');
    const times = parseNumbers(lines[0]);
    const distances = parseNumbers(lines[1]);

    let result = 1;
    for (let i = 0; i < times.length; i++) {
        result *= countWins(times[i], distances[i]);
    }

    return result;
}

function part2(input) {
    const lines = input.split('\n');
    const time = parseInt(parseNumbers(lines[0]).join(''));
    const distance = parseInt(parseNumbers(lines[1]).join(''));

    return countWins(time, distance);
}

function parseNumbers(line) {
    const matches = line.matchAll(/(\d+)/g);
    const result = [];
    for (const match of matches) {
        result.push(parseInt(match[1]));
    }

    return result;
}

function countWins(time, distance) {
    let wins = 0;
    for (let i = 0; i < time; i++) {
        const myDistance = (time - i) * i;
        if (myDistance > distance) wins++;
    }

    return wins;
}

module.exports = {part1, part2};