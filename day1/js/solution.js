const fs = require('fs');

const INPUT_FILE = '../input.txt';

const getMass = (line) => parseInt(line, 10);

const getFuelRequirement = (mass, recurse = false) => {
  const fuelRequirement = Math.floor(mass / 3) - 2;

  if (fuelRequirement <= 0) {
    return 0;
  }

  return (recurse)
    ? fuelRequirement + getFuelRequirement(fuelRequirement, true)
    : fuelRequirement;
}

const getFileLines = (filename) => {
  const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
  const lines = fileContent.match(/[^\r\n]+/g);
  return lines;
}
const calculateTotalFuelRequirement = (simple = false) => {
  const lines = getFileLines(INPUT_FILE);
  const masses = lines.map(line => getMass(line));
  const fuelRequirements = masses.map(mass => getFuelRequirement(mass, simple));
  const totalFuelRequirement = fuelRequirements.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  return totalFuelRequirement;
}

const solutionForPart1 = calculateTotalFuelRequirement();
const solutionForPart2 = calculateTotalFuelRequirement(true);

console.log(`Part 1 Solution: ${ solutionForPart1 }`);
console.log(`Part 2 Solution: ${ solutionForPart2 }`);
