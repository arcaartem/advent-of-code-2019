const fs = require('fs');

const INPUT_FILE = '../input.txt';
// const INPUT_FILE = '../example1.txt';
// const INPUT_FILE = '../example2.txt';
// const INPUT_FILE = '../example3.txt';
// const INPUT_FILE = '../example4.txt';

const main = () => {
    const program = getPuzzleInput();
    const solution = solve(program);
    console.log(`Solution: ${ solution }`);
}

const getPuzzleInput = () => {
    const instructions = fs.readFileSync(INPUT_FILE, 'utf8')
        .match(/[^\n\r]+/g);
    return instructions;
}

function dealNewStack(deck) {
    const newDeck = [...deck];
    return newDeck.reverse();
}

function dealWithIncrement(deck, n) {
    const newDeck = Array(deck.length);
    const l = deck.length;
    for (let i=0,j=0; i<l; i++,j=(j+n)%l) {
        newDeck[j] = deck[i];
    }
    return newDeck;
}

function cut(deck, n) {
    let newDeck;

    if (n == 0) {
        return deck;
    }

    if (n > 0) {
        let top = deck.slice(0, n);
        let bottom = deck.slice(n);
        return bottom.concat(top);
    } else {
        let top = deck.slice(0, n);
        let bottom = deck.slice(n);
        return bottom.concat(top);
    }
}

const solve = (instructions) => {
    let deck = Array.from(Array(10007), (e, i) => i);
    instructions.forEach(instruction => {
        if (instruction == 'deal into new stack') {
            deck = dealNewStack(deck);
        } else if (instruction.startsWith('deal with increment')) {
            let n = parseInt(instruction.match(/deal with increment (.*)/)[1]);
            deck = dealWithIncrement(deck, n);
        } else if (instruction.startsWith('cut ')) {
            let n = parseInt(instruction.match(/cut (.*)/)[1]);
            deck = cut(deck, n);
        } else {
            throw `Unknown instruction: ${instruction}`;
        }
    });
    return deck.indexOf(2019);
}

main();
