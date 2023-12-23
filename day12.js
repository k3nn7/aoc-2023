let calls = 0;
let memo = {};

function part1(input) {
    calls = 0;
    memo = {};
    const data = parseInput(input);

    let sum = 0;
    for (const row of data) {
        memo = {};
        const result = countArrangements(row[0], row[1], 0, 0);
        sum += result;
    }

    return sum;
}

function part2(input) {
    calls = 0;
    memo = {};
    const data = parseInput(input);
    const data2 = data.map(unfold);

    let sum = 0;
    for (const row of data2) {
        memo = {};
        const result = countArrangements(row[0], row[1], 0, 0);
        sum += result;
    }

    return sum;
}

function unfold(row) {
    const result = [[...row[0]], [...row[1]]];
    
    for (let i = 0; i < 4; i++) {
        result[0].push('?', ...row[0]);
        result[1].push(...row[1]);
    }

    return result;
}

function parseInput(input) {
    return input
        .split('\n')
        .map((line) => {
            const [springs, counts] = line.split(' ');
            const springArray = springs.split('');
            const countArray = counts.split(',').map((n) => parseInt(n));

            return [springArray, countArray];
        });
}



function countArrangements(springs, counts, springStart, countStart) {
    const key = `${springStart}-${countStart}`;
    if (key in memo) return memo[key];

    calls++;
    if (countStart === counts.length) {
        if (noRemainingSprings(springs, springStart)) {
            memo[key] = 1;
            return 1;
        }

        memo[key] = 0;
        return 0;
    }
    if (springStart === springs.length) {
        memo[key] = 0;
        return 0;
    }

    let arrangements = 0;
    let i = springStart;
    const spotSize = counts[countStart];
    
    while (i < springs.length - spotSize + 1) {
        const spot = findSpotFrom(springs, counts[countStart], i);
        if (spot === null) break;

        arrangements += countArrangements(springs, counts, spot[1] + 2, countStart + 1);
        if (!spot[2]) break;
        i = spot[0] + 1;
    }

    memo[key] = arrangements;
    return arrangements;
}

function noRemainingSprings(springs, from) {
    for (let i = from; i < springs.length; i++) {
        if (springs[i] === '#') return false;
    }
    return true;
}

function findSpotFrom(springs, count, start) {
    const slots = new Array(springs.length).fill(0);
    for (let i = start; i < springs.length; i++) {
        const previous = slots[i-1] ?? 0;
        if (springs[i] === '?' || springs[i] === '#') {
            slots[i] = previous+1;
        } else {
            slots[i] = 0;
        }
    }

    for (let i = start; i < springs.length; i++) {
        if (i-count >= start && springs[i - count] === '#') return null;
        if (slots[i] >= count && springs[i+1] !== '#' && springs[i - count] !== '#') {
            const hasMoreOptions = springs[i-count+1] !== '#';
            return [i-count+1, i, hasMoreOptions];
        }
    }

    return null;
}

function verifySlots(springs, slots) {
    for (const [start, end] of slots) {
        for (let i = start; i <= end; i++) {
            springs[i] = '.';
        }
    }
    for (let s of springs) {
        if (s === '#') return false;
    }
    return true;
}

module.exports = {part1, part2};