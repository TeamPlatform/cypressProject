const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');

describe('Adding Agility Character Styles', function () {
    const createStyle = 'Create Agility Style...';
    
    it('Creates and deletes an Agility character style', function () {
        const createStyleName = '0 Created Char Style formatting';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Agility Styles tool.
        configOptionsUtils.selectTool('Agility Styles');

        // Open 'Create Agility Styles'
        configOptionsUtils.selectToolMenuItem(createStyle);

        // Input style name and submit the form.
        cy.get('#ab-editor-name').type(createStyleName);
        cy.get('#ab-agility-styles-editor-style-type').select('Character');

        // Check "use in tables".
        cy.get('#ab-agility-styles-editor-use-in-tables').click();

        // Tick the "Menu Item" box.
        cy.get('#ab-agility-styles-editor-menu-item').click();

        // Switch on "Bold" and "Underline".
        cy.get('#ab-agility-styles-editor-bold').select('On');
        cy.get('#ab-agility-styles-editor-underline').select('On');

        // Enable foreground colour.
        cy.get('#ab-agility-styles-editor-foreground-undefined').should('be.checked').click();
        cy.get('#ab-agility-styles-editor-foreground-colour').invoke('val', '#1BE00B');

        // Submit the dialog.
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

        loginUtils.logoutFromAMI();
    });
});
