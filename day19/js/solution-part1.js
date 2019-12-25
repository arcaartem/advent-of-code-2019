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
    let count = 0;
    for (let y=0; y<50; y++) {
        for (let x=0; x<50; x++) {
            const computer = new IntcodeComputer(program);
            computer.input.push(x);
            computer.input.push(y);
            computer.runProgram();
            let output = computer.output.shift();
            if (output == 1)
                count++;
        }
    }
    return count;
}

main();
