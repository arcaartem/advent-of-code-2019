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
    let result;
    const opcodes = {
        ADD: '01',
        MULTIPLY: '02',
        INPUT: '03',
        OUTPUT: '04',
        HALT: '99'
    }
    const input = () => 1;
    const output = (value) => result = value;
    const computer = new IntcodeComputer(opcodes, program, input, output);
    computer.runProgram();
    return result;
}

const solvePart2 = (program) => {
    let result;
    const opcodes = {
        ADD: '01',
        MULTIPLY: '02',
        INPUT: '03',
        OUTPUT: '04',
        JUMP_IF_TRUE: '05',
        JUMP_IF_FALSE: '06',
        LESS_THAN: '07',
        EQUALS: '08',
        HALT: '99'
    }
    const input = () => 5;
    const output = (value) => result = value;
    const computer = new IntcodeComputer(opcodes, program, input, output);
    computer.runProgram();
    return result;
}

class IntcodeComputer {
    constructor(opcodes, program, input, output) {
        this.opcodes = opcodes;
        this.memory = [...program];
        this.memoryIndex = 0;
        this.doInput = input;
        this.doOutput = output;
    }

    runProgram() {
        while (this.memoryIndex != undefined)
        {
            let instruction = this.fetchInstruction(this.memoryIndex);
            instruction.execute();
        }
    }

    fetchNextMemoryValue() {
        const value = this.memory[this.memoryIndex];
        this.memoryIndex++;
        return value;
    }

    fetchParameter(valueMode = false) {
        const value = this.fetchNextMemoryValue();
    
        return (valueMode) ? value : this.memory[value];
    }

    readOpcode() {
        let opcodeString = this.fetchNextMemoryValue().toString().padStart(5, '0');
        let [ mode3, mode2, mode1 ] = opcodeString.slice(0, 3);
        let opcode = opcodeString.slice(3);
        return [ mode3 == '1', mode2 == '1', mode1 == '1', opcode ];
    }

    fetchInstruction() {
        let [ mode3, mode2, mode1, opcode ] = this.readOpcode(); 
        switch (opcode) {
            case this.opcodes.ADD:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const source2 = this.fetchParameter(mode2);
                        const target = this.fetchNextMemoryValue();
                        const result = source1 + source2;
                        this.memory[target] = result;
                    }
                };
            case this.opcodes.MULTIPLY:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const source2 = this.fetchParameter(mode2);
                        const target = this.fetchNextMemoryValue();
                        const result = source1 * source2;
                        this.memory[target] = result;
                    }
                };
            case this.opcodes.INPUT:
                return {
                    execute: () => {
                        const target = this.fetchNextMemoryValue();
                        this.memory[target] = this.doInput();
                    }
                };
            case this.opcodes.OUTPUT:
                return {
                    execute: () => {
                        const target = this.fetchNextMemoryValue();
                        this.doOutput(this.memory[target]);
                    }
                };
            case this.opcodes.JUMP_IF_TRUE:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const target = this.fetchParameter(mode2);
                        if (source1 != 0) {
                            this.memoryIndex = target;
                        }
                    }
                };
            case this.opcodes.JUMP_IF_FALSE:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const target = this.fetchParameter(mode2);
                        if (source1 == 0) {
                            this.memoryIndex = target;
                        }
                    }
                };
            case this.opcodes.LESS_THAN:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const source2 = this.fetchParameter(mode2);
                        const target = this.fetchNextMemoryValue();
                        this.memory[target] = (source1 < source2) ? 1 : 0;
                    }
                };
            case this.opcodes.EQUALS:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const source2 = this.fetchParameter(mode2);
                        const target = this.fetchNextMemoryValue();
                        this.memory[target] = (source1 == source2) ? 1 : 0;
                    }
                };
            case this.opcodes.HALT:
                return {
                    execute: () => {
                        this.memoryIndex = undefined;
                    }
                };
            default:
                return {
                    execute: () => {
                        console.log(`memoryIndex: ${this.memoryIndex} UNKNOWN OPCODE: ${ opcode }`)
                    }
                }
        }
    }
}

main();
