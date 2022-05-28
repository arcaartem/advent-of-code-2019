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
    let mx = 1500;
    let my = 1500;
    let map = Array.from(Array(my), e => Array.from(Array(mx), e2 => '.'));
    for (let y=1000; y<my; y++) {
        console.error(y);
        for (let x=0; x<mx; x++) {
            const computer = new IntcodeComputer(program);
            computer.input.push(x);
            computer.input.push(y);
            computer.runProgram();
            let output = computer.output.shift();
            if (output == 1)
                map[y][x] = '#';
        }
    }
    console.log(map.map(line => line.join("")).join('\n'));
    return count;
}

main();
