const { STATUS, DIRECTION } = require('./constants');

function movingTo(currentPos, direction) {
    const [x, y] = currentPos;

    switch (direction) {
        case DIRECTION.NORTH: return [x, y + 1];
        case DIRECTION.SOUTH: return [x, y - 1];
        case DIRECTION.WEST:  return [x - 1, y];
        case DIRECTION.EAST:  return [x + 1, y];
        default:
            throw `Unknown direction: ${ direction }`;
    }
}

class Maze {
    constructor(drone) {
        this.drone = drone;
        this.map = Array.from(Array(100), e => Array.from(Array(100)));
        this.currentPos = [50, 50];
        this.initialPos = [50, 50];
    }

    visit(direction) {
        const nextPos = movingTo(this.currentPos, direction);
        let status = this.drone.move(direction);
        this.markPosition(nextPos, status);
        switch (status) {
            case STATUS.WALL: 
                break;
            case STATUS.MOVE_OK: 
                this.currentPos = nextPos;
                break;
            case STATUS.FOUND: 
                this.currentPos = nextPos;
                this.targetPos = nextPos;
                break;
            default: 
                throw `Unknown status ${ status } (of type ${ typeof status })`;
        }
        return status;
    }

    markPosition(pos, status) {
        const [x, y] = pos;
        this.map[y][x] = status;
    }

    getAdjacentPositions(pos) {
        const [x, y] = pos;
        const adjacents = [];
        adjacents.push([x-1, y]);
        adjacents.push([x+1, y]);
        adjacents.push([x, y-1]);
        adjacents.push([x, y+1]);
        return adjacents;
    }

    showMap() {
        function paintCell(cell) {
            switch (cell) {
                case STATUS.WALL: return '#';
                case STATUS.MOVE_OK: return '.';
                case STATUS.FOUND: return 'O';
                case undefined: return ' ';
                default: return cell;
            }
        }

        const maze = Array.from(this.map, e => Array.from(e));
        let [x, y] = this.initialPos;
        maze[y][x] = 'I';
        [x, y] = this.currentPos;
        maze[y][x] = 'R';
        console.log(maze.map(line => line.map(paintCell).join("")).reverse().join('\n'));
    }
}

module.exports = Maze;
