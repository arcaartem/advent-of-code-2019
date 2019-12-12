class Simulation {
    constructor(moons) {
        this.moons = moons;
        this.steps = 0;
    }

    applyGravity() {
        for (let i=0; i<this.moons.length - 1; i++) {
            for (let j=i+1; j<this.moons.length; j++) {
                const moon1 = this.moons[i];
                const moon2 = this.moons[j];

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
    }

    applyVelocity() {
        for (let moon of this.moons) {

            if (moon.position.length != 3)
                throw `Invalid position: ${ moon.position }`;

            for (let k=0; k<3; k++) {
                moon.position[k] += moon.velocity[k];
            }
        }
    }
    
    step() {
        this.applyGravity();
        this.applyVelocity();
        this.steps++;
    }

    getTotalEnergy() {
        const reducer = (sum, cur) => sum += Math.abs(cur);
        const potentialEnergy = (moon) => moon.position.reduce(reducer, 0);
        const kineticEnergy = (moon) => moon.velocity.reduce(reducer, 0);
        const totalEnergy = this.moons.map((moon) => potentialEnergy(moon) * kineticEnergy(moon)).reduce(reducer);
        return totalEnergy;
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
