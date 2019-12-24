class Network {
    constructor() {
        this.computers = [];
        this.inputQueue = [];
        this.outputQueue = [];
        this.idling = []
    }

    attach(computer, id) {
        computer.doInput = this.doInput(id);
        computer.doOutput = this.doOutput(id);
        this.computers.push(computer);
        this.inputQueue[id] = [id];
        this.outputQueue[id] = [];
        this.idling[id] = 0;
    }

    doInput(id) {
        return () => this.readInputQueue(id);
    }

    doOutput(id) {
        return (value) => this.writeOutputQueue(id, value);
    }

    readInputQueue(id) {
        this.inputQueue[id] = this.inputQueue[id] || [];
        const hasData = this.inputQueue[id].length > 0;
        if (!hasData) {
            this.idling[id]++;
        }
        return hasData ? this.inputQueue[id].shift() : -1;
    }

    writeOutputQueue(id, value) {
        this.idling[id] = 0;
        this.outputQueue[id] = this.outputQueue[id] || [];
        this.outputQueue[id].push(value);
        if (this.outputQueue[id].length >= 3) {
            this.transmitData(id);
        }
    }

    cycle() {
        this.computers.forEach(computer => computer.runInstruction());
        return (!this.isIdle());
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

    isIdle() {
        const emptyInputQueue = this.inputQueue.every(queue => queue.length == 0);
        const emptyOutputQueue = this.outputQueue.every(queue => queue.length == 0);
        const beenIdling = this.idling.every(t => t > 100);
        const natHasPacket = this.natQueue !== undefined;
        const isIdle = emptyInputQueue && emptyOutputQueue && beenIdling && natHasPacket;
        return isIdle;
    }
}

module.exports = Network;
