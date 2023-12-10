const cardValues = {
    'A': 0,
    'K': 1,
    'Q': 2,
    'J': 3,
    'T': 4,
    '9': 5,
    '8': 6,
    '7': 7,
    '6': 8,
    '5': 9,
    '4': 10,
    '3': 11,
    '2': 12,
};
const cardValues2 = {
    'A': 0,
    'K': 1,
    'Q': 2,
    'T': 3,
    '9': 4,
    '8': 5,
    '7': 6,
    '6': 7,
    '5': 8,
    '4': 9,
    '3': 10,
    '2': 11,
    'J': 12,
};
const figureValues = {
    'five': 0,
    'four': 1,
    'full': 2,
    'three': 3,
    'two': 4,
    'one': 5,
    'high': 6
}

function part1(input) {
    const lines = input.split('\n');
    const hands = lines.map(parseLine);

    return hands
        .sort((a, b) => compareHands(a.cards, b.cards))
        .reverse()
        .reduce((acc, curr, i) => {
            return acc + curr.bid * (i + 1)
        }, 0);
}

function parseLine(line) {
    const splited = line.split(' ');

    return {
        cards: splited[0],
        bid: parseInt(splited[1])
    };
}

function parseFigure(cards) {
    const figures = {};
    for (let i = 0; i < cards.length; i++) {
        if (!(cards[i] in figures)) figures[cards[i]] = 0;
        figures[cards[i]]++;
    }

    const figureCounts = (Object.values(figures)).sort().reverse();
    
    if (figureCounts[0] === 5) return 'five';
    if (figureCounts[0] === 4) return 'four';
    if (figureCounts[0] === 3 && figureCounts[1] === 2) return 'full';
    if (figureCounts[0] === 3) return 'three';
    if (figureCounts[0] === 2 && figureCounts[1] === 2) return 'two';
    if (figureCounts[0] === 2) return 'one';

    return 'high';
}

function parseFigure2(cards) {
    const figures = {};
    let jokerCount = 0;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] === 'J') {
            jokerCount++;
        } else {
            if (!(cards[i] in figures)) figures[cards[i]] = 0;
            figures[cards[i]]++;
        }
    }

    const figureCounts = (Object.values(figures)).sort().reverse();

    if (figureCounts.length === 0) {
        return 'five';
    }
    
    if (figureCounts[0] + jokerCount === 5) return 'five';
    if (figureCounts[0] + jokerCount === 4) return 'four';
    if (figureCounts[0] + jokerCount === 3 && figureCounts[1] === 2) return 'full';
    
    if (figureCounts[0] + jokerCount === 3) return 'three';
    if (figureCounts[0] === 2 && figureCounts[1] === 2) return 'two';
    if (figureCounts[0] + jokerCount === 2) return 'one';

    return 'high';
}

function compareHands(a, b) {
    const figureA = parseFigure(a);
    const figureB = parseFigure(b);

    if (figureA !== figureB) {
        return figureValues[figureA] - figureValues[figureB];
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return cardValues[a[i]] - cardValues[b[i]];
        }
    }
}

function compareHands2(a, b) {
    const figureA = parseFigure2(a);
    const figureB = parseFigure2(b);

    if (figureA !== figureB) {
        return figureValues[figureA] - figureValues[figureB];
    }

    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return cardValues2[a[i]] - cardValues2[b[i]];
        }
    }
}

function part2(input) {
    const lines = input.split('\n');
    const hands = lines.map(parseLine);

    return hands
        .sort((a, b) => compareHands2(a.cards, b.cards))
        .reverse()
        .reduce((acc, curr, i) => {
            return acc + curr.bid * (i + 1)
        }, 0);
}

module.exports = {part1, part2};