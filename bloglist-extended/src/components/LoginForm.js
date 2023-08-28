import { useState } from 'react';
import { Button } from 'react-bootstrap';

import { loginUser } from '../services/login';
import {
  useAuthState,
  useAuthDispatch,
  useNotificationDispatch,
} from '../context/BlogContext';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const navigate = useNavigate();
  const dispatch = useAuthDispatch();
  const { errorMessage } = useAuthState();
  const notif = useNotificationDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let res = await loginUser(dispatch, { username, password });
      if (!res.username) return;
      notif({
        type: 'LOGIN',
        payload: username,
      });
      setTimeout(() => {
        notif({ type: null });
        window.location.reload();
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <div>
            {errorMessage ? <p>{errorMessage}</p> : null}
            <h2>Log in to application</h2>
          </div>
          username{' '}
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          password{' '}
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
