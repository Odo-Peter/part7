describe('Blog App', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}testing/reset`);

    const user = {
      name: 'Odo Peter Ebere',
      username: 'odopeter',
      password: '123456',
    };

    const testUser = {
      name: 'Odo Pedro',
      username: 'odopedro',
      password: '123456',
    };

    cy.request('POST', `${Cypress.env('BACKEND')}users`, user);

    cy.request('POST', `${Cypress.env('BACKEND')}users`, testUser);

    cy.visit('');
  });

  it('Login form is shown', function () {
    cy.contains('Blogs');
    cy.contains('login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('odopeter');
      cy.get('#password').type('123456');
      cy.get('#login-btn').click();
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('odopeter');
      cy.get('#password').type('1234');
      cy.get('#login-btn').click();
      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');

      cy.get('html').should('not.contain', 'Odo Peter Ebere Logged in');
    });
  });

  describe('When logged in', function () {
    const user = {
      name: 'Odo Peter Ebere',
      username: 'odopeter',
      password: '123456',
    };
    beforeEach(function () {
      cy.login({ username: user.username, password: user.password });
    });

    it('A blog can be created', function () {
      cy.createBlog({
        title: 'Blog for the cypress tests',
        author: 'Odo Peter Ebere',
        url: 'http://localhost:3000',
      });

      cy.get('html').should('contain', 'Blog for the cypress tests');
    });

    describe('Blog features', function () {
      const newBlog = {
        title: 'Blog for the cypress tests',
        author: 'Odo Peter Ebere',
        url: 'http://localhost:3000',
        likes: 0,
      };
      beforeEach(function () {
        cy.createBlog({
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
          likes: newBlog.likes,
        });
      });

      it('User can like a blog', function () {
        cy.get('#view').click();
        cy.get('#like-btn').click();
        cy.get('.likes-count').should('contain', `${newBlog.likes + 1}`);
      });

      it('Blog creator can delete a blog', function () {
        cy.get('#view').click();
        cy.get('#delete-btn').click();
        cy.get('html').should('not.contain', newBlog.title);
      });

      describe('Visibility of the delete button', function () {
        it('Blog creator can see delete button', function () {
          cy.get('#view').click();
          cy.contains('remove');
        });

        it('A non creator cannot see the delete button', function () {
          cy.get('#logout-btn').click();
          cy.login({ username: 'odopedro', password: '123456' });
          cy.createBlog({
            title: 'From a test user',
            author: 'Odo Pedro',
            url: 'http://localhost:3000',
            likes: 4,
          });
          cy.contains('Blog for the cypress tests')
            .get('#view')
            .click()
            .should('not.contain', 'remove');
        });

        describe('Sorted blogs on render', function () {
          beforeEach(function () {
            cy.createBlog({
              title: 'Most Liked blog',
              author: 'Odo Pedro',
              url: 'http://localhost:3000',
              likes: 3,
            });
            cy.createBlog({
              title: 'Less liked blog',
              author: 'Odo Pedro',
              url: 'http://localhost:3000',
              likes: 3,
            });
          });

          it('Add likes to different blogs', function () {
            cy.contains('Most').get('#view').click().get('#like-btn').click();
            cy.contains('Most').get('#like-btn').click();
            cy.contains('Most').get('#like-btn').click();

            cy.contains('hide').click();

            cy.get('.title').then((val) => console.log(val));
          });

          it('Checks the orderliness of the blog based on likes count', function () {
            cy.get('.blog').eq(0).should('contain', 'Most Liked blog');
            cy.get('.blog').eq(1).should('contain', 'Less liked blog');
            cy.get('.blog')
              .eq(2)
              .should('contain', 'Blog for the cypress tests');
          });
        });
      });
    });
  });
});
