import './App.css';
import { useState, useEffect } from 'react';
import { endSession, checkSession } from './services';
import Navigation from './Navigation'
import Login from './Login'
import MainContent from './MainContent'
import Loading from './Loading'

function App() {
  const [userState, setUserState] = useState({ isLoggedIn: false, isPending: true });

  useEffect(() => {
    checkSession()
      .then(userinfo => {
        setUserState({
          isLoggedIn: true,
          isPending: false,
          username: userinfo.username,
        });
      })
      .catch(() => {
        setUserState({
          isLoggedIn: false,
          isPending: false,
        });
      });
  }, []);

  const login = function ({ username }) {
    setUserState({
      isLoggedIn: true,
      isPending: false,
      username,
    });
  };

  const logout = function () {
    setUserState({
      ...userState,
      isPending: true,
    });
    endSession()
      .then(() => {
        setUserState({
          isLoggedIn: false,
          isPending: false,
        });
      })
      .catch(() => {
        setUserState({
          ...userState,
          isPending: false,
        });
      });
  };

  if (userState.isPending) {
    return (
      <div className="app">
        <Loading />
      </div>
    );
  }

  let content;

  if (userState.isLoggedIn) {
    content = <MainContent />;
  } else {
    content = <Login onLogin={login} />;
  }

  return (
    <div className="app">
      <Navigation user={userState} onLogout={logout} />
      {content}
    </div>
  );
}

export default App;
