const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');
const loginUtils = require('../../utils/loginUtils');

describe('Glossary Terms - Same For All Languages', function () {
    it('Sets and checks all language values', function () {
        loginUtils.loginToAMI('cypress1');
        changeDropdownUtils.changeWorkspace('Configuration Options');
        configOptionsUtils.selectTool('Glossary Terms');

        // Open 'Create Glossary Terms'
        configOptionsUtils.selectToolMenuItem('Create Glossary Term...');

        // Populate the "Quark" value with an ampersand.
        cy.get('#ab-channels-display-name_1-10').type('&');

        // Set "Same for all languages".
        cy.get('#ab-same-for-all-languages').should('not.be.checked').click();
        cy.get('#ws-dialog-2-submit').click();

        // Wait for the button fade to finish.
        cy.wait(2000);

        // Check that the localise button is disabled.
        cy.get('#ab-channels-row-localise_1-10').should('be.disabled');

        // Unset "Same for all languages".
        cy.get('#ab-same-for-all-languages').should('be.checked').click();

        // Open the localise dialogue.
        cy.get('#ab-channels-row-localise_1-10').click();

        // Check that all language values have been set to ampersand.
        cy.get('#ab-channels-localised-table').within(() => {
            cy.get('tr[style!="display: none;"] > td > input').then((inputs) => {
                for (var i = 0; i < inputs.length; i++) {
                    expect(inputs[i]).to.have.value('&');
                }
            });
        });

        loginUtils.logoutFromAMI();
    });
});