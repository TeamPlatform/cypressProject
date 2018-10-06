const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');
const loginUtils = require('../../utils/loginUtils');

describe('Create, edit, and delete Price Types', function () {

    it('Creates and deletes valid Price Types', function () {
        const createPriceType = 'Create Price Type...';
        const createPriceTypeName = '0 CreatePriceTypesTest';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Price Types tool.
        configOptionsUtils.selectTool('Price Types');

        // Open 'Create Price Types Definition...'
        configOptionsUtils.selectToolMenuItem(createPriceType);

        // Check that an empty name field disables the submit.
        cy.get('#ws-dialog-submit').should('be.disabled');

        // Input price type name and submit the form.
        cy.get('#ab-editor-name').type(createPriceTypeName);
        cy.get('#ws-dialog-submit').click();

        // Open 'Create Price Types'
        configOptionsUtils.selectToolMenuItem(createPriceType);

        // Input duplicate price type name and submit the form.
        cy.get('#ab-editor-name').type(createPriceTypeName);
        cy.get('#ws-dialog-submit').click();

        cy.get('.error-message').then((errorText) => {
            expect(Cypress.$(errorText).text()).to.equal("Price Types must have a unique name.");
            cy.get('#ws-dialog-2-submit').click();
            cy.get('#ws-dialog-cancel').click();
        });

        // Open the price type to edit.
        cy.get('a:contains("' + createPriceTypeName + '")').click();
        cy.get('#ab-editor-name').should('be.visible');
        cy.get('#ws-dialog-cancel').click();

        // Cancel then confirm a delete on the test price type.
        cy.get('a:contains("' + createPriceTypeName + '")').parent('li').within(() => {
            cy.get('div > input').click();
        });

        // Cancel a delete action.
        configOptionsUtils.selectToolMenuItem('Delete Price Type...');
        cy.get('#ws-dialog-cancel').click();

        // Confirm a delete action.
        configOptionsUtils.selectToolMenuItem('Delete Price Type...');
        cy.get('#ws-dialog-submit').click();

        // Logout.
        loginUtils.logoutFromAMI();
    });
});