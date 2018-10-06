const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');

describe('WAVE-5009: Cannot edit the name of a price list', function () {

    it.skip('Renames a price list', function () { // Need to have a 7.2 server for this to work.
        const oldName = 'JBoss List';
        const newName = 'JBoss List Changed';

        // Log in as 'cypress1'.
        loginUtils.loginToAMI('cypress1');

        // Open Configuration Options, if necessary.
        changeDropdownUtils.changeWorkspace('Configuration Options');
        
        // Find the Price Lists option Gadget tab and open it if necessary. Give the workspace 5 seconds to appear.
        cy.get('#conf-priceLists', {timeout: 5000}).click();

        // Check we really have opened up the Price Lists.
        cy.get('#conf-gadget-title').should('contain', 'Price Lists');

        // Check that the new name we want isn't already in use.
        cy.get('#ab-item-list').should('not.contain', newName);

        // Open up the 'JBoss List' price list.
        cy.get('#ab-item-list a:contains("' + oldName + '")').filter((index, item) => Cypress.$(item).text() === oldName).click();

        // Change the price list's name.
        cy.get('#ab-editor-name').clear().type(newName);
        cy.get('#ws-dialog-submit').click();

        // Check that the new name is now in use. Fails if WAVE-5009 is still active.
        cy.get('#ab-item-list').should('contain', newName);

        // Open up the price list again, and rename it back.
        cy.get('#ab-item-list a:contains("' + newName + '")').filter((index, item) => Cypress.$(item).text() === newName).click();
        cy.get('#ab-editor-name').clear().type(oldName);
        cy.get('#ws-dialog-submit').click();

        loginUtils.logoutFromAMI();
    });

});
