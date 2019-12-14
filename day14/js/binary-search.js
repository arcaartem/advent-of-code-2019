class BinarySearch {
    constructor(lowerLimit, higherLimit) {
        this.lowerLimit = lowerLimit;
        this.higherLimit = higherLimit;
    }

    getCurrentValue() {
        return Math.floor((this.higherLimit - this.lowerLimit)/2) + this.lowerLimit;
    }

    tooHigh() {
        this.higherLimit = this.getCurrentValue();
    }

    tooLow() {
        this.lowerLimit = this.getCurrentValue();
    }

    isDone() {
        return this.higherLimit <= this.lowerLimit + 1;
    }
}

module.exports = BinarySearch;
