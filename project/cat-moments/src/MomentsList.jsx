import { Link } from 'react-router-dom'
import likes from './likes.svg';

const MomentsList = function ({ moments }) {
    if (!moments) {
        return null;
    }

    const listItems = moments.map((momentArray, index) =>
        <li key={index}>
            <div>{momentArray[0].title}</div>
            <img src={likes} className="likes" alt="likes"/>
            <div>{momentArray[0].likes}</div>
            <Link to={"/detail/" + momentArray[0].momentId}>View</Link>
        </li>
    );
    return (
        <div>
            {listItems}
        </div>
    );
};

export default MomentsList;