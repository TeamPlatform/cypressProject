const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');
const loginUtils = require('../../utils/loginUtils');

describe('Create and delete Attribute Definitions', function () {

    it('Creates and deletes valid attribute definitions', function () {
        const createAttribute = 'Create Attribute Definition...';
        const createAttributeName = '0 CreateAttributeTest';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Attribute definition tool.
        configOptionsUtils.selectTool('Attribute Definitions');

        // Check that the term to be created does not already exist.
        cy.get('body', {timeout: 30000}).then((body) => {
            if (body.find(`a:contains(${createAttributeName})`, {timeout: 2000}).length) {
                // Delete the test term.
                cy.get(`a:contains(${createAttributeName})`).parent().find('input[type=checkbox]').click();
                configOptionsUtils.selectToolMenuItem('Delete Attribute Definitions');
                cy.get('#ws-dialog-submit').click();
                cy.wait(1100);
            }
        });

        // Open 'Create Attribute Definition...'
        configOptionsUtils.selectToolMenuItem(createAttribute);

        // Input attribute name and submit the form.
        cy.get('#attrDefnDlg_name').type(createAttributeName);
        cy.get('#ws-dialog-submit').click();

        // Open 'Create Attribute Definition...'
        configOptionsUtils.selectToolMenuItem(createAttribute);

        // Input duplicate attribute name and submit the form.
        cy.get('#attrDefnDlg_name').type(createAttributeName);
        cy.get('#ws-dialog-submit').click();

        cy.get('.error-message').then((errorText) => {
            expect(errorText.attr('title')).to.equal("Error from Agility Server: An attribute definition with name '0 CreateAttributeTest' already exists.");
        });
        cy.get('#ws-dialog-cancel').click();

        // Open the attribute to edit.
        cy.get('a:contains("' + createAttributeName + '")').click();
        cy.get('#attrDefnDlg_name').should('be.visible');
        cy.get('#ws-dialog-cancel').click();

        loginUtils.logoutFromAMI();
    });
});
