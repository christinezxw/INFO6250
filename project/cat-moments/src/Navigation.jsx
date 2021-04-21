import { useContext } from 'react';
import UserContext from './UserContext'

const Navigation = function ({ onLogout }) {
  const [userState] = useContext(UserContext);
  if (!userState.isLoggedIn) {
    return null;
  }
  return (
    <div className="nav-container">
      <div className="welcome">Hi, {userState.username}!</div>
      <nav>
        <ul className="nav">
          <li className="homepage"><a href="/">Home</a></li>
          <li className="mypage"><a href="/mypage">MyPage</a></li>
          <li className="postpage"><a href="/post">PostYourMoment</a></li>
          <li className="logout"><a href="#" onClick={onLogout}>Logout</a></li>
        </ul>
      </nav>
    </div>

  );
};

export default Navigation;
