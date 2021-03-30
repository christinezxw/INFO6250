import { countMatches, hasSameLength, isValidWord } from './wordHelper';

const target = "RECAT";

function Results({ guessWord }) {
    let result = '';
    if (!guessWord) {
        result = 'Waiting for input...';
    } else if (!isValidWord(guessWord)) {
        result = `${guessWord} contains disallowed characters!`;
    } else if (guessWord.toLowerCase() === target.toLowerCase()) {
        result = `${guessWord} is the secret word!`;
    } else if (!hasSameLength(guessWord, target)) {
        result = `${guessWord} is not a valid word.`;
    } else {
        const matches = countMatches(guessWord, target);
        result = `${guessWord} has ${matches} letters match. Keep trying!`;
    }
    return (
        <div>
            <p>{result}</p>
        </div>
    );
};
export default Results;