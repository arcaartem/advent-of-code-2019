const fs = require('fs');
const IntcodeComputer = require('./intcode-computer');
const Arcade = require('./arcade');

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
    const arcade = new Arcade();

    const input = () => arcade.getInput(); 
    const output = (value) => arcade.pushOutput(value)

    program[0] = 2;
    const computer = new IntcodeComputer(program, input, output);

    while (!computer.halted)
    {
        computer.runProgram();
    }

    return arcade.score;
}

main();
