import { useEffect } from 'react';
import { useQuery } from 'react-query';

import { useAuthState } from '../context/BlogContext';

import blogService from '../services/blogs';

import Notification from '../components/Notification';
import Blog from '../components/Blog';
import Header from '../components/Header';

import BlogForm from '../components/BlogForm';
import Login from './Login';

const Homepage = () => {
  const { username, token } = useAuthState();

  useEffect(() => {
    if (token) {
      blogService.setToken(token);
    }
  }, []);

  const { isLoading, isError, data, error } = useQuery(
    ['blogs'],
    blogService.getAll,
    {
      refetchOnWindowFocus: false,
      retry: 1,
    }
  );

  if (isLoading) return <div>Loading data....</div>;

  if (isError && error)
    return (
      <h1>
        Blog service not available due to problem with the servers, this might
        give an insight: {error}
      </h1>
    );

  if (!data) return null;
  return (
    <div>
      <Notification />
      {!token ? (
        <Login />
      ) : (
        <div>
          <Header />

          <p> </p>
          <BlogForm />
          <br />
          {data
            .sort((a, b) => b.likes - a.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} user={username} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
