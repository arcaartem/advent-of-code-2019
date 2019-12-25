class Biosphere {
    constructor(map) {
        this.map = map;
    }

    showMap() {
        console.log(this.map.map(line => line.join('')).join('\n'));
        console.log();
    }

    process() {
        const newMap = Array.from(Array(5), e => Array.from(Array(5)));
        for (let y=0; y<5; y++) {
            for (let x=0; x<5; x++) {
                const bugCount = this.countAdjacentBugs(x, y);
                if (this.map[y][x] == '#' && bugCount != 1) {
                    newMap[y][x] = '.';
                } else if (this.map[y][x] == '.' && (bugCount == 1 || bugCount == 2)) {
                    newMap[y][x] = '#';
                } else {
                    newMap[y][x] = this.map[y][x];
                }
            }
        }
        this.map = newMap;
    }

    countAdjacentBugs(x, y) {
        let count = 0;
        if ((this.map[y] || [])[x-1] == '#') {
            count++;
        }
        if ((this.map[y] || [])[x+1] == '#') {
            count++;
        }
        if ((this.map[y-1] || [])[x] == '#') {
            count++;
        }
        if ((this.map[y+1] || [])[x] == '#') {
            count++;
        }

        return count;
    }

    getBiodiversity() {
        let multiplier = 1;
        let sum = 0;
        for (let y=0; y<5; y++) {
            for (let x=0; x<5; x++) {
                if (this.map[y][x] == '#') {
                    sum += multiplier;
                }
                multiplier *= 2;
            }
        }

        return sum;
    }
}

module.exports = Biosphere;
