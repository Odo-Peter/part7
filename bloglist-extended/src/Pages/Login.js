import LoginForm from '../components/LoginForm';
import Togglable from '../components/Togglable';

const Login = () => {
  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel1="login" buttonLabel2="cancel">
        <LoginForm />
      </Togglable>
    </div>
  );
};

export default Login;
