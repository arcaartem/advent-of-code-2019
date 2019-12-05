const fs = require('fs');

const INPUT_FILE = '../input.txt';

const main = () => {
    let program = getPuzzleInput(INPUT_FILE);
    const part1Solution = solvePart1(program);
    const part2Solution = solvePart2(program);

    console.log(`Part 1 Solution: ${ part1Solution }`);
    console.log(`Part 2 Solution: ${ part2Solution }`);
}

const getPuzzleInput = (filename) => {
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
    const strings = fileContent.split(',');
    const program = strings.map(string => parseInt(string));
    return program;
}

const solvePart1 = (program) => {
    const result = runProgram(program, 12, 2);
    return result;
}

const solvePart2 = (program) => {
    const result = runProgram(program, 12, 2);
    return result;
}

const runProgram = (program) => {
    let memory = [...program];
    let memoryIndex = 0;

    for (;;)
    {
        let { instruction, newMemoryIndex } = fetchInstruction(memory, memoryIndex);
        memoryIndex = newMemoryIndex;
        console.log(JSON.stringify(instruction));
        
        switch (instruction.opcode) {
            case opcodes.ADD:
                do_add(instruction, memory);
                break;
            case opcodes.MULTIPLY:
                do_multiply(instruction, memory);
                break;
            case opcodes.INPUT:
                do_input(instruction, memory);
                break;
            case opcodes.OUTPUT:
                do_output(instruction, memory);
                break;
            case opcodes.HALT:
                return;
            case opcodes.UNKNOWN:
                break;
            default:
                throw new Error(`Invalid instruction: ${ instruction }`);
        }
    };
}


const do_add = (instruction, memory) => {
    const result = instruction.source1 + instruction.source2;
    memory[instruction.target] = result;
}

const do_multiply = (instruction, memory) => {
    const result = instruction.source1 * instruction.source2;
    memory[instruction.target] = result;
}

const do_input = (instruction, memory) => {
console.log(`INPUT: ${ instruction.target }`)
    memory[instruction.target] = 1;
}

const do_output = (instruction, memory) => {
console.log(`OUTPUT: ${ memory[instruction.target] }`)
}

const fetchInstruction = (memory, memoryIndex) => {
    let instruction = decodeInstruction(memory, memoryIndex);
    let newMemoryIndex = instruction.advanceIndex(memoryIndex);
    return { instruction, newMemoryIndex }
}

const decodeInstruction = (memory, memoryIndex) => {
    let opcodeString = memory[memoryIndex].toString().padStart(5, '0');
    let [ mode3rd, mode2nd, mode1st ] = opcodeString.slice(0, 3);
    let opcode = opcodeString.slice(3);
    switch (opcode) {
        case '01':
            return {
                opcode: opcodes.ADD,
                source1: fetchParameter(memory, memory[memoryIndex + 1], mode1st),
                source2: fetchParameter(memory, memory[memoryIndex + 2], mode2nd),
                target: fetchParameter(memory, memory[memoryIndex + 3], mode3rd),
                advanceIndex: (currentIndex) => currentIndex + 4
            };
        case '02':
            return {
                opcode: opcodes.MULTIPLY,
                source1: fetchParameter(memory, memory[memoryIndex + 1], mode1st),
                source2: fetchParameter(memory, memory[memoryIndex + 2], mode2nd),
                target: fetchParameter(memory, memory[memoryIndex + 3], mode3rd),
                advanceIndex: (currentIndex) => currentIndex + 4
            };
        case '03':
            return {
                opcode: opcodes.INPUT,
                target: fetchParameter(memory, memory[memoryIndex + 1], mode3rd),
                advanceIndex: (currentIndex) => currentIndex + 2
            };
        case '04':
            return {
                opcode: opcodes.OUTPUT,
                target: fetchParameter(memory, memory[memoryIndex + 1], mode3rd),
                advanceIndex: (currentIndex) => currentIndex + 2
            };
        case '99':
            return {
                opcode: opcodes.HALT,
                advanceIndex: (currentIndex) => currentIndex + 1
            };
        default:
            return {
                opcode: opcodes.UNKNOWN,
                advanceIndex: (currentIndex) => currentIndex + 1
            }
    }
}

const fetchParameter = (memory, memoryValue, mode) => {
    const parameter = (mode == '0') ? memory[memoryValue] : memoryValue;
    console.log(mode, memory[memoryValue], memoryValue, parameter);
    return parameter;
}

const opcodes = {
    ADD: 'add',
    MULTIPLY: 'multiply',
    INPUT: 'input',
    OUTPUT: 'output',
    HALT: 'halt',
    UNKNOWN: 'unknown'
}

const parameterModes = {
    POSITION: 'position',
    IMMEDIATE: 'immediate',
}

main();
