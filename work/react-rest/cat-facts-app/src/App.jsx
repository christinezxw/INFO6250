import './App.css';
import { useState } from 'react';
import { fetchFactsService } from "./services";
import ShowFacts from "./ShowFacts";
import Dropdown from "./Dropdown";
import LoadContent from "./LoadContent";
import Message from "./Message";

function App() {
  const [factsState, setFactsState] = useState({ hasFact: false, isLoading: false, factsNumber: 0 });
  const [messageState, setMessageState] = useState(`0 facts loaded.`);

  const fetchFacts = function () {
    setFactsState({
      ...factsState,
      isLoading: true,
    });
    fetchFactsService()
      .then((facts) => {
        setFactsState({
          hasFact: true,
          isLoading: false,
          facts: facts,
          factsNumber: facts.length,
          start: 1,
          pageSize: 5
        });
        setMessageState(`${facts.length} facts loaded.`);
      })
      .catch((error) => {
        setFactsState({
          hasFact: false,
          isLoading: false,
          factsNumber: 0
        });
        setMessageState(error.error);
      });
  };

  const updatePageSize = function ({ size }) {
    setFactsState({
      ...factsState,
      pageSize: size,
    });
  }

  const updateFactsStart = function ({ start }) {
    setFactsState({
      ...factsState,
      start: start,
    });
  }

  return (
    <div className="App">
      <Message message={messageState}></Message>
      <LoadContent factsState={factsState} fetchFacts={fetchFacts}></LoadContent>
      <Dropdown updatePageSize={updatePageSize}></Dropdown>
      <ShowFacts factsState={factsState} updateFactsStart={updateFactsStart}></ShowFacts>
    </div>
  );
}

export default App;
