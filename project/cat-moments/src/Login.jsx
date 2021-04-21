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
        <div className="login">
            <div className="login-content">
                <div className="welcome">
                    <p>Welcome to CatMoments!</p>
                    <p>Please login to view and post moments...</p>
                </div>
                <div className="login-form">
                    <input className="input" disabled={isPending} onChange={onChange} value={username} placeholder="Enter Your Username" />
                    <button className="submit-button" onClick={login} disabled={isDisabled || isPending} >{isPending ? "..." : "Login"}</button>
                </div>
            </div>
        </div>
    );
};
export default Login;
