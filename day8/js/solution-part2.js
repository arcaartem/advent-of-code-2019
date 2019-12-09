const fs = require('fs');

const INPUT_FILE = '../input.txt';

const WIDTH = 25;
const HEIGHT = 6;

const BLACK = '0';
const WHITE = '1';
const TRANSPARENT = '2';

const main = () => {
    const imageData = getPuzzleInput(INPUT_FILE);

    const solution = solve(imageData);
    console.log(`${ solution }`);
}

const solve = (layers) => {
    const pictureLayer = mixLayers(layers);
    const picture = paintLayer(pictureLayer);
    return picture;
}

const paintLayer = (layer) => {
    const lines = splitToChunks(layer, WIDTH);
    return lines.map((line) => paint(line)).join("\n");
}

const paint = (digit) => digit.replace(new RegExp(TRANSPARENT, 'g'), ' ').replace(new RegExp(BLACK, 'g'), ' ').replace(new RegExp(WHITE, 'g'), '#');

const mixLayers = (layers) => {
    const result = new Array(HEIGHT * WIDTH);
    const reversed = layers.reverse();
    while (reversed.length > 0) {
        let layer = reversed.shift();
        for (let i=0; i<layer.length; i++) { 
            if (layer[i] !== TRANSPARENT) {
                result[i] = layer[i];
            }
        }
    }
    return result.join("");
}

const addLayer = (bottom, top) => {
}

const getPuzzleInput = (filename) => {
    const fileContent = fs.readFileSync(INPUT_FILE, 'utf8');
    const layers = splitToChunks(fileContent, HEIGHT * WIDTH);
    return layers
}

const splitToChunks = (content, chunkSize) => {
    const chunks = [];
    for (let i=0, j=content.length; i+chunkSize<=j; i += chunkSize) {
        let chunk = content.slice(i, i+chunkSize);
        chunks.push(chunk);
    }
    return chunks;
}

main();
