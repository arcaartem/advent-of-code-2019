const fs = require('fs');

const INPUT_FILE = '../input.txt';

const main = () => {
  const masses = getPuzzleInput(INPUT_FILE);

  const part1Solution = calculateTotalFuelRequirement(masses);
  const part2Solution = calculateTotalFuelRequirement(masses, true);

  console.log(`Part 1 Solution: ${ part1Solution }`);
  console.log(`Part 2 Solution: ${ part2Solution }`);
}

const getPuzzleInput = (filename) => {
  const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
  const lines = fileContent.match(/[^\r\n]+/g);
  return lines.map(line => parseInt(line, 10));
}

const calculateTotalFuelRequirement = (masses, includeFuelForFuel = false) => {
  const fuelRequirements = masses.map(mass => getFuelRequirement(mass, includeFuelForFuel));
  const totalFuelRequirement = fuelRequirements.reduce((total, current) => total + current, 0);
  return totalFuelRequirement;
}

const getFuelRequirement = (mass, incudeFuelForFuel = false) => {
  const fuelRequirement = Math.floor(mass / 3) - 2;

  if (fuelRequirement <= 0) {
    return 0;
  }

  return (incudeFuelForFuel)
    ? fuelRequirement + getFuelRequirement(fuelRequirement, true)
    : fuelRequirement;
}

main();
