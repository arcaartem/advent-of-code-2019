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
            case 'U': return { end: [x, y + distance], distance };
            case 'D': return { end: [x, y - distance], distance };
            case 'L': return { end: [x - distance, y], distance };
            case 'R': return { end: [x + distance, y], distance };
            default:  throw `Unknown direction: ${direction}`;
        }
    }

    nextPath(acc, segment) {
        const [paths, current, totalDistance] = acc;
        const next = this.nextPoint(current, segment);
        next.start = current;
        next.totalDistance = totalDistance + next.distance;
        paths.push(next);
        return [paths, next.end, next.totalDistance];
    }

    buildWirePath(line) {
        const [paths, _] = line.split(',').reduce((acc, segment) => this.nextPath(acc, segment), [[], [0, 0], 0]);
        return paths;
    }
}

module.exports = PuzzleReader;
