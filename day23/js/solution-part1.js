const fs = require('fs');
const IntcodeComputer = require('./intcode-computer');
const Network = require('./network');

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
    const computers = [];
    const network = new Network(); 
    for (let id=0; id<50; id++) {
        let computer = new IntcodeComputer(program);
        network.attach(computer, id);
    }

    while (network.cycle());
    return network.natQueue[1];
}

main();
