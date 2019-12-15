const IntcodeComputer = require('./intcode-computer');

class Drone {
    constructor(program) {
        this.cpu = new IntcodeComputer(program);
        this.cpu.runProgram();
        if (this.cpu.output.length > 0) {
            throw 'Unexpected output';
        }
    }

    move(direction) {
        this.cpu.input.push(direction);
        this.cpu.runProgram();
        if (this.cpu.output.length == 0) {
            throw 'No status was returned!';
        }

        if (this.cpu.output.length > 1) {
            throw 'Unexpected output from the cpu';
        }

        return this.cpu.output.shift();
    }
}

module.exports = Drone;
