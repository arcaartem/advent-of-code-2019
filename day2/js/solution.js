const fs = require('fs');

const INPUT_FILE = '../input.txt';

const main = () => {
    let opcodes = getPuzzleInput(INPUT_FILE);
    const part1Solution = solvePart1(opcodes);
    const part2Solution = solvePart2(opcodes);

    console.log(`Part 1 Solution: ${ part1Solution }`);
    console.log(`Part 2 Solution: ${ part2Solution }`);
}

const getPuzzleInput = (filename) => {
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
    const strings = fileContent.split(',');
    const opcodes = strings.map(string => parseInt(string));
    return opcodes;
}

const solvePart1 = (opcodes) => {
    const result = runProgram(opcodes, 12, 2);
    return result;
}

const solvePart2 = (opcodes) => {
    const expectedResult = 19690720;
    
    for (var noun = 0; noun <= 99; noun++) {
        for (var verb = 0; verb <= 99; verb++) {
            const result = runProgram(opcodes, noun, verb)
            if (result == expectedResult) {
                return 100 * noun + verb;
            }
        }
    }
}

const runProgram = (opcodes, noun, verb) => {
    let memory = [...opcodes];

    memory[1] = noun;
    memory[2] = verb;

    let memoryIndex = 0;
    while (memory[memoryIndex] != 99) {
        let [ opcode, sourceIndex1, sourceIndex2, targetIndex ] = memory.slice(memoryIndex, memoryIndex + 4);
        let source1 = memory[sourceIndex1];
        let source2 = memory[sourceIndex2];
        const result = (opcode == 1)
            ? (source1 + source2)
            : (source1 * source2);
        memory[targetIndex] = result;
        memoryIndex += 4;
    }
    return memory[0];
}

main();
