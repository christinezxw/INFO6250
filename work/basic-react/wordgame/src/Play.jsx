import { useState } from 'react';

function Play({ setGuessWord }) {
    const [input, setInput] = useState('');
    const updateInput = (e) => setInput(e.target.value);
    return (
        <div className="guess-form">
            <span>Enter your guess: </span>
            <input onChange={updateInput} value={input}></input>
            <button onClick={() => { setGuessWord(input); setInput('') }} disabled={input ? false : true}>OK</button>
        </div>
    );
};
export default Play;
