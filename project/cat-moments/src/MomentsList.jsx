import { Link } from 'react-router-dom'
import likes from './likes.svg';

const MomentsList = function ({ moments }) {
    if (!moments) {
        return null;
    }

    const listItems = moments.map((momentArray, index) =>
        <li key={index} className="moment-li">
            <span>{momentArray[0].author}</span>
            <hr/>
            <div className="moment-li-container">
                <div className="likes-container">
                    <img src={likes} className="likes" alt="likes" />
                    <div>{momentArray[0].likes}</div>
                </div>
                <div>{momentArray[0].title}</div>
                <Link to={"/detail/" + momentArray[0].momentId}>View</Link>
            </div>
        </li>
    );
    return (
        <ul className="moments">
            {listItems}
        </ul>
    );
};

export default MomentsList;