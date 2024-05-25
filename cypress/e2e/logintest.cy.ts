describe('Login Component', () => {
    beforeEach(() => {
      // Stel de URL in naar de pagina waar het LoginComponent zich bevindt.
      cy.visit('/auth/login');
    });
  
    it('should display the login form', () => {
      // Controleer of het formulier bestaat
      cy.get('form').should('exist');
  
      // Controleer of de e-mail- en wachtwoordvelden bestaan
      cy.get('#email').should('exist');
      cy.get('#password1').should('exist');
    });
  
    it('should show validation messages for invalid input', () => {
      // Klik op de submit knop zonder iets in te vullen
      cy.get('#loginbutton').click(); 
      cy.contains('button', 'Login').click();
  
      // Controleer of de validatieboodschappen worden getoond
      cy.get('.error-message-email').should('contain', 'Email is required');
      cy.get('.error-message-password').should('contain', 'Password is required');
    });
  
    it('should log in with valid credentials', () => {
      // Vul het e-mail- en wachtwoordveld in
      cy.get('#email').type('valid.email@example.com');
      cy.get('#password1').type('validpassword');
  
      // Mock de AuthService om een succesvolle login te simuleren
      cy.intercept('POST', '/api/login', {
        statusCode: 200,
        body: {
          token: 'validToken'
        }
      }).as('loginRequest');
  
      // Klik op de submit knop
  
      // Wacht op de loginRequest en controleer of de navigatie naar de productenpagina plaatsvindt
      cy.wait('@loginRequest').its('response.statusCode').should('eq', 500);
      cy.url().should('include', '/products');
    });
  
    it('should show an error message for invalid credentials', () => {
      // Vul het e-mail- en wachtwoordveld in
      cy.get('#email').type('invalid.email@example.com');
      cy.get('#password1').type('invalidpassword');
  
      // Mock de AuthService om een mislukte login te simuleren
      cy.intercept('POST', '/api/login', {
        statusCode: 401,
        body: {
          message: 'Invalid credentials'
        }
      }).as('loginRequest');
  
      // Klik op de submit knop
      cy.get('button[type="submit"]').click();
  
      // Wacht op de loginRequest en controleer of de foutboodschap wordt getoond
      cy.wait('@loginRequest').its('response.statusCode').should('eq', 401);
      cy.get('.error-message').should('contain', 'Login failed: Invalid credentials');
    });
  });
  