describe('E-commerce Flow', () => {
    const user = {
      email: 'testuser@example.com',
      password: 'password123'
    };
  
    const product = { 
      id: 1,
      name: 'Cashmere Hoodie',
      category: 'Sample Category'
    };
  
    before(() => {
      // Log in before running the tests
      cy.visit('/auth/login');
    
      // Wacht tot de pagina volledig is geladen
      cy.get('body').should('be.visible');
    
      // Wacht tot het emailveld geladen is
      cy.wait(1000); // Wacht 1 seconde
    
      // Controleer of het emailveld zichtbaar is
      cy.get('#email').should('exist').and('be.visible').type(user.email);
    
      // Typ het wachtwoord en klik op de login-knop
      cy.get('#password1').should('exist').and('be.visible').type(user.password);
      cy.get('#loginbutton').should('exist').and('be.visible').click();
    
      // Check if login was successful by verifying the URL or any element on the dashboard
      cy.url().should('not.include', '/api/auth/login');
    });
  
    it('should select a product and add it to the cart', () => {
      cy.visit('/products/' + product.id);
    
      // Ensure that we are on the product detail page
      cy.url().should('include', '/products/' + product.id);
  
      // Select product options (assuming there are options to select)
      cy.get('input[type=radio]').first().click();
    
      // Click "Buy" to add product to the cart
      cy.get('button[aria-label="Product kopen"]').click();
    
      // Verify that the product is added to the cart
      cy.visit('/cart');
      cy.contains('h3', 'Shopping Cart').should('be.visible');
      cy.contains('.lead', product.name).should('be.visible');
    });
  
 
  });
  