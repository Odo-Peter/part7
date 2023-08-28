import axios from 'axios';
// import { useNotificationDispatch } from '../context/BlogContext';

const baseUrl = '/api/login';
// const notiDispatch = useNotificationDispatch();

export const loginUser = async (dispatch, credentials) => {
  try {
    dispatch({ type: 'REQUEST_LOGIN' });
    let res = await axios.post(baseUrl, credentials);
    let data = await res.data;
    if (data.username) {
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });
      // notiDispatch({
      //   type: 'LOGIN',
      //   payload: data.user,
      // });

      // setTimeout(() => {
      //   notiDispatch({ type: null });
      // }, 5000);

      localStorage.setItem('currentUser', JSON.stringify(data));
      return data;
    }
    dispatch({ type: 'LOGIN_ERROR', error: 'something happened' });
  } catch (error) {
    dispatch({
      type: 'LOGIN_ERROR',
      error: 'something happened in the catch block',
    });
  }
};

export const logoutUser = (dispatch) => {
  dispatch({ type: 'LOGOUT' });
  // localStorage.removeItem('currentUser');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('token');
};
// export default { login };
