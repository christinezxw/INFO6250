const MomentsList = function ({ momentsState }) {
    if (!momentsState) {
        return null;
    }
    const listItems = Object.values(momentsState.moments).map((moment, index) =>
        <li key={index}>
            <a href={"/detail/" + moment.momentId}>{moment.title}</a>
        </li>
    );
    return (
        <div>
            {listItems}
        </div>
    );
};

export default MomentsList;