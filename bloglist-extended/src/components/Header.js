import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

import { useAuthDispatch, useAuthState } from '../context/BlogContext';
import { logoutUser } from '../services/login';

const Header = () => {
  const { fullName } = useAuthState() || null;
  const navigate = useNavigate();
  const dispatch = useAuthDispatch();

  const handleLogout = (e) => {
    e.preventDefault();
    logoutUser(dispatch);
    navigate('/');

    // window.location.reload();
  };

  return (
    <div>
      <h2>Blog App</h2>
      <div
        style={{
          display: 'flex',
          gap: '12px',
          alignItems: 'center',
          justifyContents: 'center',
          backgroundColor: '#d3d3d3',
          padding: '0 8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            justifyContents: 'center',
          }}
        >
          <Link to={'/'}>blogs</Link>
          <Link to={'/users'}>users</Link>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContents: 'center',
          }}
        >
          {fullName ? (
            <p>{fullName} logged in </p>
          ) : (
            <p>Fetching users name....</p>
          )}
        </div>
        <button
          // style={{ height: '22px' }}
          id="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>{' '}
      </div>
    </div>
  );
};

export default Header;
