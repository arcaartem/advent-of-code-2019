const fs = require('fs');

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

const OPCODES = {
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
    const result = permutations([0, 1, 2, 3, 4]).map(permutation => calculateThrust(program, permutation)).reduce((acc, cur) => cur > acc ? cur : acc);
    return result;
}

const calculateThrust = (program, phaseSettings) => {
    const outputs = [0];

    function inputFunction() {
        function* inputGeneratorFunction() {
            yield phaseSettings.shift();
            yield outputs.shift();
            throw new Exception('Not supposed to happen!')
        }

        const generator = inputGeneratorFunction();

        return function input() {
          const value = generator.next().value;
          return value;
        }
    }

    function output(value) {
        outputs.push(value);
    }

    for (let i=0; i<5; i++) {
        const amp = new IntcodeComputer(program, inputFunction(), output);
        amp.runProgram();
    }
    return outputs.shift();
}

class IntcodeComputer {
    constructor(program, input, output) {
        this.memory = [...program];
        this.memoryIndex = 0;
        this.doInput = input;
        this.doOutput = output;
    }

    runProgram() {
        while (this.memoryIndex != undefined)
        {
            let instruction = this.fetchInstruction();
            instruction.execute();
        }
    }

    readMemory(index) {
        if (index >= this.memory.length)
            throw ('Access violation error');
        return this.memory[index];
    }
    
    writeMemory(index, value) {
        if (index >= this.memory.length)
          throw ('Access violation error');
        if (value === undefined)
          throw ('Invalid value');
        this.memory[index] = value;
    }

    fetchNextMemoryValue() {
        const value = this.readMemory(this.memoryIndex);
        this.memoryIndex++;
        return value;
    }

    fetchParameter(valueMode = false) {
        const value = this.fetchNextMemoryValue();
        return (valueMode === true) ? value : this.readMemory(value);
    }

    fetchOpcode() {
        const opcodeString = this.fetchNextMemoryValue().toString().padStart(5, '0');
        const modes = opcodeString.slice(0, 3).split("").map((mode) => mode == '1');
        const opcode = opcodeString.slice(3);
        return modes.concat(opcode);
    }

    fetchInstruction() {
        let [ mode3, mode2, mode1, opcode ] = this.fetchOpcode(); 

        switch (opcode) {
            case OPCODES.ADD:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const source2 = this.fetchParameter(mode2);
                        const target = this.fetchNextMemoryValue();
                        const result = source1 + source2;
                        this.writeMemory(target, result);
                    }
                };
            case OPCODES.MULTIPLY:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const source2 = this.fetchParameter(mode2);
                        const target = this.fetchNextMemoryValue();
                        const result = source1 * source2;
                        this.writeMemory(target, result);
                    }
                };
            case OPCODES.INPUT:
                return {
                    execute: () => {
                        const target = this.fetchNextMemoryValue();
                        const input = this.doInput();
                        this.writeMemory(target, input);
                    }
                };
            case OPCODES.OUTPUT:
                return {
                    execute: () => {
                      const target = this.fetchParameter(mode1);
                      this.doOutput(target);
                    }
                };
            case OPCODES.JUMP_IF_TRUE:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const target = this.fetchParameter(mode2);
                        if (source1 != 0) {
                            this.memoryIndex = target;
                        }
                    }
                };
            case OPCODES.JUMP_IF_FALSE:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const target = this.fetchParameter(mode2);
                        if (source1 == 0) {
                            this.memoryIndex = target;
                        }
                    }
                };
            case OPCODES.LESS_THAN:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const source2 = this.fetchParameter(mode2);
                        const target = this.fetchNextMemoryValue();
                        this.writeMemory(target, (source1 < source2) ? 1 : 0);
                    }
                };
            case OPCODES.EQUALS:
                return {
                    execute: () => {
                        const source1 = this.fetchParameter(mode1);
                        const source2 = this.fetchParameter(mode2);
                        const target = this.fetchNextMemoryValue();
                        this.writeMemory(target, (source1 == source2) ? 1 : 0);
                    }
                };
            case OPCODES.HALT:
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
