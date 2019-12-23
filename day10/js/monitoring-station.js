function reduce(numerator, denominator) {
    let gcd = (a,b) => b ? gcd(b, a%b) : a;
    gcd = gcd(Math.abs(numerator),Math.abs(denominator));
    let nn = numerator/gcd;
    let nd = denominator/gcd;
    return [numerator/gcd, denominator/gcd];
}

class MonitoringStation {
    constructor(map, x, y) {
        this.map = map;
        this.x = x;
        this.y = y;
    }

    detectAsteroids() {
        const slopes = [];
        for (let cy=0; cy<this.map.length; cy++) {
            for (let cx=0; cx<this.map[0].length; cx++) {
                if (this.map[cy][cx] == '.' || (cx == this.x && cy == this.y))
                    continue;
                let dx = cx - this.x;
                let dy = cy - this.y;
                let [ndy, ndx] = reduce(dy, dx)
                slopes.push({
                    position: [ cx, cy ],
                    slope: [ dx, dy ],
                    distance: Math.sqrt(dx*dx + dy*dy),
                    normalisedSlope: [ ndx, ndy ],
                    normalisedAngle: Math.atan2(ndy, ndx) * 180 / Math.PI
                });
            }
        }

        const visible = {};
        slopes.forEach(s => {
            const key = s.normalisedAngle;
            visible[key] = (visible[key] || []);
            visible[key].push(s);
        });

        return visible;
    }
}

module.exports = MonitoringStation;
