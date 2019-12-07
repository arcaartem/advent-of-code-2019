const fs = require('fs');
const IntcodeComputer = require('./intcode-computer');

const INPUT_FILE = '../input.txt';

const main = () => {
    let program = getPuzzleInput(INPUT_FILE);

    const solution = solve(program);

    console.log(`Solution: ${ solution }`);
}

const getPuzzleInput = (filename) => {
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
    const strings = fileContent.split(',');
    const program = strings.map(string => parseInt(string));
    return program;
}


const permutations = (values) => {

  if (values.length === 1) {
    return values;
  }

  const results = [];
  for (let i = 0; i < values.length; i++) {
    var firstValue = values[i];
    var valuesLeft = values.filter(item => item !== firstValue );
    var innerPermutations = permutations(valuesLeft);
    
    for (var j = 0; j < innerPermutations.length; j++) {
      results.push([firstValue].concat(innerPermutations[j]));
    }
  }
    
  return results;
}

const solve = (program) => {
    const result = permutations([5, 6, 7, 8, 9]).map(permutation => calculateThrust(program, permutation)).reduce((acc, cur) => cur > acc ? cur : acc);
    return result;
}

const calculateThrust = (program, phaseSettings) => {
    console.log('Permutation:', phaseSettings);
    const amp1 = new IntcodeComputer(program);
    amp1.input.push(phaseSettings.shift());
    amp1.input.push(0);
    const amp2 = new IntcodeComputer(program);
    amp2.input.push(phaseSettings.shift());
    const amp3 = new IntcodeComputer(program);
    amp3.input.push(phaseSettings.shift());
    const amp4 = new IntcodeComputer(program);
    amp4.input.push(phaseSettings.shift());
    const amp5 = new IntcodeComputer(program);
    amp5.input.push(phaseSettings.shift());

    let state1 = false;
    for (let i=0;; i++) {
      console.log('   Cycle:', i);
      if (amp5.output.length > 0)
        amp1.input.push(amp5.output.shift());

      state1 = amp1.runProgram();
      if (amp1.output.length > 0)
        amp2.input.push(amp1.output.shift());

      state2 = amp2.runProgram();
      if (amp2.output.length > 0)
        amp3.input.push(amp2.output.shift());
      state3 = amp3.runProgram();
      
      if (amp3.output.length > 0)
        amp4.input.push(amp3.output.shift());
      state4 = amp4.runProgram();

      if (amp4.output.length > 0)
        amp5.input.push(amp4.output.shift());
      state5 = amp5.runProgram();

      if (state1 && state2 && state3 && state4 && state5) break;
    }

    return amp5.output.shift();
}

main();
