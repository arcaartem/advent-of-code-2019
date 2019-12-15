const OPCODES = {
    ADD: '01',
    MULTIPLY: '02',
    INPUT: '03',
    OUTPUT: '04',
    JUMP_IF_TRUE: '05',
    JUMP_IF_FALSE: '06',
    LESS_THAN: '07',
    EQUALS: '08',
    ADJUST_RELATIVE_BASE: '09',
    HALT: '99'
}

const opcodeName = (opcode) => {
    return Object.keys(OPCODES).find( k => OPCODES[k] == opcode );
}

const modeName = (mode) => {
    return Object.keys(PARAMETER_MODES).find( k => PARAMETER_MODES[k] == mode );
}

const PARAMETER_MODES = {
    POSITION: '0',
    VALUE: '1',
    RELATIVE: '2'
}

class IntcodeComputer {
    constructor(program, doInput, doOutput) {
        this.memory = {};
        for (let i=0; i<program.length; i++) {
            this.memory[BigInt(i)] = program[i];
        }
        this.memoryIndex = 0n;
        this.halted = false;
        this.paused = true;
        this.baseOffset = 0n;
        this.doInput = doInput;
        this.doOutput = doOutput;
        this.input = [];
        this.output = [];
    }

    runProgram() {
        if (this.halted) {
            return true;
        }
        this.paused = false;
        while (!this.halted && !this.paused)
        {
            this.runInstruction();
        }
        return this.halted;
    }

    readMemory(index) {
        if (index < 0n)
            throw ('Access violation error');
        const value = this.memory[index] || 0n;
        return value;
    }

    writeMemory(index, value) {
        if (index < 0)
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

    fetchParameter(mode) {
        const value = this.fetchNextMemoryValue();
        switch (mode) {
            case PARAMETER_MODES.POSITION:
                return this.readMemory(value);
            case PARAMETER_MODES.VALUE:
                return value;
            case PARAMETER_MODES.RELATIVE:
                return this.readMemory(this.baseOffset + value);
            default:
                throw `Invalid parameter mode: ${mode}`;
        }
    }

    saveParameter(mode, value) {
        const target = this.fetchNextMemoryValue();
        switch (mode) {
            case PARAMETER_MODES.POSITION:
                this.writeMemory(target, value);
                break
            case PARAMETER_MODES.RELATIVE:
                this.writeMemory(this.baseOffset + target, value);
                break;
            default:
                throw `Invalid target parameter mode: ${mode}`;
        }
    }

    fetchOpcode() {
        const opcodeString = this.fetchNextMemoryValue().toString().padStart(5, '0');
        const modes = opcodeString.slice(0, 3).split("");
        const opcode = opcodeString.slice(3);
        return modes.concat(opcode);
    }

    runInstruction() {
        let [ mode3, mode2, mode1, opcode ] = this.fetchOpcode(); 
        let source1, source2, target, result;

        switch (opcode) {
            case OPCODES.ADD:
                source1 = this.fetchParameter(mode1);
                source2 = this.fetchParameter(mode2);
                result = source1 + source2;
                this.saveParameter(mode3, result);
                break;

            case OPCODES.MULTIPLY:
                source1 = this.fetchParameter(mode1);
                source2 = this.fetchParameter(mode2);
                result = source1 * source2;
                this.saveParameter(mode3, result)
                break;

            case OPCODES.INPUT:
                if (this.doInput == undefined) { 
                    if (this.input.length == 0) {
                        this.memoryIndex--;
                        this.paused = true;
                    } else {
                        let inputValue = this.input.shift();
                        this.saveParameter(mode1, BigInt(inputValue));
                    }
                } else {
                    let inputValue = this.doInput();
                    this.saveParameter(mode1, BigInt(inputValue));
                }
                break;

            case OPCODES.OUTPUT:
                source1 = this.fetchParameter(mode1);
                if (this.doOutput == undefined) {
                    this.output.push(source1);
                } else {
                    this.doOutput(source1);
                }
                break;

            case OPCODES.JUMP_IF_TRUE:
                source1 = this.fetchParameter(mode1);
                source2 = this.fetchParameter(mode2);
                if (source1 != 0n) {
                    this.memoryIndex = source2;
                }
                break;

            case OPCODES.JUMP_IF_FALSE:
                source1 = this.fetchParameter(mode1);
                source2 = this.fetchParameter(mode2);
                if (source1 == 0n) {
                    this.memoryIndex = source2;
                }
                break;

            case OPCODES.LESS_THAN:
                source1 = this.fetchParameter(mode1);
                source2 = this.fetchParameter(mode2);
                target = (source1 < source2) ? 1n : 0n;
                this.saveParameter(mode3, target);
                break;

            case OPCODES.EQUALS:
                source1 = this.fetchParameter(mode1);
                source2 = this.fetchParameter(mode2);
                target = (source1 == source2) ? 1n : 0n;
                this.saveParameter(mode3, target)
                break;

            case OPCODES.ADJUST_RELATIVE_BASE:
                source1 = this.fetchParameter(mode1);
                this.baseOffset += source1;
                break;

            case OPCODES.HALT:
                this.halted = true;
                break;

            default:
                console.log(`memoryIndex: ${this.memoryIndex} UNKNOWN OPCODE: ${ opcode }`)
        }
    }
}

module.exports = IntcodeComputer;

