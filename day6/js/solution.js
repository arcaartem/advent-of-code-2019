const fs = require('fs');

const INPUT_FILE = '../input.txt';

const main = () => {
    let orbitData = getPuzzleInput(INPUT_FILE);
    const part1Solution = solvePart1(orbitData);
    const part2Solution = solvePart2(orbitData);

    console.log(`Part 1 Solution: ${ part1Solution }`);
    console.log(`Part 2 Solution: ${ part2Solution }`);
}

const getPuzzleInput = (filename) => {
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
    const lines = fileContent.match(/[^\r\n]+/g);
    const orbitData = lines.map(line => line.split(')'));
    return orbitData;
}

const solvePart1 = (orbitData) => {
    const orbitMap = buildMap(orbitData);
    const orbitCount = countOrbits(orbitMap);
    return  orbitCount;
}

const solvePart2 = (orbitData) => {
    const orbitMap = buildMap(orbitData);
    const orbitTransfers = countOrbitTransfers(orbitMap, orbitMap['YOU'], orbitMap['SAN']);
    return orbitTransfers;
}

const buildMap = (orbitData) => {
    let orbitMap = {};
    orbitData.forEach(([left, right]) => {
        orbitMap[right] = left;
    });
    return orbitMap;
}

const countOrbits = (orbitMap) => {
    const planets = Object.keys(orbitMap);
    const count = planets.map(planet => countOrbit(orbitMap, planet)).reduce((total, current) => total + current)
    return count;
}

const countOrbit = (orbitMap, planet) => {
    if (planet == 'COM') {
        return 0;
    }

    return countOrbit(orbitMap, orbitMap[planet]) + 1;
}

const countOrbitTransfers = (orbitMap, from, to, count = 0) => {
    console.log(`${path(orbitMap, from)} -> ${path(orbitMap, to)} (${count})`);
    if (from == to) {
        return count;
    }

    if (from == 'COM' || to == 'COM') {
        return null;
    }
    return Math.min(countOrbitTransfers(orbitMap, orbitMap[from], to, count + 1), countOrbitTransfers(orbitMap, from, orbitMap[to], count + 1));
}

const path = (orbitMap, planet) => {
    let current = planet;
    let p = planet;
    while (current != 'COM') {
        current = orbitMap[planet];
        p = p + '->' + current;
    }
    return p;
}

main();
