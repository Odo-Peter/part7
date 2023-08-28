import { useRef } from 'react';
import { Button } from 'react-bootstrap';
import { useMutation, useQueryClient } from 'react-query';
import blogServices from '../services/blogs';
import Togglable from './Togglable';
import { useNotificationDispatch } from '../context/BlogContext';

const BlogForm = () => {
  const dispatch = useNotificationDispatch();

  const blogFormRef = useRef();

  const queryClient = useQueryClient();
  const newBlogMutation = useMutation(blogServices.createBlog, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      dispatch({
        type: 'CREATE',
        payload: newBlog.title,
      });
      setTimeout(() => {
        dispatch({ type: null });
      }, 5000);
    },

    onError: () => {
      dispatch({
        type: 'ERR_CHECK',
        payload: 'An ERROR occured',
      });
      setTimeout(() => {
        dispatch({ type: null });
      }, 5000);
    },
  });

  const addBlog = async (e) => {
    e.preventDefault();

    const blogDetails = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
      likes: 0,
    };

    e.target.title.value = '';
    e.target.author.value = '';
    e.target.url.value = '';

    newBlogMutation.mutate(blogDetails);
  };

  return (
    <div>
      <div>
        <Togglable
          buttonLabel1="create new blog"
          buttonLabel2="cancel"
          ref={blogFormRef}
        >
          <h2>Create new</h2>
          <form onSubmit={addBlog}>
            <div>
              title{' '}
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Enter Blog Title..."
              />
            </div>
            <div>
              author{' '}
              <input
                type="text"
                id="author"
                name="author"
                placeholder="Enter Blog Author..."
              />
            </div>
            <div>
              url{' '}
              <input
                type="url"
                name="url"
                id="url"
                placeholder="Enter Blog URL..."
              />
            </div>
            <Button variant='warning' type="submit">
              create
            </Button>
          </form>
        </Togglable>
      </div>
    </div>
  );
};

export default BlogForm;
