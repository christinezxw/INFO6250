const Navigation = function ({ user, onLogout }) {
  if (!user.isLoggedIn) {
    return null;
  }

  return (
    <div>
      <div>Hi, {user.username}!</div>
      <nav>
        <ul className="nav">
          <li className="logout"><a href="#logout" onClick={onLogout}>Logout</a></li>
        </ul>
      </nav>
    </div>

  );
};

export default Navigation;
