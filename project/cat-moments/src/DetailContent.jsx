import { getMomentById } from './services'
import { useState, useEffect } from 'react';
import Loading from './Loading'

const DetailContent = function ({ momentId }) {
    const [momentState, setMomentState] = useState({ isLoading: true });
    useEffect(() => {
        setMomentState({
            ...momentState,
            isLoading: true
        })
        getMomentById(momentId)
            .then(moment => {
                setMomentState({
                    moment: moment,
                    isLoading: false
                });
            })
            .catch(() => {
                console.log("get moment fail");
            });
    }, [momentId]);
    if (!momentState) {
        return null;
    }
    if (momentState.isLoading) {
        return (
            <Loading />
        );
    }
    return (
        <div>
            Detail page
            <div>Title</div>
            <span >{momentState.moment.title}</span>
            <div >Author</div>
            <span >{momentState.moment.author}</span>
            <div >content</div>
            <span >{momentState.moment.content}</span>
            <div >link</div>
            <span >{momentState.moment.link}</span>
            <p><a href="/">back to home</a></p>

        </div>
    );
};

export default DetailContent;