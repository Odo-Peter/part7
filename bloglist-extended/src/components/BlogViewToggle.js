import { useState, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const BlogViewToggle = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <div>
      <div
        style={{ display: 'flex', gap: '5px' }}
        className="blogViewContainer"
      >
        <div>
          <span className="title">
            <Link to={`/blogs/${props.id}`}>{props.title}</Link>
          </span>
          <br />
          <span className="author">{props.author}</span>
        </div>
        <button id="view" style={hideWhenVisible} onClick={toggleVisibility}>
          {props.buttonLabel1}
        </button>
        <button style={showWhenVisible} onClick={toggleVisibility}>
          {props.buttonLabel2}
        </button>
      </div>
      <div>
        <div style={showWhenVisible} className="blogToggableContent">
          {props.children}
        </div>
      </div>
    </div>
  );
});

BlogViewToggle.propTypes = {
  buttonLabel1: PropTypes.string.isRequired,
  buttonLabel2: PropTypes.string.isRequired,
};

BlogViewToggle.displayName = 'BlogViewToggle';

export default BlogViewToggle;
