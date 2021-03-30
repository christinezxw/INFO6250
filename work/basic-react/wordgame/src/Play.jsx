import { useState } from 'react';

function Play({ setGuessWord }) {
    const [input, setInput] = useState('');
    const updateInput = (e) => setInput(e.target.value);
    return (
        <div>
            <input onChange={updateInput} value={input}></input>
            <button onClick={() => { setGuessWord(input); setInput('') }}>OK</button>
        </div>
    );
};
export default Play;
