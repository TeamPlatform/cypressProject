const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');

describe.skip('Adding duplicate Agility Styles', function () { // Will fail because style names are case-insignificant.
    it('Creates and deletes an Agility Style', function () {
        const createStyleName = 'bold';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Agility Styles tool.
        configOptionsUtils.selectTool('Agility Styles');

        // Open 'Create Agility Styles'
        configOptionsUtils.selectToolMenuItem('Create Agility Style...');

        // Input style name and submit the form.
        cy.get('#ab-editor-name').type(createStyleName);
        cy.get('#ab-agility-styles-editor-style-type').select('Paragraph');
        cy.get('#ws-dialog-submit').click();

        // Delete styles using the test style name.
        cy.get('a:contains("' + createStyleName + '")').parent('li').within(() => {
            cy.get('div > input').click();
        });
        configOptionsUtils.selectToolMenuItem('Delete Agility Style...');
        cy.get('#ws-confirm-dialog-message').then((confirmText) => {
            expect(confirmText.text()).to.equal('You are about to delete 1 Agility Styles');
        });
        cy.get('#ws-dialog-submit').click();

        loginUtils.logoutFromAMI();
    });
});