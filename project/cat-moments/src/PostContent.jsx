import { useState } from 'react';
import { postMoment } from './services'
import  { Redirect } from 'react-router-dom'


const PostContent = function () {
    const [status, setStatus] = useState('');

    const [formState, setFormState] = useState({
        title: '',
        content: '',
        link: ''
    });
    const updateTitle = (e) => setFormState({
        ...formState,
        title: e.target.value
    });
    const updateContent = (e) => setFormState({
        ...formState,
        content: e.target.value
    });
    const updateLink = (e) => setFormState({
        ...formState,
        link: e.target.value
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
        <div>
            Post page
            <div >
                <label>
                    Title:
                    <input type="text" onChange={updateTitle} value={formState.title} />
                </label>
                <label>
                    Content:
                    <textarea onChange={updateContent} value={formState.content} ></textarea>
                </label>
                <label>
                    Link:
                    <input type="text" onChange={updateLink} value={formState.link} />
                </label>
                <button type="button" onClick={() => { onSubmit() }}>Submit</button>
                { status && <div class="status">{status}</div>}
            </div>
            <p><a href="/">back to home</a></p>
        </div>
    );
};

export default PostContent;