import { useState, useEffect, useContext } from 'react';
import Loading from './Loading'
import { getMomentIdsByUsername } from './services'
import DetailContent from './DetailContent'
import UserContext from './UserContext'

const UserContent = function () {
    const [momentIdsState, setMomentIdsState] = useState({ isLoading: true });
    const [userState, setUserState] = useContext(UserContext);

    useEffect(() => {
        setMomentIdsState({
            isLoading: true
        })
        getMomentIdsByUsername()
            .then(momentIds => {
                setMomentIdsState({
                    momentIds: momentIds,
                    isLoading: false
                });
                setUserState({
                    ...userState,
                    status: ''
                });
            })
            .catch((err) => {
                setUserState({
                    ...userState,
                    status: err.error
                });
            });

    }, []);

    if (!momentIdsState) {
        return null;
    }
    if (momentIdsState.isLoading) {
        return (
            <Loading />
        );
    }
    const listItems = Object.values(momentIdsState.momentIds).map((momentId, index) =>
        <DetailContent key={index} momentId={momentId} />
    );
    return (
        <div>
            {listItems}
        </div>
    );
};

export default UserContent;