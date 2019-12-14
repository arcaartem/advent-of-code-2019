const fs = require('fs');

class PuzzleReader {
    constructor(inputFile) {
        this.inputFile = inputFile;
    }

    read() {
        const fileContent = fs.readFileSync(this.inputFile, 'utf8');
        const lines = fileContent.match(/[^\r\n]+/g);
        return lines.map(line => this.parseReaction(line));
    }

    parseReaction(line) {
        const [consume, produce] = line.split('=>').map(x => x.trim());
        const consumptions = consume.split(',').map(x => x.trim()).map(x => this.parseChemical(x));
        return {
            produce: this.parseChemical(produce),
            consume: consumptions
        };
    }

    parseChemical(input) {
        const [quantity, name] = input.split(' ').map(x => x.trim());
        return {
            name,
            quantity: parseInt(quantity)
        };
    }
}

module.exports = PuzzleReader;
