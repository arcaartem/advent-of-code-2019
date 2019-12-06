const fs = require('fs');

const INPUT_FILE = '../input.txt';

const main = () => {
    let orbitData = getPuzzleInput(INPUT_FILE);
    const part1Solution = solvePart1(orbitData);
    const part2Solution = solvePart2(orbitData);

    console.log(`Part 1 Solution: ${ JSON.stringify(part1Solution) }`);
    //console.log(`Part 2 Solution: ${ part2Solution }`);
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
    return orbitData;
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
    if (planet == "COM") {
        return 0;
    }

    return countOrbit(orbitMap, orbitMap[planet]) + 1;
}

main();
