import { getMoments } from './services'
import MomentsList from './MomentsList'
import { useState, useEffect, useContext } from 'react';
import Loading from './Loading'
import UserContext from './UserContext'

const HomeContent = function () {
    const [momentsState, setMomentsState] = useState({ isLoading: true });
    const [userState, setUserState] = useContext(UserContext);

    function sortMomentsByLikes(moments) {
        let sortable = [];
        for (var key in moments) {
            sortable.push([moments[key], moments[key].likes]);
        }
        sortable.sort(sortDescending);
        return sortable;
    }

    function sortDescending(r1, r2) {
        return r2[1] - r1[1];
    }

    useEffect(() => {
        setMomentsState({
            ...momentsState,
            isLoading: true
        })
        getMoments()
            .then(moments => {
                setMomentsState({
                    moments: sortMomentsByLikes(moments),
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
    if (momentsState.isLoading) {
        return (
            <Loading />
        );
    }
    return (
        <div className="home">
            <MomentsList moments={momentsState.moments} />
        </div>
    );
};

export default HomeContent;