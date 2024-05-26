describe('Login Component', () => {
    beforeEach(() => {
      cy.visit('/auth/login');
    });
  
    it('should display the login form', () => {
      cy.get('form').should('exist');
      cy.get('#email').should('exist');
      cy.get('#password1').should('exist');
    });
  
    // it('should show validation messages for invalid input', () => {
    //   cy.get('#loginbutton').click({ force: true });
    //   cy.contains('button', 'Login').click();
    // //   cy.get('.error-message-email').should('contain', 'Email is required');
    // //   cy.get('.error-message-password').should('contain', 'Password is required');
    // });
  
    it('should log in with valid credentials', () => {
      // Mock de AuthService om een succesvolle login te simuleren
      cy.intercept('POST', '/api/auth/login', {
        statusCode: 200,
        body: {
          token: 'validToken'
        }
      }).as('loginRequest');
  
      cy.get('#email').type('valid.email@example.com');
      cy.get('#password1').type('validpassword');
      
      // Controleer of de knop niet is uitgeschakeld en klik op de submit knop
      cy.get('#loginbutton').should('not.be.disabled').click();
  
      // Wacht op de loginRequest en controleer de respons
      cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    //   cy.url().should('include', '/products');
    });
  
    it('should show an error message for invalid credentials', () => {
      // Mock de AuthService om een mislukte login te simuleren
      cy.intercept('POST', '/api/auth/login', {
        statusCode: 401,
        body: {
          message: 'Invalid credentials'
        }
      }).as('loginRequest');
  
      cy.get('#email').type('invalid.email@example.com');
      cy.get('#password1').type('invalidpassword');
  
      // Controleer of de knop niet is uitgeschakeld en klik op de submit knop
      cy.get('#loginbutton').should('not.be.disabled').click();
  
      // Wacht op de loginRequest en controleer de respons
      cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
    //   cy.get('.error-message').should('contain', 'Login failed: Invalid credentials');
    });
  });
  