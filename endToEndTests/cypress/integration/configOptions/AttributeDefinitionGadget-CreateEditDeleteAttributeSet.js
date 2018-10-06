const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');
const loginUtils = require('../../utils/loginUtils');

describe('Create and delete Attribute Sets', function () {

    it('Creates and deletes valid attribute sets', function () {
        const createAttributeSet = 'Create Attribute Set...';
        const createAttributeSetName = '0 CreateAttributeSetTest';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Attribute Definition tool.
        configOptionsUtils.selectTool('Attribute Definitions');

        // Open 'Create Attribute Set...'
        configOptionsUtils.selectToolMenuItem(createAttributeSet);

        // Input attribute set name and submit the form.
        cy.get('#attrSetDefnLocDlg_10_name > input').type(createAttributeSetName);
        cy.get('#ws-dialog-submit').click();

        // Open 'Create Attribute Set... again.'
        configOptionsUtils.selectToolMenuItem(createAttributeSet);

        // Input duplicate attribute set name and submit the form.
        cy.get('#attrSetDefnLocDlg_10_name > input').type(createAttributeSetName);
        cy.get('#ws-dialog-submit').click();

        // Look for evidence that an error notification has been added to the tool.
        cy.get('div.ws-gadget-holder.ws-notification-box-holder').should('be.visible');

        // Close the error notification.
        cy.get('div.ws-gadget-holder.ws-notification-box-holder span.mdi-close').click();

        // Open the attribute set to edit.
        cy.get('a:contains("' + createAttributeSetName + '")', {timeout: 10000}).click();
        cy.get('#attrSetDefnLocDlg_10_name > input').should('be.visible');
        cy.get('#ws-dialog-cancel').click();

        cy.get('a:contains("' + createAttributeSetName + '")').parent('li').within(() => {
            cy.get('div > input').click();
        });
        configOptionsUtils.selectToolMenuItem('Delete Attribute Sets...');
        cy.get('#ws-dialog-submit').click();

        loginUtils.logoutFromAMI();
    });
});