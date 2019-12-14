const fs = require('fs');
const PuzzleReader = require('./puzzle-reader');
const Part1Solver = require('./solver-part1');

const puzzleReader = new PuzzleReader('../input.txt');
const puzzleInput = puzzleReader.read();

const part1Solver = new Part1Solver(puzzleInput);
const solution = part1Solver.findSolution();

console.log(`Solution: ${ solution }`);
