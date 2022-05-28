const { STATUS, DIRECTION } = require('./constants');
const fs = require('fs');
const readline = require('readline-sync');
const Drone = require('./drone');
const Maze = require('./maze');

const INPUT_FILE = '../input.txt';

class PathExplorer {
    constructor(maze) {
        this.maze = maze;
        this.pendingDirections = [1];
    }

    stillExploring() {
        return this.maze.targetPos == undefined;
    }

    exploreMaze(direction) {
        let status = this.maze.visit(direction);
        this.maze.showMap();
        if (status == STATUS.WALL) return false;
        if (status == STATUS.FOUND) return true;
        this.path.push(direction);
        for (let d of this.getUnexplored()) {
            if (this.exploreMaze(d)) return true;
        }
        this.maze.visit(this.getOppositeDirection(direction));
        this.path.pop();
        return false;
    }
    explore() {
        this.path = [];
        for (let d of this.getUnexplored()) {
            if (this.exploreMaze(d))
            {
                console.log(this.path, this.path.length);
                return true;
            }
        }
    }

    getUnexplored() {
        const [x, y] = this.maze.currentPos;
        const unexplored = [];
        if (this.maze.map[y][x-1] == undefined) unexplored.push(3);
        if (this.maze.map[y][x+1] == undefined) unexplored.push(4);
        if (this.maze.map[y-1][x] == undefined) unexplored.push(2);
        if (this.maze.map[y+1][x] == undefined) unexplored.push(1);
        return unexplored;
    }

    getOppositeDirection(direction) {
        if (direction == 1) return 2;
        if (direction == 2) return 1;
        if (direction == 3) return 4;
        if (direction == 4) return 3;
        throw `Invalid direction: ${direction}`;
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
    const maze = new Maze(drone);
    const pathFinder = new PathExplorer(maze);
    maze.showMap();
     
    pathFinder.explore();

    console.log(maze.initialPos, maze.targetPos);
    return maze.targetPos;
}

main();

