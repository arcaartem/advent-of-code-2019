class CrossFinder {
    constructor(wire1, wire2) {
        this.wire1 = wire1;
        this.wire2 = wire2;
    }

    findCrossings() {
        const crossings = [];
        for (let segment1 of this.wire1) {
            let cross = this.pathCrossed(segment1, this.wire2);
            if (cross !== undefined) {
                crossings.push(cross);
            }
        }
        return crossings;
    }

    pathCrossed(segment, path) {
        let [sx1, sy1, sx2, sy2] = segment
        for (let segment2 of path) {
            let [x1, y1, x2, y2] = segment2;
            if (sx1 == sx2 && y1 == y2 && this.isBetween(sx1, x1, x2) && this.isBetween(y1, sy1, sy2)) {
                return [sx1, y1];
            } else if (sy1 == sy2 && x1 == x2 && this.isBetween(sy1, y1, y2) && this.isBetween(x1, sx1, sx2)) {
                return [x1, sy1];
            }
        }
    }

    isBetween(value, from, to) {
        return value >= Math.min(from, to) && value <= Math.max(from, to);
    }
}

module.exports = CrossFinder;
