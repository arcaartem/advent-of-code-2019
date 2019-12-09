const fs = require('fs');

const INPUT_FILE = '../input.txt';

const main = () => {
    const imageData = getPuzzleInput(INPUT_FILE);

    const solution = solve(imageData);

    console.log(`Solution: ${ solution }`);
}

const solve = (layers) => {
    const minZeroLayer = findMinZeroLayer(layers);
    const numberOfOnes = countDigits(minZeroLayer, '1');
    const numberOfTwos = countDigits(minZeroLayer, '2');
    return numberOfOnes * numberOfTwos;
}

const findMinZeroLayer = (layers)  => {
    let minLayer = [];
    let minNumberOfZeros = Number.MAX_SAFE_INTEGER;
    while (layers.length > 0) {
        let layer = layers.shift();
        let numberOfZeros = countDigits(layer, '0');
        if (numberOfZeros < minNumberOfZeros) {
            minNumberOfZeros = numberOfZeros;
            minLayer = layer;
        }
    }
    return minLayer;
}

const countDigits = (layer, digit) => {
    return layer.match(new RegExp(digit, 'g')).length;
}

const getPuzzleInput = (filename) => {
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
    const layers = [];
    const chunk = 25 * 6;
    for (let i=0, j=fileContent.length; i+chunk<j; i += chunk) {
        let layer = fileContent.slice(i, i+chunk);
        layers.push(layer);
    }
    return layers;
}

main();
