const PuzzleReader = require('./puzzle-reader');
const CrossFinder = require('./cross-finder');

const main = () => {
    const puzzleReader = new PuzzleReader('../input.txt');
    let wirePaths = puzzleReader.read();
    const solution = solve(wirePaths);

    console.log(`Solution: ${ solution }`);
}

const manhattanDistance = ({cross}) => {
    return Math.abs(cross[0]) + Math.abs(cross[1]);
}

const solve = ([wirePath1, wirePath2]) => {
    const crossFinder = new CrossFinder(wirePath1, wirePath2);
    const crossings = crossFinder.findCrossings();

    return Math.min(...crossings.map(manhattanDistance));
}

main();
