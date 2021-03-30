import './App.css';
import Play from './Play';
import Results from './Results';
import PlayAgain from './PlayAgain';
import { useState } from 'react';
import { randomPlay } from './rps';

function App() {

  const [computer, setComputer] = useState(randomPlay());
  const [player, setPlayer] = useState();
  const reset = () => {
    setPlayer();
    setComputer(randomPlay());
  };
  return (
    <div className="app">
      { player && <Results player={player} computer={computer}/> }
      { !player && <Play setPlayer={setPlayer}/> }
      { player && <PlayAgain onReset={reset}/> }
    </div>
  );
}

export default App;
