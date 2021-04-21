import { useState, useContext } from 'react';
import { createSession } from './services';
import UserContext from './UserContext'

const Login = function ({ onLogin }) {
    const [username, setUsername] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isPending, setIsPending] = useState(false);
    const [userState, setUserState] = useContext(UserContext);
    const onChange = (e) => {
        setUsername(e.target.value);
        setIsDisabled(!e.target.value);
    };

    const login = () => {
        setIsPending(true);
        createSession({ username })
            .then(() => {
                setIsPending(false);
                onLogin({ username });
            })
            .catch(err => {
                setUserState({
                    ...userState,
                    status: err.error
                });
                setIsPending(false);
            });
    };

    return (
        <div>
            <p>Welcome to CatMoments!</p>
            <p>Please login to view and post moments...</p>
            <input disabled={isPending} onChange={onChange} value={username} placeholder="Enter Your Username" />
            <button onClick={login} disabled={isDisabled || isPending} >{isPending ? "..." : "Login"}</button>
        </div>
    );
};
export default Login;
