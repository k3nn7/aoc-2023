function part1(input) {
    const lines = input.split('\n');
    const numbers = [];
    
    for (let i = 0; i < lines.length; i++) {
        const n = parseNumbers(lines[i], i);

        numbers.push(...n);
    }

    let sum = 0;
    for (const number of numbers) {
        if (getNeighbourSymbols(number, lines).length > 0) {
            sum += number.number;
        }
    }

    return sum;
}

function parseNumbers(line, row) {
    let insideNumber = false;
    let currentNumber = '';
    let startCol = 0, endCol = 0;
    const result = [];

    for (let i = 0; i < line.length; i++) {
        if (isDigit(line[i])) {
            if (!insideNumber) {
                insideNumber = true;
                startCol = i;
                currentNumber = '';
            }
            currentNumber += line[i];
        } else {
            if (insideNumber) {
                insideNumber = false;
                endCol = i;
                result.push({
                    startCol,
                    endCol: endCol - 1,
                    row,
                    number: parseInt(currentNumber)
                });
            }
        }
    }

    if (insideNumber) {
        result.push({
            startCol,
            endCol: line.length - 1,
            row,
            number: parseInt(currentNumber)
        })
    }

    return result;
}

function getNeighbourSymbols(number, lines) {
    const row = number.row;
    const symbols = [];
    let symbol;
    
    if ((symbol = getSymbol(row, number.startCol - 1, lines))) 
        symbols.push({...symbol});
    if ((symbol = getSymbol(row - 1, number.startCol - 1, lines)))
        symbols.push({...symbol});
    if ((symbol = getSymbol(row + 1, number.startCol - 1, lines)))
        symbols.push({...symbol});

    for (let col = number.startCol; col <= number.endCol; col++) {
        if ((symbol = getSymbol(row - 1, col, lines)))
            symbols.push({...symbol});
        if ((symbol = getSymbol(row + 1, col, lines)))
            symbols.push({...symbol});
    }

    if ((symbol = getSymbol(row, number.endCol + 1, lines)))
        symbols.push({...symbol});
    if ((symbol = getSymbol(row - 1, number.endCol + 1, lines)))
        symbols.push({...symbol});
    if ((symbol = getSymbol(row + 1, number.endCol + 1, lines)))
        symbols.push({...symbol});

    return symbols;
}

function getSymbol(row, col, lines) {
    if (row < 0 || col < 0) {
        return false;
    }
    if (row >= lines.length || col >= lines[0].length) {
        return false;
    }

    const c = lines[row][col];
    if (!isDigit(c) && c !== '.') {
        return {symbol: c, row, col}
    }

    return false;
}

function isDigit(c) {
    return c >= '0' && c <= '9';
}

const symbols = {};

function part2(input) {
    const lines = input.split('\n');
    const numbers = [];
    
    for (let i = 0; i < lines.length; i++) {
        const n = parseNumbers(lines[i], i);

        numbers.push(...n);
    }

    for (const number of numbers) {
        const neighbours = getNeighbourSymbols(number, lines);
        for (const symbol of neighbours) {
            const key = `${symbol.row}-${symbol.col}`;
            if (!(key in symbols)) {
                symbols[key] = {symbol: symbol.symbol, numbers: []};
            }
            symbols[key].numbers.push(number.number);
        }
    }

    let sum = 0;
    for (const symbol of Object.values(symbols)) {
        if (symbol.symbol === '*' && symbol.numbers.length === 2) {
            sum += symbol.numbers[0] * symbol.numbers[1];
        }
    }

    return sum;
}

module.exports = {part1, part2};