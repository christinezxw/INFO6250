import { getMomentById, deleteMomentById, updateLikes } from './services'
import { useState, useEffect, useContext } from 'react';
import Loading from './Loading'
import { Redirect } from 'react-router-dom'
import UserContext from './UserContext'
import favorite from './favorite.svg';
import link from './link.svg';

const DetailContent = function ({ momentId }) {
    const [momentState, setMomentState] = useState({ isLoading: true });
    const [deleteSuccessState, setDeleteSuccessState] = useState(false);
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
                setUserState({
                    ...userState,
                    status: ''
                });
                setDeleteSuccessState(true);
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
    if (deleteSuccessState) {
        return <Redirect to="/mypage" />;
    }
    return (
        <div className="detail-container">
            <div className="title">{momentState.moment.title}</div>
            <div className="author">by: {momentState.moment.author}</div>
            <hr />
            <div className="content">{momentState.moment.content}</div>
            <div className="link">
                <a href={momentState.moment.link} target="_blank" rel="noopener noreferrer" >{momentState.moment.link}</a>
                <img src={link} alt="link" />
            </div>
            <hr />
            <div className="likes-container">
                <img src={favorite} className="favorite" alt="favorite" onClick={() => onLike()} />
                <div >{momentState.moment.likes}</div>
            </div>
            {enableDeleteButton ?
                <button className="submit" type="button" onClick={() => { onDelete(momentState.moment.momentId) }}>Delete</button> : null}
        </div>
    );
};

export default DetailContent;