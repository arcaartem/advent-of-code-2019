class CrossFinder {
    constructor(wire1, wire2) {
        this.wire1 = wire1;
        this.wire2 = wire2;
    }

    findCrossings() {
        const crossings = [];
        for (let segment1 of this.wire1) {
            let cross = this.pathCrossed(segment1, this.wire2);
            if (cross == undefined || (cross.cross[0] == 0 && cross.cross[1] == 0)) {
                continue;
            }
            crossings.push(cross);
        }
        return crossings;
    }

    pathCrossed({start, end, totalDistance}, path) {
        const [sx1, sy1] = start;
        const [sx2, sy2] = end;
        const distance1 = totalDistance;
        
        for (const {start, end, totalDistance} of path) {
            const [x1, y1] = start;
            const [x2, y2] = end;
            if (sx1 == sx2 && y1 == y2 && this.isBetween(sx1, x1, x2) && this.isBetween(y1, sy1, sy2)) {
                return {cross: [sx1, y1], distance1: distance1 - Math.abs(sy2 - y1), distance2: totalDistance - Math.abs(x2 - sx1)};
            } else if (sy1 == sy2 && x1 == x2 && this.isBetween(sy1, y1, y2) && this.isBetween(x1, sx1, sx2)) {
                return {cross: [x1, sy1], distance1: distance1 - Math.abs(sx2 - x1), distance2: totalDistance - Math.abs(y2 - sy1)};
            }
        }
    }

    isBetween(value, from, to) {
        return value >= Math.min(from, to) && value <= Math.max(from, to);
    }
}

module.exports = CrossFinder;
