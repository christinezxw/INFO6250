export function countMatches(guess, target) {
    let matches = 0;
    const letterCount = {};
    for (let letter of target.toLowerCase()) {
        letterCount[letter] = letterCount[letter] + 1 || 1;
    }

    for (let letter of guess.toLowerCase()) {
        if (letterCount[letter]) {
            letterCount[letter] -= 1;
            matches += 1;
        }
    }

    return matches;
}

export function hasSameLength(guess, target) {
    return guess.length === target.length;
}

export function isValidWord(guess) {
    const clean = guess.replace(/[^A-Za-z]+/g, '');
    if (clean !== guess) {
        return false;
    } else {
        return true;
    }
}