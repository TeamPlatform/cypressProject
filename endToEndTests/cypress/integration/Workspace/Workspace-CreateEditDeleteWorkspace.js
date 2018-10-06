const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');

describe('Create, edit, and delete workspaces', function () {
    it('Creates a new workspace', function () {

        // Login to AMI.
        loginUtils.loginToAMI('cypress1');

        // Open the create workspace screen.
        cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 5000}).should('be.visible').then(() => {
            changeDropdownUtils.changeWorkspace('Create new workspace...');
        });

        // Ensure workspace name is empty and attempt to submit.
        cy.get('#ed-workspace-displayName', {timeout: 5000}).should('be.visible').then((displayNameInput) => {
            cy.wrap(displayNameInput).clear();
        });
        cy.get('#ed-edit-ok').click();

        // Confirm an error due to no name entered (Errorcode: 1215).
        cy.get('.error-code').then((errorCode) => {
            expect(Cypress.$(errorCode[1]).text()).to.equal('1215: ');
        });
        cy.get('#ws-dialog-submit').click();

        // Enter a name for the workspace and submit.
        cy.get('#ed-workspace-displayName', {timeout: 5000}).should('be.visible').then((displayNameInput) => {
            cy.wrap(displayNameInput).type('CreateWorkspaceTest');
        });
        cy.get('#ed-edit-ok').click();

        //Confirm select workspace has reappeared.
        cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 5000}).should('be.visible').then(() => {
            // Open the create workspace screen a second time and recreate the above workspace.
            changeDropdownUtils.changeWorkspace('Create new workspace...');
        });

        // Enter a lower-case version of the test name
        cy.get('#ed-workspace-displayName', {timeout: 5000}).should('be.visible').then((displayNameInput) => {
            cy.wrap(displayNameInput).type('createworkspacetest');
        });
        cy.get('#ed-edit-ok').click();

        //Confirm select workspace has reappeared.
        cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 5000}).should('be.visible').then(() => {
            // Open the create workspace screen a second time and recreate the above workspace.
            changeDropdownUtils.changeWorkspace('Create new workspace...');
        });

        cy.get('#ed-workspace-displayName', {timeout: 5000}).should('be.visible').then((displayNameInput) => {
            cy.wrap(displayNameInput).type('CreateWorkspaceTest');
        });
        cy.get('#ed-edit-ok').click();

        // Check for duplicate workspace name error (Errorcode: 1011).
        cy.get('.error-code').then((errorCode) => {
            expect(Cypress.$(errorCode).text()).to.equal('1011: ');
        });
        cy.get('#ws-dialog-submit').click();

        // Select the test workspace and open the editor.
        changeDropdownUtils.changeWorkspace('CreateWorkspaceTest');
        changeDropdownUtils.changeWorkspace('Edit current workspace...');

        cy.get('#ed-edit-delete', {timeout: 5000}).should('be.visible').then((deleteButton) => {
            cy.wrap(deleteButton).click();
        });
        cy.get('#ws-dialog-submit').click();

        // Select and remove the second test workspace.
        cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 5000}).should('be.visible').then(() => {
            changeDropdownUtils.changeWorkspace('CreateWorkspaceTest');
        });
        changeDropdownUtils.changeWorkspace('Edit current workspace...');

        // Delete the workspace.
        cy.get('#ed-edit-delete', {timeout: 5000}).should('be.visible').then((deleteButton) => {
            cy.wrap(deleteButton).click();
        });
        cy.get('#ws-dialog-submit').click();

        // Select and remove the lower-case test workspace.
        cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 5000}).should('be.visible').then(() => {
            changeDropdownUtils.changeWorkspace('createworkspacetest');
        });
        changeDropdownUtils.changeWorkspace('Edit current workspace...');

        // Cancel a delete on the workspace.
        cy.get('#ed-edit-delete', {timeout: 5000}).should('be.visible').then((deleteButton) => {
            cy.wrap(deleteButton).click();
        });
        cy.get('#ws-dialog-cancel').click();

        // Delete the workspace.
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