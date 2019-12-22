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

    return maxVisible;
}

main();
