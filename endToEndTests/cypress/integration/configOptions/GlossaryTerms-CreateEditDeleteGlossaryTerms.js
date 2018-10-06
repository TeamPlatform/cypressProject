const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');
const loginUtils = require('../../utils/loginUtils');

describe('Create, edit, and delete Glossary Terms', function () {
    beforeEach(() => {
        loginUtils.loginToAMI('cypress1');
    });

    afterEach(() => {
        loginUtils.logoutFromAMI();
    });

    it('Creates a new Glossary Term', function () {
        // Open the config options workspace.
        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Glossary Terms definition tool.
        configOptionsUtils.selectTool('Glossary Terms');

        // Check that the term to be created does not already exist.
        cy.get('body', {timeout: 30000}).then((body) => {
            if (body.find('a:contains("GlossaryTermTest")', {timeout: 2000}).length) {
                // Delete the test term.
                cy.get('a:contains("GlossaryTermTest")').parent('li').within(() => {
                    cy.get('div > input').click();
                });
                configOptionsUtils.selectToolMenuItem('Delete Glossary Term...');
                cy.get('#ws-dialog-submit').click();
                cy.wait(1100);
            }
        });

        // Open 'Create Glossary Terms'
        configOptionsUtils.selectToolMenuItem('Create Glossary Term...');

        // Try to save a blank named term.
        cy.get('#ab-editor-name').clear();
        cy.get('#ws-dialog-submit').should('be.disabled');

        // Add a name for a term.
        cy.get('#ab-editor-name').clear().type('GlossaryTermTest');

        // Give the term a shortcut (ctrl+shift+g).
        cy.get('#ab-editor-shortcut-ctrl').click();
        cy.get('#ab-editor-shortcut-shift').click();
        cy.get('#ab-editor-shortcut-key').clear().type('g');

        // Give the term a value (@_@).
        cy.get('#ab-channels-display-name_1-10').clear().type('@_@');

        // Submit the new term.
        cy.get('#ws-dialog-submit').click();

        cy.get('a:contains("GlossaryTermTest")').should('be.visible');
    });

    it('Creates duplicate Glossary Terms with names in the same case', function () {
        changeDropdownUtils.changeWorkspace('Configuration Options');

        configOptionsUtils.selectTool('Glossary Terms');

        // Open 'Create Glossary Terms'
        configOptionsUtils.selectToolMenuItem('Create Glossary Term...');

        // Add a name for a term.
        cy.get('#ab-editor-name').clear().type('GlossaryTermTest');

        // Submit the new term.
        cy.get('#ws-dialog-submit').click();

        cy.get('body', {timeout: 30000}).then((body) => {
            if (body.find('div.ws-error-dialog', {timeout: 2000}).length) {
                // Check the warning is for an existing term with a duplicate name.
                cy.get('span.error-code').then((warningPopup) => {
                    expect(Cypress.$(warningPopup).text()).to.equal('1299: ');
                });
                cy.get('#ws-dialog-2-submit').click();
            }
        });
    });

    it.skip('Creates duplicate Glossary Terms with name in lower case', function () {
        changeDropdownUtils.changeWorkspace('Configuration Options');

        configOptionsUtils.selectTool('Glossary Terms');

        // Check that the term to be created does not already exist.
        cy.get('body', {timeout: 30000}).then((body) => {
            if (body.find('a:contains("glossarytermtest")', {timeout: 2000}).length) {
                // Delete the test term.
                cy.get('a:contains("glossarytermtest")').parent('li').within(() => {
                    cy.get('div > input').click();
                });
                configOptionsUtils.selectToolMenuItem('Delete Glossary Term...');
                cy.get('#ws-dialog-submit').click();
                cy.wait(1100);
            }
        });

        // Open 'Create Glossary Terms'
        configOptionsUtils.selectToolMenuItem('Create Glossary Term...');

        // Add a name for a term.
        cy.get('#ab-editor-name').clear().type('glossarytermtest');

        // Submit the new term.
        cy.get('#ws-dialog-submit').click();

        cy.get('a:contains("glossarytermtest")').should('be.visible');
    });

    it('Edits a Glossary Term', function () {
        changeDropdownUtils.changeWorkspace('Configuration Options');

        configOptionsUtils.selectTool('Glossary Terms');

        // Open a glossary term for editing.
        cy.get('a:contains("GlossaryTermTest")').click();
        cy.get('#ab-editor-name').should('be.visible');

        // Enter a new value.
        cy.get('#ab-channels-display-name_1-10').clear().type('@^@').should('have.value', '@^@');

        cy.get('#ws-dialog-cancel').click();
    });

    it('Deletes a glossary term', function () {
        changeDropdownUtils.changeWorkspace('Configuration Options');

        configOptionsUtils.selectTool('Glossary Terms');

        // Delete the test term.
        cy.get('a:contains("GlossaryTermTest")').parent('li').within(() => {
            cy.get('div > input').click();
        });

        // Cancel the delete request.
        configOptionsUtils.selectToolMenuItem('Delete Glossary Term...');
        cy.get('#ws-dialog-cancel').click();

        // Confirm the terms still exist.
        cy.get('a:contains("GlossaryTermTest")').should('exist');

        // Confirm the delete request
        configOptionsUtils.selectToolMenuItem('Delete Glossary Term...');
        cy.get('#ws-dialog-submit').click();
        cy.wait(1100);
    });

    it.skip('Deletes another glossary term', function () {
        changeDropdownUtils.changeWorkspace('Configuration Options');

        configOptionsUtils.selectTool('Glossary Terms');

        // Delete the test term.
        cy.get('a:contains("glossarytermtest")').parent('li').within(() => {
            cy.get('div > input').click();
        });

        // Cancel the delete request.
        configOptionsUtils.selectToolMenuItem('Delete Glossary Term...');
        cy.get('#ws-dialog-cancel').click();

        // Confirm the terms still exist.
        cy.get('a:contains("glossarytermtest")').should('exist');

        // Confirm the delete request
        configOptionsUtils.selectToolMenuItem('Delete Glossary Term...');
        cy.get('#ws-dialog-submit').click();
        cy.wait(1100);
    });
});
