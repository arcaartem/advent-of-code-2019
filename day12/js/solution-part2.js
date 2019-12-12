const fs = require('fs');
const Moon = require('./moon');
const Simulation = require('./simulation');

const main = () => {
    const moons = getPuzzleInput();
    const solution = solve(moons);
    console.log(`Solution: ${ solution }`);
}

const getPuzzleInput = () => {
    const moons = [
        new Moon([14,   9,  14]),
        new Moon([ 9,  11,   6]),
        new Moon([-6,  14,  -4]),
        new Moon([ 4,  -4,  -3]),
    ];
    return moons
}

const solve = (moons) => {
    const simulation = new Simulation(moons);
    let p1 = simulation.findPeriods(0);
    let p2 = simulation.findPeriods(1);
    let p3 = simulation.findPeriods(2);
    console.log('Find lowest common multiplier of these numbers:');
    console.log(BigInt(p1), BigInt(p2), BigInt(p3));
}

main();
