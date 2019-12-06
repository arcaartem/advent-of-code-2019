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
        let instruction = fetchInstruction(memory, memoryIndex);
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
            case opcodes.JUMP_IF_TRUE:
                do_jump_if_true(instruction, memory);
                break
            case opcodes.JUMP_IF_FALSE:
                do_jump_if_false(instruction, memory);
                break
            case opcodes.LESS_THAN:
                do_less_than(instruction, memory);
                break
            case opcodes.EQUALS:
                do_equals(instruction, memory);
                break
            case opcodes.HALT:
                return;
            case opcodes.UNKNOWN:
                break;
            default:
                throw new Error(`Invalid instruction: ${ instruction }`);
        }

        memoryIndex = instruction.advanceIndex(memoryIndex);
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
    memory[instruction.target] = 5;
}

const do_output = (instruction, memory) => {
    console.log(`OUTPUT: ${ memory[instruction.target] }`)
}

const do_jump_if_true = (instruction, memory) => {
    if (instruction.source1 != 0) {
        instruction.advanceIndex = (currentIndex) => instruction.target;
    }
}

const do_jump_if_false = (instruction, memory) => {
    if (instruction.source1 == 0) {
        instruction.advanceIndex = (currentIndex) => instruction.target;
    }
}

const do_less_than = (instruction, memory) => {
    if (instruction.source1 < instruction.source2) {
        memory[instruction.target] = 1;
    } else {
        memory[instruction.target] = 0;
    }
}

const do_equals = (instruction, memory) => {
    if (instruction.source1 == instruction.source2) {
        memory[instruction.target] = 1;
    } else {
        memory[instruction.target] = 0;
    }
}
const fetchInstruction = (memory, memoryIndex) => {
    let instruction = decodeInstruction(memory, memoryIndex);
    return instruction;
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
                target: memory[memoryIndex + 3],
                advanceIndex: (currentIndex) => currentIndex + 4
            };
        case '02':
            return {
                opcode: opcodes.MULTIPLY,
                source1: fetchParameter(memory, memory[memoryIndex + 1], mode1st),
                source2: fetchParameter(memory, memory[memoryIndex + 2], mode2nd),
                target: memory[memoryIndex + 3],
                advanceIndex: (currentIndex) => currentIndex + 4
            };
        case '03':
            return {
                opcode: opcodes.INPUT,
                target: memory[memoryIndex + 1],
                advanceIndex: (currentIndex) => currentIndex + 2
            };
        case '04':
            return {
                opcode: opcodes.OUTPUT,
                target: memory[memoryIndex + 1],
                advanceIndex: (currentIndex) => currentIndex + 2
            };
        case '05':
            return {
                opcode: opcodes.JUMP_IF_TRUE,
                source1: fetchParameter(memory, memory[memoryIndex+1], mode1st),
                target: fetchParameter(memory, memory[memoryIndex+2], mode2nd),
                advanceIndex: (currentIndex) => currentIndex + 3
            };
        case '06':
            return {
                opcode: opcodes.JUMP_IF_FALSE,
                source1: fetchParameter(memory, memory[memoryIndex+1], mode1st),
                target: fetchParameter(memory, memory[memoryIndex+2], mode2nd),
                advanceIndex: (currentIndex) => currentIndex + 3
            };
        case '07':
            return {
                opcode: opcodes.LESS_THAN,
                source1: fetchParameter(memory, memory[memoryIndex+1], mode1st),
                source2: fetchParameter(memory, memory[memoryIndex+2], mode2nd),
                target: memory[memoryIndex + 3],
                advanceIndex: (currentIndex) => currentIndex + 4
            };
        case '08':
            return {
                opcode: opcodes.EQUALS,
                source1: fetchParameter(memory, memory[memoryIndex+1], mode1st),
                source2: fetchParameter(memory, memory[memoryIndex+2], mode2nd),
                target: memory[memoryIndex + 3],
                advanceIndex: (currentIndex) => currentIndex + 4
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
    return parameter;
}

const opcodes = {
    ADD: 'add',
    MULTIPLY: 'multiply',
    INPUT: 'input',
    OUTPUT: 'output',
    JUMP_IF_TRUE: 'jump_if_true',
    JUMP_IF_FALSE: 'jump_if_false',
    LESS_THAN: 'less_than',
    EQUALS: 'equals',
    HALT: 'halt',
    UNKNOWN: 'unknown'
}

const parameterModes = {
    POSITION: 'position',
    IMMEDIATE: 'immediate',
}

main();
