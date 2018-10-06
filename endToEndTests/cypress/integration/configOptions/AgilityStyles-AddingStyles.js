const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');
const loginUtils = require('../../utils/loginUtils');

describe('Adding Agility Styles', function () {
    const createStyle = 'Create Agility Style...';
    
    it('Creates and deletes an Agility Style', function () {
        const createStyleName = '0 Created Style';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Agility Styles tool.
        configOptionsUtils.selectTool('Agility Styles');

        // Open 'Create Agility Styles'
        configOptionsUtils.selectToolMenuItem(createStyle);

        // Input style name and submit the form.
        cy.get('#ab-editor-name').type(createStyleName);
        cy.get('#ab-agility-styles-editor-style-type').select('Paragraph');
        cy.get('#ws-dialog-submit').click();

        // Delete styles using the test style name.
        cy.get('a:contains("' + createStyleName + '")').parent('li').within(() => {
            cy.get('div > input').click();
        });

        configOptionsUtils.selectToolMenuItem('Delete Agility Style');
        cy.get('#ws-confirm-dialog-message').then((confirmText) => {
            expect(confirmText.text()).to.equal('You are about to delete 1 Agility Styles');
        });
        cy.get('#ws-dialog-submit').click();

        // Logout.
        loginUtils.logoutFromAMI();
    });

    it('Tries to create agility styles without a name, then without a type', function () {
        const createStyleFailName = '0 Created Fail Style';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Agility Styles tool.
        configOptionsUtils.selectTool('Agility Styles');

        // Open 'Create Agility Styles'
        configOptionsUtils.selectToolMenuItem(createStyle);

        // Input style name without type and try to submit the form.
        cy.get('#ab-editor-name').type(createStyleFailName);

        // Check that the submit button is disabled.
        cy.get('#ws-dialog-submit').should('be.disabled');

        // Clear the name and select a type.
        cy.get('#ab-editor-name').clear();
        cy.get('#ab-agility-styles-editor-style-type').select('Paragraph');

        // Check that the submit button is disabled.
        cy.get('#ws-dialog-submit').should('be.disabled');
        cy.get('#ws-dialog-cancel').click();

        // Logout.
        loginUtils.logoutFromAMI();
    });
});