const fs = require('fs');
const Biosphere2 = require('./biosphere2');

const INPUT_FILE = '../input.txt';
//const INPUT_FILE = '../example.txt';

const main = () => {
    const map = getPuzzleInput();
    const solution = solve(map);
    console.log(`Solution: ${ solution }`);
}

const getPuzzleInput = () => {
    const map = fs.readFileSync(INPUT_FILE, 'utf8')
        .match(/[^\r\n]+/g)
        .map(line => line.split(''));
    return map;
}

const solve = (map) => {
    const biosphere = new Biosphere2(map);
    let count = 0;
    for (let i =0; i<200; i++) {
        biosphere.process();
        count = biosphere.getBugCount();
    }

    return count;
}

main();
