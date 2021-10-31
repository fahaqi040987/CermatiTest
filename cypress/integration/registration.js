describe ('Registration', () => {
    beforeEach(() => {
        cy.visit('https://www.cermati.com/gabung');
      });
    it ('Required field validation', ()=> {
        cy.get('#email').click();
        cy.get('#password').click();
        cy.get('#confirm-password').click();
        cy.get('#first-name').click();
        cy.get('#last-name').click();
        cy.get('#mobile-phone').click();
        cy.get('#residence-city').click();
        cy.get('.panel-body').click();
        cy.get(':nth-child(2) > .error-message-container > .error-message > div')
            .should('be.visible')
            .invoke('text')
            .should('equal', 'Input ini wajib diisi.');
        
    });
    it ('Email field validation', ()=> {
        const uuid = () => Cypress._.random(0, 1e6)
        const id = uuid()
        const testname = `testname${id}`
        cy.get('#email').type(testname);
        cy.get('.panel-body').click();
        cy.get(':nth-child(2) > .error-message-container > .error-message > div')
            .should('be.visible')
            .invoke('text')
            .should('equal', 'Format email tidak valid.')
    });
    it ('Password field validation', ()=> {
        cy.get('#password').type('abcdef')
        cy.get('.panel-body').click();
        cy.get(':nth-child(3) > .error-message-container > .error-message > div')
            .should('be.visible')
            .invoke('text')
            //.should('equal', 'Input ini wajib diisi.');
            .should('equal', 'Kata Sandi harus memiliki panjang antara 8 - 50 karakter dan mengandung minimal 1 huruf besar, 1 huruf kecil, dan 1 angka.')
    });
    it ('T&C validation', ()=> {
        cy.get('.nui-checkout-confirmation-text').click()
        cy.get('.panel-body').click();
        cy.get('.consent-error > .error-message-container > .error-message > div')
            .should('be.visible')
            .invoke('text')
            .should('equal', 'Anda harus menyetujui Syarat dan Ketentuan serta Kebijakan Privasi Cermati.com')
    });
    it ('Valid Registration', ()=> {
        cy.get('#email').type('FajarArdhi@example.com')
        cy.get('#password').type('abcdef123ghi')
        cy.get('#confirm-password').type('abcdef123ghi')
        cy.get('#first-name').type('Fajar Ardhi')
        cy.get('#last-name').type('Haqi')
        cy.get('#mobile-phone').type('081234567890')
        cy.get('#residence-city').type('depok');
        cy.get('[class="autocomplete-list"]').contains('KOTA DEPOK').click();
        cy.get('.btn')
            .click()
    });
});