const fs = require('fs');

class PuzzleReader {
    constructor(filename) {
        this.filename = filename;
    }

    read() {
        const fileContent = fs.readFileSync(this.filename, 'utf8');
        const lines = fileContent.match(/[^\r\n]+/g);
        return lines.map(line => this.buildWirePath(line));
    }

    nextPoint(current, segment) {
        let direction = segment.slice(0, 1);
        let distance = parseInt(segment.slice(1));
        let [x, y] = current;
        switch (direction) {
            case 'U': return [x, y + distance];
            case 'D': return [x, y - distance];
            case 'L': return [x - distance, y];
            case 'R': return [x + distance, y];
            default:  throw `Unknown direction: ${direction}`;
        }
    }

    nextPath(acc, segment) {
        const [paths, current] = acc;
        const next = this.nextPoint(current, segment);
        paths.push(current.concat(next));
        return [paths, next];
    }

    buildWirePath(line) {
        const [paths, _] = line.split(',').reduce((acc, segment) => this.nextPath(acc, segment), [[], [0, 0]]);
        return paths;
    }
}

module.exports = PuzzleReader;
