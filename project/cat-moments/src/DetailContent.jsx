import { getMomentById, deleteMomentById, updateLikes } from './services'
import { useState, useEffect, useContext } from 'react';
import Loading from './Loading'
import { Redirect } from 'react-router-dom'
import UserContext from './UserContext'
import favorite from './favorite.svg';

const DetailContent = function ({ momentId }) {
    const [momentState, setMomentState] = useState({ isLoading: true });
    const [postSuccessState, setPostSuccessState] = useState(false);
    const [userState, setUserState] = useContext(UserContext);
    const username = userState.username
    const enableDeleteButton = momentState.moment ? (momentState.moment.author === username ? true : false) : false;

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
    }, [momentId]);

    const onDelete = function () {
        deleteMomentById(momentId)
            .then(() => {
                setPostSuccessState(true);
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
    }

    const onLike = function () {
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
        updateLikes({ momentId: momentId, likes: momentState.moment.likes + 1 })
            .then(moment => {
                setMomentState({
                    moment: moment,
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
    }

    if (!momentState) {
        return null;
    }
    if (momentState.isLoading) {
        return (
            <Loading />
        );
    }
    if (postSuccessState) {
        return <Redirect to="/mypage" />;
    }
    return (
        <div>
            <div>Title</div>
            <span >{momentState.moment.title}</span>
            <div >Author</div>
            <span >{momentState.moment.author}</span>
            <div >content</div>
            <span >{momentState.moment.content}</span>
            <div >link</div>
            <span >{momentState.moment.link}</span>
            <div >likes</div>
            <img src={favorite} className="favorite" alt="favorite" onClick={() => onLike()} />
            <span >{momentState.moment.likes}</span>
            {enableDeleteButton ?
                <button type="button" onClick={() => { onDelete(momentState.moment.momentId) }}>Delete</button> : null}
        </div>
    );
};

export default DetailContent;