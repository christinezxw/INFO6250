import './App.css';
import { useState } from 'react';
import Play from './Play';
import Results from './Results';

function App() {
  const [guessWord, setGuessWord] = useState();
  return (
    <div className="App">
      <Results guessWord={guessWord} />
      <Play setGuessWord={setGuessWord} />
    </div>
  );
}

export default App;
