describe('E-commerce Flow', () => {
    const user = {
        email: 'bob@bobbyluxuryenterprise.com',
        password: 'k2C^QNP!dnx4ft'
    };

    const product = {
        id: 1,
        name: 'Cashmere Hoodie',
        category: 'Sample Category'
    };

    beforeEach(() => {
        cy.session(user.email, () => {
            cy.visit('/auth/login');
            cy.get('#email', { timeout: 10000 }).should('be.visible').type(user.email);
            cy.get('#password1', { timeout: 10000 }).should('be.visible').type(user.password);
            cy.intercept('POST', '/api/auth/login').as('loginRequest');
            cy.get('#loginbutton').click();
            cy.wait('@loginRequest');
            cy.url().should('not.include', '/api/auth/login');
        });
    });

    it('should select a product, add it to the cart, place order, and check order history', () => {
        // Bezoek de productpagina
        cy.visit('/products/' + product.id);
        cy.url().should('include', '/products/' + product.id);

        // Selecteer productvarianten
        ['Grootte', 'Kleur', 'Print'].forEach((optionName) => {
            cy.get(`input.form-check-input[type="radio"][name="${optionName}"]`)
                .first()
                .click();
        });

        // Voeg product toe aan winkelwagen
        cy.contains('button', 'Buy').click();

        // Bezoek de winkelwagenpagina
        cy.visit('/cart');
        cy.url().should('include', '/cart');

        // Wacht tot de pagina geladen is
        cy.get('h1').contains('Cart', { timeout: 10000 }).should('be.visible');

        // Controleer of de "Place order" knop aanwezig is en klik erop
        cy.contains('button', 'Place order').should('be.visible').click();

        // Wacht op mogelijke redirect of bevestiging na het plaatsen van de bestelling
        // Dit kan variëren afhankelijk van hoe uw applicatie is opgezet
        cy.wait(2000); // Wacht 2 seconden voor eventuele verwerking

        // Navigeer naar de order history pagina
        // Vervang '/orders' door de juiste URL voor uw order history pagina
        cy.visit('/order');

        // Controleer of we op de juiste pagina zijn
        cy.url().should('include', '/order');

        // Controleer of de Order History titel aanwezig is
        cy.get('h1').contains('Order History', { timeout: 10000 }).should('be.visible');

        // Controleer of er ten minste één bestelling zichtbaar is
        cy.get('.card').should('exist');

        // Controleer of de bestelde productnaam zichtbaar is in de order history
        cy.contains(product.name).should('be.visible');

        // Optioneel: controleer andere details van de bestelling
        cy.contains('Total price:').next('p').should('be.visible');
        cy.contains('Order date:').next('p').should('be.visible');
    });
});