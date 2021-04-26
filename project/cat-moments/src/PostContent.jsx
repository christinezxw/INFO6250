import { useState } from 'react';
import { postMoment } from './services'
import { Redirect } from 'react-router-dom'
import { escape, unescape } from './helper'

const PostContent = function () {
    const [status, setStatus] = useState('');

    const [formState, setFormState] = useState({
        title: '',
        content: '',
        link: ''
    });
    const updateTitle = (e) => setFormState({
        ...formState,
        title: escape(e.target.value)
    });
    const updateContent = (e) => setFormState({
        ...formState,
        content: escape(e.target.value)
    });
    const updateLink = (e) => setFormState({
        ...formState,
        link: escape(e.target.value)
    });

    const [postSuccessState, setPostSuccessState] = useState(false);
    const onSubmit = function () {
        postMoment({
            title: formState.title,
            content: formState.content,
            link: formState.link
        }).then(() => {
            setStatus('');
            setFormState({
                title: '',
                content: '',
                link: ''
            });
            setPostSuccessState(true);
        })
            .catch((err) => {
                setStatus(err.error);
            });
    }


    if (postSuccessState) {
        return <Redirect to="/" />;
    }
    return (
        <div className="post">
            <p>Share your cat's special moment with us!</p>
            <div className="post-form">
                <label className="label">
                    Title:<br />
                    <input className="input" type="text" onChange={updateTitle} value={unescape(formState.title)} />
                </label>
                <br />
                <label className="label">
                    Content:<br />
                    <textarea className="input" onChange={updateContent} value={unescape(formState.content)} ></textarea>
                </label>
                <br />
                <label className="label">
                    Link:<br />
                    <input className="input" type="text" onChange={updateLink} value={unescape(formState.link)} />
                </label>
                <br />
                <button className="submit-button" type="button" onClick={() => { onSubmit() }}>Submit</button>
                {status && <div class="status">{status}</div>}
            </div>
        </div>
    );
};

export default PostContent;