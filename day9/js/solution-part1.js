const fs = require('fs');
const IntcodeComputer = require('./intcode-computer');

const INPUT_FILE = '../input.txt';

const main = () => {
    const program = getPuzzleInput();
    const solution = solve(program);
    console.log(`Solution: ${ solution }`);
}

const getPuzzleInput = () => {
    const program = fs.readFileSync(INPUT_FILE, 'utf8')
        .split(',')
        .map((i) => BigInt(i));
    return program;
}

const solve = (program) => {
    const computer = new IntcodeComputer(program);
    computer.input.push(1);
    computer.runProgram();
    if (!computer.halted) {
        throw 'Computer needs more time'
    }
    const result = computer.output;
    return result;
}

main();
