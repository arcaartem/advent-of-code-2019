class Reactor {
    constructor(reactions, availableOre = Infinity) {
        this.reactions = reactions;
        this.collectedOre = 0;
        this.availableOre = availableOre;
    }

    produce(chemicals, chemical, quantity, multiplier = 1) {
        function findDeficiencies(chemicals) {
            const keysFound = Object.keys(chemicals).filter(key => key != 'ORE' && chemicals[key] < 0);
            return keysFound;
        }

        function getMultiplier(multiplesOf, requiredQuantity) {
            let multiplier = Math.floor(multiplesOf / quantity);
            if (multiplesOf % quantity > 0) {
                multiplier++;
            }

            return multiplier;
        }

        function applyReaction(chemicals, reaction, multiplier = 1) {
            const { product, consumes } = reaction;
            const newChemicals = {...chemicals};
            newChemicals[product.name] = (newChemicals[product.name] || 0) + product.quantity * multiplier;
            consumes.forEach(consumption => newChemicals[consumption.name] = (newChemicals[consumption.name] || 0) - consumption.quantity * multiplier);
            return newChemicals;
        }

        let reaction = this.reactions[chemical];
        let newChemicals = applyReaction(chemicals, reaction, multiplier)
        let deficiencies;
        while ((deficiencies = findDeficiencies(newChemicals)).length > 0) {
            while (deficiencies.length > 0) {
                let deficiency = deficiencies.shift();
                reaction = this.reactions[deficiency];
                newChemicals = applyReaction(newChemicals, reaction, multiplier);
            }
        }
        
        const requiredOre = Math.abs(newChemicals['ORE']);

        if (this.availableOre == Infinity) {
            this.collectedOre += requiredOre;
            newChemicals['ORE'] = 0;
            return newChemicals;
        }

        if (requiredOre > this.availableOre) {
            return null;
        }

        this.availableOre -= requiredOre;
        this.collectedOre += requiredOre;
        return newChemicals;
    }
}

module.exports = Reactor;
