const fs = require('fs');
const MonitoringStation = require('./monitoring-station');

const INPUT_FILE = '../input.txt';
// const INPUT_FILE = '../example1.txt';
// const INPUT_FILE = '../example2.txt';
// const INPUT_FILE = '../example3.txt';
// const INPUT_FILE = '../example4.txt';
// const INPUT_FILE = '../example5.txt';

const getPuzzleInput = () => {
    const map = fs.readFileSync(INPUT_FILE, 'utf8')
        .match(/[^\r\n]+/g)
        .map(line => line.split(''));
    return map;
}

const main = () => {
    const map = getPuzzleInput();
    const solution = solve(map);
    console.log(`Solution: ${solution}`);
}

const solve = (map) => {
    let maxVisible = 0;
    let mx, my;

    for (let y=0; y<map.length; y++) {
        for (let x=0; x<map.length; x++) {
            if (map[y][x] == '.')
                continue;
            let station = new MonitoringStation(map, x, y);
            const visible = station.detectAsteroids();
            const visibleCount = Object.keys(visible).length;
            if (visibleCount > maxVisible) {
                maxVisible = visibleCount;
                mx = x; my = y;
            }
        }
    }

    const station = new MonitoringStation(map, mx, my);
    const asteroids = station.detectAsteroids();

    const keys = [...new Set(Object.keys(asteroids))];
    keys.sort((a, b) => a-b);
    keys.forEach(key => asteroids[key].sort((a, b) => a.distance-b.distance));

    const start = keys.findIndex(k => k >= -90);
    let count = 0;
    let current = start;

    map[my][mx] = '*';
    while (count < 199) {
        if (asteroids[keys[current]].length > 0) {
            let asteroid = asteroids[keys[current]].shift();
            let [ax, ay] = asteroid.position;
            map[ay][ax] = '_';
            count++;
        }
        current = (current + 1) % keys.length;
    }

    
    const o = asteroids[keys[current]].shift();
    return o.position[0]*100 + o.position[1];
}

main();
