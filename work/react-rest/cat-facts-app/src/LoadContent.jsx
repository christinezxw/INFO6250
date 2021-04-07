import spinner from './spinner.svg';

const LoadContent = function ({ factsState, fetchFacts }) {
    if (factsState.hasFact) {
        return null;
    }
    if (factsState.isLoading) {
        return <img src={spinner} className="spinner" alt="spinner" />;
    } else {
        return <button onClick={() => { fetchFacts() }}>Load Facts</button>;
    }
};

export default LoadContent;