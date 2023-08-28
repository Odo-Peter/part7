import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

import { useNotificationDispatch } from '../context/BlogContext';

import blogService from '../services/blogs';
import Header from '../components/Header';
import Notification from '../components/Notification';

const Blogs = () => {
  const [comment, setComment] = useState('');

  const { id } = useParams();
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient();
  const { data, error } = useQuery(['blogs'], blogService.getAll, {
    refetchOnWindowFocus: false,
    // retry: 1,
  });

  const soloBlog = data ? data.filter((blog) => blog.id === id) : null;
  const details = soloBlog ? soloBlog[0] : null;
  const comments = soloBlog ? soloBlog[0].comments : null;
  const toBeUsed = new Set(comments);

  // for updating the likes in the blog app
  const updateBlogMutation = useMutation(blogService.updateOne, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      const updateBlogsArray = [...blogs];
      const index = blogs.findIndex((blog) => blog.id === updatedBlog.id);

      if (index !== -1) {
        updateBlogsArray[index] = {
          ...updateBlogsArray[index],
          likes: updateBlogsArray[index].likes + 1,
        };
      }

      queryClient.setQueryData(['blogs'], updateBlogsArray);

      dispatch({
        type: 'LIKE',
        payload: updatedBlog.title,
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

  // ^^^^^^^ ===== ^^^^^^
  const updateBlog = async (updatedBlog) => {
    try {
      updateBlogMutation.mutate({
        ...updatedBlog,
        likes: updatedBlog.likes + 1,
      });
    } catch (err) {
      console.log('[ERR_BLOG_LIKES]', err);
    }
  };

  const updateBlogCommentMutation = useMutation(blogService.updateComment, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      const updateBlogsArray = [...blogs];
      const index = blogs.findIndex((blog) => blog.id === updatedBlog.id);

      if (index !== -1) {
        updateBlogsArray[index] = {
          ...updateBlogsArray[index],
          comments: updateBlogsArray[index].comments.concat(comment),
        };
      }

      queryClient.setQueryData(['blogs'], updateBlogsArray);

      //   dispatch({
      //     type: 'COMMENT',
      //     payload: updatedBlog.comments[comments.length - 1],
      //   });
      //   setTimeout(() => {
      //     dispatch({ type: null });
      //   }, 5000);
      // },

      // onError: () => {
      //   dispatch({
      //     type: 'ERR_CHECK',
      //     payload: 'An ERROR occured',
      //   });
      //   setTimeout(() => {
      //     dispatch({ type: null });
      //   }, 5000);
    },
  });

  // ^^^^^^^ ===== ^^^^^^
  const updateCommentBlog = async (updatedBlog) => {
    try {
      updateBlogCommentMutation.mutate({
        ...updatedBlog,
        comments: updatedBlog.comments.concat(comment),
      });
      setComment('');
    } catch (err) {
      console.log('[ERR_BLOG_COMMENTS]', err);
    }
  };

  const generateId = () => {
    return Math.floor(Math.random() * 10000);
  };

  if (!data || !soloBlog) return null;

  return (
    <div>
      <Notification />
      <Header />
      {error && (
        <p>Some crazy stuff happened, this should give an insight : {error}</p>
      )}
      <h2>
        {details.title} {details.author}
      </h2>
      <Link to={details.url}>{details.url}</Link>
      <p>
        {details.likes} likes{' '}
        <button onClick={() => updateBlog(details)}>like</button>
      </p>
      <p>added by {details.author}</p>
      <h3>comments</h3>
      <form onSubmit={() => updateCommentBlog(details)}>
        <input
          type="text"
          value={comment}
          name="comment"
          id="comment"
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      {comments.length < 1 ? (
        <ul>
          <li>No available comments at the moment</li>
        </ul>
      ) : (
        <ul>
          {comments.length > 1 &&
            [...toBeUsed].map((c) => <li key={generateId()}>{c}</li>)}
        </ul>
      )}
    </div>
  );
};

export default Blogs;
