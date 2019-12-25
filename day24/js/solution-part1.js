const fs = require('fs');
const Biosphere = require('./biosphere');

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
    const biosphere = new Biosphere(map);
    const biodiversityHistory = new Set();
    let biodiversity = biosphere.getBiodiversity();

    while (!biodiversityHistory.has(biodiversity)) {
        biodiversityHistory.add(biodiversity);
        biosphere.process();
        biodiversity = biosphere.getBiodiversity();
    }

    return biodiversity;
}

main();
