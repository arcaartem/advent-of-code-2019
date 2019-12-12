class Simulation {
    constructor(moons) {
        this.moons = moons;
        this.steps = 0;
    }

    applyGravity(moons) {
        for (let i=0; i<moons.length - 1; i++) {
            for (let j=i+1; j<moons.length; j++) {
                const moon1 = moons[i];
                const moon2 = moons[j];

                if (moon1.position.length != 3 || moon2.position.length != 3)
                    throw `Invalid position: ${ moon1.position }, ${ moon2.position }`;

                for (let k=0; k<3; k++) {
                    if (moon1.position[k] == moon2.position[k])
                        continue;

                    if (moon1.position[k] > moon2.position[k]) {
                        moon1.velocity[k]--;
                        moon2.velocity[k]++;
                    } else {
                        moon1.velocity[k]++;
                        moon2.velocity[k]--;
                    }
                }
            }
        }
        return moons;
    }

    applyVelocity(moons) {
        for (let moon of moons) {

            if (moon.position.length != 3)
                throw `Invalid position: ${ moon.position }`;

            for (let k=0; k<3; k++) {
                moon.position[k] += moon.velocity[k];
            }
        }
        return moons;
    }
    
    step() {
        this.applyGravity(this.moons);
        this.applyVelocity(this.moons);
        this.steps++;
    }

    getTotalEnergy() {
        const reducer = (sum, cur) => sum += Math.abs(cur);
        const potentialEnergy = (moon) => moon.position.reduce(reducer, 0);
        const kineticEnergy = (moon) => moon.velocity.reduce(reducer, 0);
        const totalEnergy = this.moons.map((moon) => potentialEnergy(moon) * kineticEnergy(moon)).reduce(reducer);
        return totalEnergy;
    }

    getValues(moons, index) {
        const values = {};
        values.positions = moons.map(moon => moon.position[index]);
        values.velocities = moons.map(moon => moon.velocity[index]);

        return JSON.stringify(values);
    }

    findPeriods(index) {
        let moons = [...this.moons];
        const period1 = new Set();

        let steps = 0;
        while (!period1.has(this.getValues(moons, index))) {
            period1.add(this.getValues(moons, index));
            moons = this.applyGravity(moons);
            moons = this.applyVelocity(moons);
            steps++;
        }
        return steps;
    }

    show() {
        console.log(`After ${this.steps} step(s):`)
        for (let moon of this.moons) {
            console.log(`pos=${moon.position}, vel=${moon.velocity}`);
        }
        console.log(`Total energy: ${this.getTotalEnergy()}`);
        console.log();
    }
}

module.exports = Simulation;
