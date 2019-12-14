class Part1Solver {
    constructor(input) {
        this.reactions = {};
        input.forEach(reaction => this.reactions[reaction.produce.name] = reaction);
    }

    findSolution() {
        const applyReaction = (allChemicals, reaction) => {
            const newChemicals = {...allChemicals}
            const {produce, consume} = reaction;
            newChemicals[produce.name] = (newChemicals[produce.name] || 0) + produce.quantity;
            consume.forEach(consumption => newChemicals[consumption.name] = (newChemicals[consumption.name] || 0) - consumption.quantity);
            return newChemicals;
        }

        const findNextReaction = (allChemicals) => {
            const keyFound = Object.keys(allChemicals).find(key => allChemicals[key] < 0);
            return this.reactions[keyFound];
        }

        const totalOre = 1000000;
        let allChemicals = {'FUEL': -1, 'ORE': totalOre};
        let reaction;
        while ((reaction = findNextReaction(allChemicals)) !== undefined)
        {
            allChemicals = applyReaction(allChemicals, reaction);
        }
        return totalOre - allChemicals["ORE"];
    }
}

module.exports = Part1Solver;
