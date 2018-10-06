const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');

describe('Set workspace in a user definition', function () {
    it('Creates a new workspace', function () {
        // Login to AMI.
        loginUtils.loginToAMI('cypress1');

        // Open the create workspace screen.
        cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 5000}).should('be.visible').then(() => {
            changeDropdownUtils.changeWorkspace('Create new workspace...');
        });

        // Enter a name for the workspace and submit.
        cy.get('#ed-workspace-displayName', {timeout: 5000}).should('be.visible').then((displayNameInput) => {
            cy.wrap(displayNameInput).type('UserWorkspaceTest');
        });
        cy.get('#ed-edit-ok').click();

        // Navigate to users in config options.
        cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 5000}).should('be.visible').then(() => {
            changeDropdownUtils.changeWorkspace('Configuration Options');
        });
        cy.get('#conf-UserGadget', {timeout: 5000}).click();

        //Set the user gadget to view admin users.
        cy.get('#us-group-selector', {timeout: 5000}).select('Admin Group');

        // Expand the workspaces panel.
        cy.get('#us-workspaces-tab-heading').click();

        // Look for created workspace in the list.
        cy.get('#us-workspaces-list').within(() => {
            cy.get('label').contains('UserWorkspaceTest');
        });

        // Select the test workspace and open the editor.
        changeDropdownUtils.changeWorkspace('UserWorkspaceTest');
        changeDropdownUtils.changeWorkspace('Edit current workspace...');

        cy.get('#ed-edit-delete', {timeout: 5000}).should('be.visible').then((deleteButton) => {
            cy.wrap(deleteButton).click();
        });
        cy.get('#ws-dialog-submit').click();

        // Select a workspace as the test workspaces have been deleted.
        cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 5000}).should('be.visible').then(() => {
            changeDropdownUtils.changeWorkspace('QA Attribute Gadget');
        });

        loginUtils.logoutFromAMI();
    });
});