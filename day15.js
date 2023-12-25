function part1(input) {
    const strings = parseInput(input);
    let result = 0;
    for (const s of strings) {
        result += getHash(s);
    }

    return result;
}

function part2(input) {
}

function parseInput(input) {
    return input.split(',');
}

function getHash(s) {
    let result = 0;
    for (let i = 0; i < s.length; i++) {
        const c = s.charCodeAt(i);
        result += c;
        result *= 17;
        result %= 256;
    }

    return result;
}

module.exports = {part1, part2};