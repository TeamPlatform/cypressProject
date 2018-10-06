const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');
const loginUtils = require('../../utils/loginUtils');

describe.skip("WAVE-5071: User Groups tool doesn't refresh when you add or delete user groups", function () {
    const randomName = `g${Math.random()}`;

    it('Creates and then deletes a user group', function () {
        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the User Groups tool.
        cy.get('#conf-UserGroupGadget').click();

        configOptionsUtils.selectToolMenuItem('Add Root User Group...');

        cy.get('#aug-name').type(randomName);
        cy.get('#ws-dialog-submit').click();

        // Check that the new group is visible.
        cy.contains(randomName).should('be.visible');

        // Select the new group.
        cy.contains(randomName, {timeout: 10000}).click();

        configOptionsUtils.selectToolMenuItem('Delete User Group');
        cy.get('#ws-dialog-submit').click();

        // Check that the new group is no longer visible.
        cy.contains(randomName).should('not.be.visible');

        loginUtils.logoutFromAMI();
    });
});
