const fs = require('fs');
const readline = require('readline-sync');
const Drone = require('./drone');
const Maze = require('./maze');

const INPUT_FILE = '../input.txt';

class PathExplorer {
    constructor(drone, maze) {
        this.drone = drone;
        this.maze = maze;
    }

    stillExploring() {
        return this.maze.targetPos == undefined;
    }

    explore() {
        this.pendingDirections = [1, 2, 3, 4];
        while (pendingDirections.length > 0) {
            const nextDirection = pendingDirections.pop();
            this.exploreDirection(pendingDirections);
        }
    }

    exploreDirection(direction) {
        this.drone.move(direction);
    }
}

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
    const drone = new Drone(program);
    const maze = new Maze();
    const pathFinder = new PathExplorer(drone, maze);
    maze.showMap();
     
    while (pathFinder.stillExploring()) {
        pathFinder.explore();
        maze.showMap();
    }


    console.log(maze.initialPos, maze.targetPos);
    return maze.targetPos;
}

main();

