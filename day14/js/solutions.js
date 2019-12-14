const fs = require('fs');
const PuzzleReader = require('./puzzle-reader');
const Part1Solver = require('./solver-part1');

const puzzleReader = new PuzzleReader('../input.txt');
const puzzleInput = puzzleReader.read();

const part1Solver = new Part1Solver(puzzleInput);
const part1Solution = part1Solver.findSolution();

console.log(`Part 1 Solution: ${ part1Solution }`);
