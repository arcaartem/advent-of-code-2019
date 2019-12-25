function createNewMap() {
    return Array.from(Array(7), e => Array.from(Array(7), e2 => '.'));
}

class Biosphere2 {
    constructor(map) {
        this.maps = Array.from(Array(500), e => createNewMap());
        for (let y=0; y<5; y++) {
            for (let x=0; x<5; x++) {
                this.maps[250][y+1][x+1] = map[y][x];
            }
        }
    }

    showMap(map) {
        console.log(map.map(line => line.join('')).join('\n'));
        console.log();
    }

    getBugCount() {
        let count = 0;
        for (let i=0; i<500; i++) {
            for (let y=1; y<6; y++) {
                for (let x=1; x<6; x++) {
                    if (this.maps[i][y][x] == '#') {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    process() {
        let nextMaps = Array.from(Array(500), e => createNewMap());
        for (let i=1; i<499; i++) {
            nextMaps[i] = this.processMap(i);
        }

        this.maps = nextMaps;
    }

    processMap(i) {
        const newMap = createNewMap();
        const map = this.maps[i];
        for (let y=1; y<6; y++) {
            for (let x=1; x<6; x++) {
                const bugCount = this.countAdjacentBugs(i, x, y);
                if (map[y][x] == '#' && bugCount != 1) {
                    newMap[y][x] = '.';
                } else if (map[y][x] == '.' && (bugCount == 1 || bugCount == 2)) {
                    newMap[y][x] = '#';
                } else {
                    newMap[y][x] = map[y][x];
                }
            }
        }
        return newMap;
    }

    countCell(map, x, y) {
        return map[y][x] == '#' ? 1 : 0;
    }

    countUp(i, x, y) {
        if (x == 3 && y == 3) {
            return 0;
        }

        const map = this.maps[i];
        const upMap = this.maps[i-1];
        const downMap = this.maps[i+1];

        if (y == 1) {
            return this.countCell(upMap, 3, 2);
        }

        if (x == 3 && y == 4) {
            return this.countCell(downMap, 1, 5) + this.countCell(downMap, 2, 5) + this.countCell(downMap, 3, 5) + this.countCell(downMap, 4, 5) + this.countCell(downMap, 5, 5);
        }

        return this.countCell(map, x, y-1);
    }

    countDown(i, x, y) {
        if (x == 3 && y == 3) {
            return 0;
        }

        const map = this.maps[i];
        const upMap = this.maps[i-1];
        const downMap = this.maps[i+1];

        if (y == 5) {
            return this.countCell(upMap, 3, 4);
        }

        if (x == 3 && y == 2) {
            return this.countCell(downMap, 1, 1) + this.countCell(downMap, 2, 1) + this.countCell(downMap, 3, 1) + this.countCell(downMap, 4, 1) + this.countCell(downMap, 5, 1);
        }

        return this.countCell(map, x, y+1);
    }

    countLeft(i, x, y) {
        if (x == 3 && y == 3) {
            return 0;
        }

        const map = this.maps[i];
        const upMap = this.maps[i-1];
        const downMap = this.maps[i+1];

        if (x == 1) {
            return this.countCell(upMap, 2, 3);
        }

        if (x == 4 && y == 3) {
            return this.countCell(downMap, 5, 1) + this.countCell(downMap, 5, 2) + this.countCell(downMap, 5, 3) + this.countCell(downMap, 5, 4) + this.countCell(downMap, 5, 5);
        }

        return this.countCell(map, x-1, y);
    }

    countRight(i, x, y) {
        if (x == 3 && y == 3) {
            return 0;
        }

        const map = this.maps[i];
        const upMap = this.maps[i-1];
        const downMap = this.maps[i+1];

        if (x == 5) {
            return this.countCell(upMap, 4, 3);
        }

        if (x == 2 && y == 3) {
            return this.countCell(downMap, 1, 1) + this.countCell(downMap, 1, 2) + this.countCell(downMap, 1, 3) + this.countCell(downMap, 1, 4) + this.countCell(downMap, 1, 5);
        }

        return this.countCell(map, x+1, y);
    }

    countAdjacentBugs(i, x, y) {
        let count = this.countUp(i, x , y) + this.countDown(i, x, y) + this.countLeft(i, x, y) + this.countRight(i, x, y);
        return count;
    }
}

module.exports = Biosphere2;
