const fs = require('fs');
const PuzzleReader = require('./puzzle-reader');
const Part1Solver = require('./solver-part1');
const Part2Solver = require('./solver-part2');

const puzzleReader = new PuzzleReader('../input.txt');
const puzzleInput = puzzleReader.read();

const part1Solution = new Part1Solver(puzzleInput).findSolution();
const part2Solution = new Part2Solver(puzzleInput).findSolution();

console.log(`Part 1 Solution: ${ part1Solution }`);
console.log(`Part 2 Solution: ${ part2Solution }`);
