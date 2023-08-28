import { useQuery } from 'react-query';
import { Table } from 'react-bootstrap';

import { getAllUsers } from '../services/users';

import { Link } from 'react-router-dom';
import Header from '../components/Header';

const Users = () => {
  const { data, error } = useQuery(['users'], getAllUsers, {
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (!data) {
    return null;
  } else {
    return (
      <div>
        <Header />
        <p></p>
        <h2>Users</h2>
        <div>
          <br />
          <div>
            <Table striped>
              <thead style={{ textAlign: 'left' }}>
                <tr>
                  <th> </th>
                  <th>blogs created</th>
                </tr>
              </thead>
              {data &&
                data.map((user) => (
                  <tbody key={user.id}>
                    <tr>
                      <td>
                        <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </td>
                      <td>{user.blogs.length}</td>
                    </tr>
                  </tbody>
                ))}
            </Table>
            {!data && (
              <p>
                {' '}
                Blog service not available due to problem with the servers, this
                might give an insight: {error}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }
};

export default Users;
