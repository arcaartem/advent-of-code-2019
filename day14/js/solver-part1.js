const Reactor = require('./reactor');

class Part1Solver {
    constructor(input) {
        const reactions = {};
        input.forEach(reaction => reactions[reaction.product.name] = reaction);
        this.reactor = new Reactor(reactions);
    }

    findSolution() {
        const result = this.reactor.produce({}, "FUEL", 1);
        return this.reactor.collectedOre;
    }
}

module.exports = Part1Solver;
