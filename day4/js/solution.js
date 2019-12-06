const main = () => {
    const fromNumber = 359282;
    const toNumber = 820401;
    const part1Solution = solvePart1(fromNumber, toNumber);
    const part2Solution = solvePart2(fromNumber, toNumber);

    console.log(`Part 1 Solution: ${ part1Solution }`);
    console.log(`Part 2 Solution: ${ part2Solution }`);
}

const solvePart1 = (fromNumber, toNumber) => {
    let count = 0;
    for (var number = fromNumber; number <= toNumber; number++) {
        if (isMatch(number)) {
            count++;
        }
    }
    return count;
}

const solvePart2 = (fromNumber, toNumber) => {
    let count = 0;
    for (var number = fromNumber; number <= toNumber; number++) {
        if (isMatch(number) && containsDoubleDigits(number)) {
            count++;
        }
    }
    return count;
}

const isMatch = (number) => {
    const n = number.toString();

    if (n.length != 6) {
        return false;
    }

    let previousDigit = null;
    let containsSame = false;

    for (var i=0; i<6; i++) {
        if (previousDigit != null && n[i] < previousDigit) {
            return false;
        }

        if (n[i] == previousDigit) {
            containsSame = true;
        }
        previousDigit = n[i];
    }

    return containsSame;
}

const containsDoubleDigits = (number) => {
    const n = number.toString();

    let previousDigit = n[0];
    let sameCount = 1;

    for (var i=1; i<6; i++) {
        if (n[i] == previousDigit) {
            sameCount++;
        } else {
            if (sameCount == 2) {
                return true;
            }

            sameCount = 1;
        }
        previousDigit = n[i];
    }

    return sameCount == 2;
}

main();
