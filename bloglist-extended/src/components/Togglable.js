import { useState, forwardRef, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Togglable = forwardRef((props, refs) => {
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
      <div style={hideWhenVisible}>
        <Button variant="danger" onClick={toggleVisibility}>
          {props.buttonLabel1}
        </Button>
      </div>
      <div style={showWhenVisible} className="toggableContent">
        {props.children}
        <Button variant="danger" onClick={toggleVisibility}>
          {props.buttonLabel2}
        </Button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel1: PropTypes.string.isRequired,
  buttonLabel2: PropTypes.string.isRequired,
};

Togglable.displayName = 'Togglable';

export default Togglable;
