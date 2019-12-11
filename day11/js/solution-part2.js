const fs = require('fs');
const IntcodeComputer = require('./intcode-computer');
const Robot = require('./robot');

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

const showPanel = (panel) => {
    console.log(panel.map(p => p.join("")).reverse().join("\n"));
}

const solve = (program) => {
    const panel = Array.from(Array(15)).map(e => Array.from(Array(60), e => '.'));
    panel[10][10] = '#';
    const robot = new Robot(panel, 10, 10);
    let commandType = 0;

    const input = () => robot.look(); 

    const output = (value) => {
        if (commandType == 0) {
            robot.paint(Number(value));
            commandType = 1;
        } else {
            robot.move(Number(value));
            commandType = 0;
        }
    }

    const computer = new IntcodeComputer(program, input, output);

    while (!computer.halted)
        computer.runProgram();
    showPanel(panel);

    return Object.keys(robot.trail).length;
}

main();
