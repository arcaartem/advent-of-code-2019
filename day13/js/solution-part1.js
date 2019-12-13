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

    let outputParameters = []
    const output = (value) => {
        if (outputParameters.length == 3) {
            let [x, y, tileId] = outputParameters;
            arcade.draw(x, y, tileId)
            outputParameters = [Number(value)];
        } else {
            outputParameters.push(Number(value));
        }
    }

    const input = () => 0; 
    const computer = new IntcodeComputer(program, input, output);

    while (!computer.halted)
    {
        computer.runProgram();
        arcade.showPanel();
    }

    const count = arcade.panel.reduce((count, line) => count += line.reduce((count, char) => count += (char =='#' ? 1 : 0), 0), 0)
    return count;
}

main();

