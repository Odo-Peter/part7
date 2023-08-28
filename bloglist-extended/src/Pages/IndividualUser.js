import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { useAuthState } from '../context/BlogContext';

import { getAllUsers } from '../services/users';
import Header from '../components/Header';

const IndividualUser = () => {
  const user = useAuthState().fullName;
  const { id } = useParams();

  const { data, error } = useQuery(['users'], getAllUsers, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const userBlogs = data ? data.filter((user) => user.id === id) : null;

  const blogsOfUser = userBlogs ? userBlogs[0].blogs : null;
  //   console.log(blogsOfUser);

  if (!userBlogs) return null;
  return (
    <div>
      <Header />
      <p></p>
      <h2>{user}</h2>
      <h3>Added Blogs</h3>
      <ul>
        {blogsOfUser.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
      {!data && (
        <p>
          Something is wrong somewhere, this should give some insight: {error}{' '}
        </p>
      )}
    </div>
  );
};

export default IndividualUser;
