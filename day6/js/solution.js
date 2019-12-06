const fs = require('fs');

const INPUT_FILE = '../input.txt';

const main = () => {
    const orbitData = getPuzzleInput(INPUT_FILE);
    const orbitCalculator = new OrbitCalculator(orbitData);

    const part1Solution = orbitCalculator.countOrbits();
    const part2Solution = orbitCalculator.countOrbitalTransfers('YOU', 'SAN');

    console.log(`Part 1 Solution: ${ part1Solution }`);
    console.log(`Part 2 Solution: ${ part2Solution }`);
}

const getPuzzleInput = (filename) => {
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
    const lines = fileContent.match(/[^\r\n]+/g);
    return lines.map(line => line.split(')'));
}

class OrbitCalculator {
    constructor(orbitData) {
        this.orbitMap = {};
        orbitData.forEach(([left, right]) => this.orbitMap[right] = left);
    }

    countOrbits() {
        const planets = Object.keys(this.orbitMap);
        return planets.map(planet => this.countOrbit(planet))
                      .reduce((total, current) => total + current);
    }

    countOrbit(planet) {
        return (planet == 'COM') ? 0 : (this.countOrbit(this.orbitMap[planet]) + 1);
    }

    pathToCom(planet) {
        let current = planet;
        let trail = [];
        while (current != 'COM') {
            current = this.orbitMap[current];
            trail.unshift(current);
        }
        return trail;
    }

    countOrbitalTransfers(from, to) {
        const path1 = this.pathToCom(from);
        const path2 = this.pathToCom(to);

        while (path1[0] == path2[0]) {
            path1.shift();
            path2.shift();
        }

        return path1.length + path2.length;
    }
}

main();
