const PuzzleReader = require('./puzzle-reader');
const CrossFinder = require('./cross-finder');

const main = () => {
    const puzzleReader = new PuzzleReader('../input.txt');
    let wirePaths = puzzleReader.read();
    const solution = solve(wirePaths);

    console.log(`Solution: ${ solution }`);
}

const distance = (a) => {
    return Math.abs(a[0] - 0)+Math.abs(a[1] -0);
}

const solve = ([wirePath1, wirePath2]) => {
    const crossFinder = new CrossFinder(wirePath1, wirePath2);
    const crossings = crossFinder.findCrossings();

    return Math.min(...crossings.map(distance));
}

main();
