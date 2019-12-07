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

class IntcodeComputer {
    constructor(program) {
        this.memory = [...program];
        this.memoryIndex = 0;
        this.halted = false;
        this.paused = true;
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

    runInstruction() {
        let [ mode3, mode2, mode1, opcode ] = this.fetchOpcode(); 
        let source1, source2, target, result;

        switch (opcode) {
            case OPCODES.ADD:
                source1 = this.fetchParameter(mode1);
                source2 = this.fetchParameter(mode2);
                target = this.fetchNextMemoryValue();
                result = source1 + source2;
                this.writeMemory(target, result);
                break;

            case OPCODES.MULTIPLY:
                source1 = this.fetchParameter(mode1);
                source2 = this.fetchParameter(mode2);
                target = this.fetchNextMemoryValue();
                result = source1 * source2;
                this.writeMemory(target, result);
                break;

            case OPCODES.INPUT:
                if (this.input.length == 0) {
                    this.memoryIndex--;
                    this.paused = true;
                } else {
                    target = this.fetchNextMemoryValue();
                    let inputValue = this.input.shift();
                    this.writeMemory(target, inputValue);
                }
                break;

            case OPCODES.OUTPUT:
                target = this.fetchParameter(mode1);
                this.output.push(target);
                break;

            case OPCODES.JUMP_IF_TRUE:
                source1 = this.fetchParameter(mode1);
                target = this.fetchParameter(mode2);
                if (source1 != 0) {
                    this.memoryIndex = target;
                }
                break;

            case OPCODES.JUMP_IF_FALSE:
                source1 = this.fetchParameter(mode1);
                target = this.fetchParameter(mode2);
                if (source1 == 0) {
                    this.memoryIndex = target;
                }
                break;

            case OPCODES.LESS_THAN:
                source1 = this.fetchParameter(mode1);
                source2 = this.fetchParameter(mode2);
                target = this.fetchNextMemoryValue();
                this.writeMemory(target, (source1 < source2) ? 1 : 0);
                break;

            case OPCODES.EQUALS:
                source1 = this.fetchParameter(mode1);
                source2 = this.fetchParameter(mode2);
                target = this.fetchNextMemoryValue();
                this.writeMemory(target, (source1 == source2) ? 1 : 0);
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
