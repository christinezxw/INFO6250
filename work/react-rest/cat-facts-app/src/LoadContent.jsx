import spinner from './spinner.svg';

const LoadContent = function ({ factsState, fetchFacts }) {
    let content = null;
    if (factsState.hasFact) {
        return content;
    }

    if (factsState.isLoading) {
        content =
            <div className="loading">
                <div>Loading...</div>
                <img src={spinner} className="spinner" alt="spinner" />
            </div>;
    } else {
        content = <button onClick={() => { fetchFacts() }}>Load Facts</button>;
    }
    return (
        <div className="load-content">
            {content}
        </div>
    );
};

export default LoadContent;