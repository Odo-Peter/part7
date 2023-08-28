/* eslint-disable indent */
import { createContext, useReducer, useContext } from 'react';

const blogsReducer = (state, action) => {
  switch (action.type) {
    case 'COMMENT':
      return `A new ${action.payload} has being added`;
    case 'LOGIN':
      return `${action.payload} was logged in successfully`;
    case 'CREATE':
      return `A new Blog "${action.payload}" created`;
    case 'ERR_CHECK':
      return `Ooops ....${action.payload}`;
    case 'LIKE':
      return `"${action.payload}" was liked`;
    case 'DELETE':
      return `${action.payload} has been deleted`;
    default:
      return null;
  }
};

let username = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).username
  : '';

let fullName = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).name
  : '';

let token = localStorage.getItem('currentUser')
  ? JSON.parse(localStorage.getItem('currentUser')).token
  : '';

export const initialState = {
  username: '' || username,
  fullName: '' || fullName,
  token: '' || token,
  loading: false,
  errorMessage: null,
};

export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case 'REQUEST_LOGIN':
      return {
        ...initialState,
        loading: true,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...initialState,
        username: action.payload.username,
        fullName: action.payload.fullName,
        token: action.payload.token,
        loading: false,
      };
    case 'LOGIN_ERROR':
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error,
      };
    case 'LOGOUT':
      return {
        ...initialState,
        username: '',
        token: '',
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

// console.log(initialState);

const BlogContext = createContext();
const AuthStateContext = createContext();
const AuthDispatchContext = createContext();

export const useAuthState = () => {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
};

export const useAuthDispatch = () => {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context;
};

export default BlogContext;

export const BlogContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(blogsReducer, null);

  return (
    <BlogContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </BlogContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [user, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={user}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(BlogContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(BlogContext);
  return notificationAndDispatch[1];
};
