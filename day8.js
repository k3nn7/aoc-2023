const nodes = {};

function part1(input) {
    const lines = input.split('\n');
    const directions = lines[0].split('');

    for (let i = 2; i < lines.length; i++) {
        const [node, left, right] = parseLine(lines[i]);
        addNode(node, left, right);
    }

    let current = 'AAA';
    let moves = 0;
    let i = 0;
    while (current !== 'ZZZ') {
        moves++;
        if (i === directions.length) i = 0;
        if (directions[i] === 'L') current = nodes[current].left;
        if (directions[i] === 'R') current = nodes[current].right;
        i++;
    }

    return moves;
}

function part2(input) {
    const lines = input.split('\n');
    const directions = lines[0].split('');

    for (let i = 2; i < lines.length; i++) {
        const [node, left, right] = parseLine(lines[i]);
        addNode(node, left, right);
    }

    let startNodes = [];
    for (const node of Object.keys(nodes)) {
        if (node[2] === 'A') startNodes.push(node);
    }

    const moves = [];
    for (const node of startNodes) {
        const nodeMoves = findMoves(node, directions);
        for (const m of Object.values(nodeMoves)) {
            moves.push(m);
        }
    }

    let lcm = moves[0];
    for (let i = 1; i < moves.length; i++) {
        lcm = lcmFunction(lcm, moves[i]);
    }
        
    return lcm;
}


function gcd(a, b) { 
    for (let temp = b; b !== 0;) { 
        b = a % b; 
        a = temp; 
        temp = b; 
    } 
    return a; 
} 
  
function lcmFunction(a, b) { 
    const gcdValue = gcd(a, b); 
    return (a * b) / gcdValue; 
}

function findMoves(from, directions) {
    let current = from;
    let moves = 0;
    let i = 0;
    const endNodes = {};

    while (true) {
        moves++;
        if (i === directions.length) i = 0;
        if (directions[i] === 'L') current = nodes[current].left;
        if (directions[i] === 'R') current = nodes[current].right;
        i++;

        if (current[2] === 'Z') {
            if (current in endNodes) break;
            endNodes[current] = moves;
            moves = 0;
        }
    }

    return endNodes;
}


function parseLine(line) {
    const match = line.match(/^(\w{3}) = \((\w{3}), (\w{3})\)$/);

    return [match[1], match[2], match[3]];
}

function addNode(name, left, right) {
    nodes[name] = {left, right};
}

module.exports = {part1, part2};