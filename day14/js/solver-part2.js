const Reactor = require('./reactor');
const BinarySearch = require('./binary-search');

class Part2Solver {
    constructor(input) {
        const reactions = {};
        input.forEach(reaction => reactions[reaction.product.name] = reaction);
        this.reactions = reactions;
    }

    findSolution() {
        const binarySearch = new BinarySearch(0, 100000000);
        let result;
        while (!binarySearch.isDone()) {
            let reactor = new Reactor(this.reactions, 1000000000000);
            result = reactor.produce({}, "FUEL", binarySearch.getCurrentValue());
            result == null ? binarySearch.tooHigh() : binarySearch.tooLow();
        }

        return result['FUEL'];
    }
}

module.exports = Part2Solver;
