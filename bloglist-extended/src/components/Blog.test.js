import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import * as userEvent from '@testing-library/user-event';
import Togglable from './Togglable';
import BlogViewToggle from './BlogViewToggle';
import BlogForm from './BlogForm';
import Blog from './Blog';

test('check for pass', async () => {
  const blog = {
    title: 'The warden of the North, proposes',
    author: 'Odo Peter Ebere',
    url: 'http://localhost:3003/api/blogs',
    user: '645acf112cb7f574fb4c2fc0',
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} handleUpdate={mockHandler} />);

  // const element = screen.getByText('The warden of the North, proposes');
  // screen.debug();
  // expect(element).toBeDefined();

  // console.log(userEvent);

  const user = userEvent.default.setup();
  const button = screen.getByText('like');
  await user.click(button);

  expect(mockHandler.mock.calls).toHaveLength(0);
}, 100000);

describe('<Toggable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <Togglable buttonLabel1="show..." buttonLabel2="hide">
        <div className="testDiv">toggable content</div>
      </Togglable>
    ).container;
  });

  test('renders its children', async () => {
    await screen.findAllByText('toggable content');
  }, 100000);

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.toggableContent');
    expect(div).toHaveStyle('display: none');
  }, 100000);

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.default.setup();
    const button = screen.getByText('show...');
    await user.click(button);

    const div = container.querySelector('.toggableContent');
    expect(div).not.toHaveStyle('display: none');
  }, 100000);

  test('toggled content can be closed', async () => {
    const user = userEvent.default.setup();
    const btn = screen.getByText('show...');
    await user.click(btn);

    const closeBtn = screen.getByText('hide');
    await user.click(closeBtn);

    const div = container.querySelector('.toggableContent');
    expect(div).toHaveStyle('display: none');
  });
});

describe('<BlogViewToggable />', () => {
  let container;

  beforeEach(() => {
    container = render(
      <BlogViewToggle buttonLabel1="view" buttonLabel2="hide">
        <div className="testDiv">Blog view being toggled</div>
      </BlogViewToggle>
    ).container;
  });

  test('renders its children', async () => {
    await screen.findAllByText('Blog view being toggled');
  }, 100000);

  test('at start the children are not displayed', () => {
    const div = container.querySelector('.blogToggableContent');
    expect(div).toHaveStyle('display: none');
  }, 100000);

  test('after clicking the button, children are displayed', async () => {
    const user = userEvent.default.setup();
    const button = screen.getByText('view');
    await user.click(button);

    const div = container.querySelector('.blogToggableContent');
    expect(div).not.toHaveStyle('display: none');
  }, 100000);

  test('toggled content can be closed', async () => {
    const user = userEvent.default.setup();
    const btn = screen.getByText('view');
    await user.click(btn);

    const closeBtn = screen.getByText('hide');
    await user.click(closeBtn);

    const div = container.querySelector('.blogToggableContent');
    expect(div).toHaveStyle('display: none');
  });

  test('event handler is called twice when button is clicked twice and the likes count is increased by 1', async () => {
    const blog = {
      title: 'The warden of the North, proposes',
      author: 'Odo Peter Ebere',
      url: 'http://localhost:3003/api/blogs',
      user: '645acf112cb7f574fb4c2fc0',
      likes: 4,
    };

    const updateBlog = jest.fn();
    const user = userEvent.default.setup();

    render(<Blog blog={blog} handleUpdate={updateBlog} />);

    // const likes = await screen.findByText('likes');
    const updateBtn = screen.getByText('like');

    await user.click(updateBtn);
    await user.click(updateBtn);

    console.log(updateBlog.mock.calls);

    expect(updateBlog.mock.calls).toHaveLength(2);
    expect(updateBlog.mock.calls[1][0].likes).toBe(5);
  });
});

describe('<BlogForm/>', () => {
  test('The <BlogForm /> updates the parent state and calls onSubmit', async () => {
    const createBlog = jest.fn();
    const user = userEvent.default.setup();

    render(<BlogForm createBlog={createBlog} />);

    const input = screen.getByPlaceholderText('Enter Blog Author...');
    const sendBtn = screen.getByText('create');

    await user.type(input, 'Odo Peter Ebere');
    await user.click(sendBtn);

    // console.log(createBlog.mock.calls[0][0].url);

    expect(createBlog.mock.calls).toHaveLength(1);
    expect(createBlog.mock.calls[0][0].author).toBe('Odo Peter Ebere');
  });
});

// describe('Blog App', function () {
//   beforeEach(function () {
//     cy.request('POST', 'http://localhost:3003/api/testing/reset');

//     const user = {
//       name: 'Odo Peter Ebere',
//       username: 'odopeter',
//       password: '123456',
//     };

//     cy.request('POST', 'http://localhost:3003/api/users/', user);
//     cy.visit('http://localhost:3000');
//   });

//   it('front page can be opened, only the log in button is visible', function () {
//     cy.contains('login');
//   });

//   it('user can login', function () {
//     cy.contain('login').click();
//     cy.get('#username').type('odopeter');
//     cy.get('#password').type('123456');
//     cy.get('#login-btn').click();
//     cy.contains('Odo Peter Ebere logged in');
//   });

//   it('login form can be opened', function () {
//     cy.contains('create new blog').click();
//     cy.get('#title').type('Blog for the cypress tests');
//     cy.get('#author').type('Odo Peter Ebere');
//     cy.get('#url').type('http://localhost:3000');
//     cy.get('#submit-btn').click();

//     cy.contains('Blog for the cypress tests');
//   });
// });
