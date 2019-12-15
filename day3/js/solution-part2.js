const PuzzleReader = require('./puzzle-reader');
const CrossFinder = require('./cross-finder');

const main = () => {
    const puzzleReader = new PuzzleReader('../input.txt');
    let wirePaths = puzzleReader.read();
    console.log(wirePaths);
    const solution = solve(wirePaths);

    console.log(`Solution: ${ solution }`);
}

const distance = ({ distance1, distance2 }) => distance1 + distance2;

const solve = ([wirePath1, wirePath2]) => {
    const crossFinder = new CrossFinder(wirePath1, wirePath2);
    const crossings = crossFinder.findCrossings();
    console.log(crossings);

    return Math.min(...crossings.map(distance));
}

main();
