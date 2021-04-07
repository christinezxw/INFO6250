const ShowFacts = function ({ factsState, updateFactsStart }) {
    if (!factsState.hasFact) {
        return null;
    }
    const maxLength = factsState.facts.length;
    const start = factsState.start;
    const end = Math.min(factsState.start + factsState.pageSize - 1, maxLength);
    const prevStart = Math.max(factsState.start - factsState.pageSize, 1);
    const nextStart = factsState.start + factsState.pageSize;
    const listItems = factsState.facts.slice(start - 1, end).map((fact, index) =>
        <li key={index}>{fact}</li>
    );
    return (
        <div>
            <div className="message">Showing facts {start} - {end}.</div>
            <div className="facts-list-container">
                <ul className="facts-list">
                    {listItems}
                </ul>
            </div>
            <div className="nav-button-container">
                <button className="nav-button"
                    onClick={() => updateFactsStart({ start: prevStart })}
                    disabled={start > 1 ? false : true}
                >prev</button>
                <button className="nav-button"
                    onClick={() => updateFactsStart({ start: nextStart })}
                    disabled={nextStart <= maxLength ? false : true}
                >next</button>
            </div>

        </div>
    );
};

export default ShowFacts;