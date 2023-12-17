let sky = [];
let galaxies = [];
let add = 1;

function part1(input) {
    add = 1;
    sky = [];
    galaxies = [];
    parseInput(input);
    const pairs = makePairs();

    let sum = 0;
    for (const pair of pairs) {
        sum += findDistance(pair[0], pair[1]);
    }

    return sum;
}

function part2(input, toAdd = 999999) {
    sky = [];
    galaxies = [];
    add = toAdd;
    parseInput(input);
    const pairs = makePairs();

    let sum = 0;
    for (const pair of pairs) {
        sum += findDistance(pair[0], pair[1]);
    }

    return sum;
}

function findDistance(a, b) {
    return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}


function parseInput(input) {
    const lines = input.split('\n');
    for (const line of lines) {
        sky.push(line.split(''));
    }

    const expandableRows = getExpandableRows();
    const expandableCols = getExpandableCols();
    
    for (let row = 0; row < sky.length; row++) {
        for (let col = 0; col < sky[row].length; col++) {
            if (sky[row][col] === '#') {
                const rowAdd = expandableRows[row];
                const colAdd = expandableCols[col];
                galaxies.push([row + rowAdd, col + colAdd]);
            }
        }
    }
}

function getExpandableRows() {
    const expandableRows = [];

    for (let row = 0; row < sky.length; row++) {
        let rowHasGalaxies = false;
        for (let col = 0; col < sky[row].length; col++) {
            if (sky[row][col] === '#') rowHasGalaxies = true;
        }

        const previous = expandableRows[row - 1] ?? 0;
        if (!rowHasGalaxies) {
            expandableRows[row] = previous+add;
        } else {
            expandableRows[row] = previous;
        }
    }

    return expandableRows;
}

function getExpandableCols() {    
    const expandableCols = [];

    for (let col = 0; col < sky[0].length; col++) {
        let colHasGalaxies = false;
        for (let row = 0; row < sky.length; row++) {
            if (sky[row][col] === '#') colHasGalaxies = true;
        }

        const previous = expandableCols[col - 1] ?? 0;
        if (!colHasGalaxies) {
            expandableCols[col] = previous+add;
        } else {
            expandableCols[col] = previous;
        }
    }

    return expandableCols;
}

function makePairs() {
    const pairs = [];
    for (let i = 0; i < galaxies.length - 1; i++) {
        for (let j = i + 1; j < galaxies.length; j++) {
            pairs.push([galaxies[i], galaxies[j]]);
        }
    }

    return pairs;
}

module.exports = {part1, part2};