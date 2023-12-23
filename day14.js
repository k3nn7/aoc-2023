function part1(input) {
    const dish = parseInput(input);

    for (let col = 0; col < dish[0].length; col++) {
        for (let row = 1; row < dish.length; row++) {
            if (dish[row][col] !== 'O') continue;

            for (let from = row; from > 0; from--) {
                if (dish[from-1][col] !== '.') break;
                dish[from-1][col] = 'O';
                dish[from][col] = '.';
            }
        }
    }

    return measureLoad(dish);
}

function part2(input) {
    const dish = parseInput(input);
    let loads = [];
    
    for (let cycle = 0; cycle < 1000; cycle++) {
        loads.push(measureLoad(dish));
        rollNorth(dish);
        rollWest(dish);
        rollSouth(dish);
        rollEast(dish);
    }

    const [offset, length] = findLoop(loads);
    const index = (1000000000 - offset) % length;

    return loads[offset + index];
}

function parseInput(input) {
    return input.split('\n').map(l => l.split(''));
}

function measureLoad(dish) {
    let load = 0;
    for (let row = 0; row < dish.length; row++) {
        const weight = dish.length - row;
        for (let col = 0; col < dish[row].length; col++) {
            if (dish[row][col] === 'O') load += weight;
        }
    }

    return load;
}

function rollNorth(dish) {
    for (let col = 0; col < dish[0].length; col++) {
        for (let row = 1; row < dish.length; row++) {
            if (dish[row][col] !== 'O') continue;

            for (let from = row; from > 0; from--) {
                if (dish[from-1][col] !== '.') break;
                dish[from-1][col] = 'O';
                dish[from][col] = '.';
            }
        }
    }
}

function rollSouth(dish) {
    for (let col = 0; col < dish[0].length; col++) {
        for (let row = dish.length - 2; row >= 0; row--) {
            if (dish[row][col] !== 'O') continue;

            for (let from = row; from < dish.length - 1; from++) {
                if (dish[from+1][col] !== '.') break;
                dish[from+1][col] = 'O';
                dish[from][col] = '.';
            }
        }
    }
}

function rollWest(dish) {
    for (let row = 0; row < dish.length; row++) {
        for (let col = 1; col < dish[row].length; col++) {
            if (dish[row][col] !== 'O') continue;

            for (let from = col; from > 0; from--) {
                if (dish[row][from-1] !== '.') break;
                dish[row][from-1] = 'O';
                dish[row][from] = '.';
            }
        }
    }
}

function rollEast(dish) {
    for (let row = 0; row < dish.length; row++) {
        for (let col = dish[row].length - 2; col >= 0; col--) {
            if (dish[row][col] !== 'O') continue;

            for (let from = col; from < dish[row].length - 1; from++) {
                if (dish[row][from+1] !== '.') break;
                dish[row][from+1] = 'O';
                dish[row][from] = '.';
            }
        }
    }
}

function findLoop(arr) {
    let offset = 0;
    let length = 4;
    while (!isLoop(offset, length, arr)) {
        if (offset >= arr.length / 4) {
            offset = 0;
            length++;
        } else {
            offset++;
        }
    }

    return [offset, length];
}

function isLoop(offset, length, arr) {
    for (let i = offset; i < length + offset; i++) {
        if (arr[i] !== arr[i + length] || arr[i] !== arr[i + 2 * length]) {
            return false;
        }
    }

    return true
}

module.exports = {part1, part2};