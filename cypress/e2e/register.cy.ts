describe('Register Component', () => {
    beforeEach(() => {
      cy.visit('/auth/register'); // Correct the URL
    });
  
    it('should display the registration form', () => {
      cy.get('form').should('exist');
      cy.get('#email').should('exist');
      cy.get('#password1').should('exist'); // Correct the password field ID
      cy.get('#password2').should('exist'); // Correct the repeated password field ID
      cy.get('#firstname').should('exist');
      cy.get('#lastname').should('exist');
    });
  
    it('should register with valid input', () => {
      // Mock de AuthService om een succesvolle registratie te simuleren
      cy.intercept('POST', '/api/auth/register', {
        statusCode: 200,
        body: {
          token: 'validToken'
        }
      }).as('registerRequest');
  
      cy.get('#email').type('valid.email@example.com');
      cy.get('#password1').type('validpassword'); // Correct the password field ID
      cy.get('#password2').type('validpassword'); // Correct the repeated password field ID
      cy.get('#firstname').type('Valid');
      cy.get('#lastname').type('User');
      
      // Controleer of de knop niet is uitgeschakeld en klik op de submit knop
      cy.get('#registerbutton').should('not.be.disabled').click();
  
      // Wacht op de registerRequest en controleer de respons
      cy.wait('@registerRequest').its('response.statusCode').should('eq', 200);
    //   cy.url().should('include', '/products');
    });
  
    // it('should show validation messages for invalid input', () => {
    //   cy.get('#registerbutton').click();
    //   cy.get('.error-message-email').should('contain', 'Email is required');
    //   cy.get('.error-message-password').should('contain', 'Password is required');
    //   cy.get('.error-message-repeated_password').should('contain', 'Repeated password is required');
    // });
  
    // it('should show an error message for invalid registration', () => {
    //   // Mock de AuthService om een mislukte registratie te simuleren
    //   cy.intercept('POST', '/api/auth/register', {
    //     statusCode: 400,
    //     body: {
    //       message: 'Registration failed'
    //     }
    //   }).as('registerRequest');
  
    //   cy.get('#email').type('invalid.email@example.com');
    //   cy.get('#password1').type('short');
    //   cy.get('#password2').type('short');
    //   cy.get('#registerButton').should('not.be.disabled').click();
  
    //   // Wacht op de registerRequest en controleer de respons
    //   cy.wait('@registerRequest').its('response.statusCode').should('eq', 400);
    //   cy.get('.error-message').should('contain', 'Registration failed');
    // });
  });
  