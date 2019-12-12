const fs = require('fs');
const Moon = require('./moon');
const Simulation = require('./simulation');

const main = () => {
    const moons = getPuzzleInput();
    const solution = solve(moons);
    console.log(`Solution: ${ solution }`);
}

const getPuzzleInput = () => {
    // const moons = [
        // new Moon([-1, 0, 2]),
        // new Moon([2, -10, -7]),
        // new Moon([4, -8, 8]),
        // new Moon([3, 5, -1])
    // ];
    const moons = [
        new Moon([14, 9,  14]),
        new Moon([9,  11, 6]),
        new Moon([-6, 14, -4]),
        new Moon([4,  -4, -3]),
    ]
    return moons
}

const solve = (moons) => {
    const simulation = new Simulation(moons);
    console.log(moons)
    simulation.show();
    for (let i=0; i<1000; i++)
        simulation.step();
    simulation.show();
    return simulation.getTotalEnergy();
}

main();

