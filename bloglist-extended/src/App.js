import { Routes, Route } from 'react-router-dom';
import { useAuthState } from './context/BlogContext';

import Homepage from './Pages/Homepage';
import Users from './Pages/Users';
import IndividualUser from './Pages/IndividualUser';
import Login from './Pages/Login';
import Blogs from './Pages/Blogs';

const App = () => {
  const { token } = useAuthState();
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={token ? <Homepage /> : <Login />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<IndividualUser />} />
        <Route path="/blogs/:id" element={<Blogs />} />
      </Routes>
    </div>
  );
};

export default App;
