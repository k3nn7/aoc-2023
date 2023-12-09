const mappings = {};

function part1(input) {
    const lines = input.split('\n');
    let seeds;
    let currentMapping = null;
    let currentMappingValues = [];

    for (const line of lines) {
        if (line.startsWith('seeds:')) {
            seeds = getNumbers(line);
        }
        if (line === '' && currentMapping !== null) {
            mappings[currentMapping[0]] = buildMapping(currentMappingValues, currentMapping[1]);
            currentMapping = null;
            currentMappingValues = [];
        }
        if (currentMapping !== null) {
            currentMappingValues.push(getNumbers(line));
        }
        if (line.includes('map:')) {
            currentMapping = getMappingName(line);
        }
    }
    if (currentMapping !== null) {
        mappings[currentMapping[0]] = buildMapping(currentMappingValues, currentMapping[1]);
    }

    let min = Number.MAX_SAFE_INTEGER;

    for (const seed of seeds) {
        const location = getLocation(seed);
        if (location < min) min = location;
    }

    return min;
}

function part2(input) {
    const lines = input.split('\n');
    let seeds;
    let currentMapping = null;
    let currentMappingValues = [];

    for (const line of lines) {
        if (line.startsWith('seeds:')) {
            seeds = makeSeedRanges(getNumbers(line));
        }
        if (line === '' && currentMapping !== null) {
            mappings[currentMapping[0]] = buildMapping(currentMappingValues, currentMapping[1]);
            currentMapping = null;
            currentMappingValues = [];
        }
        if (currentMapping !== null) {
            currentMappingValues.push(getNumbers(line));
        }
        if (line.includes('map:')) {
            currentMapping = getMappingName(line);
        }
    }
    if (currentMapping !== null) {
        mappings[currentMapping[0]] = buildMapping(currentMappingValues, currentMapping[1]);
    }

    let min = Number.MAX_SAFE_INTEGER;

    for (const seedRange of seeds) {
        console.log('next range');
        for (let seed = seedRange[0]; seed <= seedRange[1]; seed++) {
            const location = getLocation(seed);
            if (location < min) min = location;
        }
    }

    return min;
}

function makeSeedRanges(input) {
    const ranges = [];
    for (let i = 0; i < input.length; i += 2) {
        ranges.push(toRange(input[i], input[i+1]));
    }

    return ranges;
}

function getNumbers(line) {
    const matches = line.matchAll(/(\d+)/g);
    const result = [];
    for (const match of matches) {
        result.push(parseInt(match[1]));
    }

    return result;
}

function getMappingName(line) {
    const match = line.match(/(.+)-to-(.+) map:/);
    return [match[1], match[2]];
}

function buildMapping(lines, destination) {
    let tree = null;

    for (const line of lines) {
        tree = addNode(tree, makeNode(line));
    }
    
    return {destination, tree};
}

function addNode(node, newNode) {
    if (node === null) {
        return newNode;
    }

    if (newNode.from > node.to) {
        node.right = addNode(node.right, newNode);
    }
    if (newNode.to < node.from) {
        node.left = addNode(node.left, newNode);
    }

    return node;
}

function makeNode(line) {
    const range = toRange(line[1], line[2]);

    return {
        from: range[0],
        to: range[1],
        transform: toTransform(line[1], line[0]),
        left: null,
        right: null
    };
}

function toRange(from, length) {
    return [from, from + length - 1];
}

function toTransform(source, destination) {
    return destination - source;
}

function findInTree(node, value) {
    if (!node) return node;

    if (value >= node.from && value <= node.to) {
        return node;
    }
    if (value < node.from) {
        return findInTree(node.left, value);
    }
    if (value > node.to) {
        return findInTree(node.right, value);
    }
}

function transform(value, from) {
    const mapping = mappings[from];

    const node = findInTree(mapping.tree, value);
    if (node) {
        return [value + node.transform, mapping.destination];
    }

    return [value, mapping.destination];
}

function getLocation(seed) {
    let current = 'seed';
    let value = seed;
    while (current !== 'location') {
        [value, current] = transform(value, current);
    }

    return value;
}

module.exports = {part1, part2};