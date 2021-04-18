import { getMoments } from './services'
import MomentsList from './MomentsList'
import { useState, useEffect } from 'react';
import Loading from './Loading'

const HomeContent = function () {
    const [momentsState, setMomentsState] = useState({ isLoading: true });

    useEffect(() => {
        setMomentsState({
            ...momentsState,
            isLoading: true
        })
        getMoments()
            .then(moments => {
                setMomentsState({
                    moments: moments,
                    isLoading: false
                });
            })
            .catch(() => {
                console.log("get moments fail");
            });
    }, []);
    if (momentsState.isLoading) {
        return (
            <Loading />
        );
    }
    return (
        <div>
            Home page
            <MomentsList momentsState={momentsState} />
            <p><a href="/post">post your moment</a></p>

        </div>
    );
};

export default HomeContent;