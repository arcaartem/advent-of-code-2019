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

    let lastY, currentY;
    for(;;) {
        while (network.cycle());

        let [x, y] = network.natQueue;
        console.log(`NAT: ${x}, ${y}`);
        network.natQueue = undefined;
        lastY = currentY;
        currentY = y;

        if (currentY == lastY) {
            return currentY;
        }

        network.inputQueue['0'] = [x, y];
    }
}

main();
