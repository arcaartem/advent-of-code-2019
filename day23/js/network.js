class Network {
    constructor() {
        this.computers = [];
        this.inputQueue = {};
        this.outputQueue = {};
    }

    attach(computer, id) {
        computer.doInput = this.doInput(id);
        computer.doOutput = this.doOutput(id);
        this.computers.push(computer);
        this.inputQueue[id] = [id];
        this.outputQueue[id] = [];
    }

    doInput(id) {
        return () => this.readInputQueue(id);
    }

    doOutput(id) {
        return (value) => this.writeOutputQueue(id, value);
    }

    readInputQueue(id) {
        this.inputQueue[id] = this.inputQueue[id] || [];
        return (this.inputQueue[id].length > 0) ? this.inputQueue[id].shift() : -1;
    }

    writeOutputQueue(id, value) {
        this.outputQueue[id] = this.outputQueue[id] || [];
        this.outputQueue[id].push(value);
        if (this.outputQueue[id].length >= 3) {
            this.transmitData(id);
        }
    }

    cycle() {
        this.computers.forEach(computer => computer.runInstruction());
        return (this.natQueue == undefined);
    }

    transmitData(id) {
        let [targetId, x, y] = this.outputQueue[id].slice(0, 3);
        this.outputQueue[id] = this.outputQueue[id].slice(3);
        if (targetId == 255) {
            this.natQueue = [x, y];
        } else {
            this.inputQueue[targetId] = (this.inputQueue[targetId] || []).concat([x, y])
        }
    }
}

module.exports = Network;
