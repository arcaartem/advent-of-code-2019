const fs = require('fs');
const IntcodeComputer = require('./intcode-computer');

const INPUT_FILE = '../input.txt';

const main = () => {
    const program = getPuzzleInput();
    const solution = solve(program);
    console.log(`Solution: ${ solution }`);
}

const getPuzzleInput = () => {
    const program = fs.readFileSync(INPUT_FILE, 'utf8')
        .split(',')
        .map((i) => parseInt(i));
    return program;
}

const solve = (program) => {
    const initialPhaseSettings = [0, 1, 2, 3, 4];
    const results = permutations(initialPhaseSettings).map(phaseSettings => calculateThrust(program, phaseSettings));
    const result = Math.max(...results);
    return result;
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

const calculateThrust = (program, phaseSettings) => {
    const amps = phaseSettings.map((phaseSetting) => {
        const amp = new IntcodeComputer(program);
        amp.input.push(phaseSetting);
        return amp;
    });

    amps[0].input.push(0)
    while (!amps.every((amp) => amp.halted)) {
        let current, next;
        for (var i=0; i<amps.length-1; i++) {
            current = amps[i];
            next = amps[i+1];
            current.runProgram();
            next.input.push(current.output.shift());
        }
        next.runProgram();
    }

    return amps[amps.length-1].output.shift();
}

main();
