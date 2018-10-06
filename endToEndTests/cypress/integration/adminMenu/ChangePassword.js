const loginUtils = require('../../utils/loginUtils');

const changeDropdownUtils = require('../../utils/changeDropdownUtils');

describe('Change User Password', function () {
    it('Can Change Password', function () {
        // Login to AMI.
        const password = 'qcteam';
        const newPassword = 'qcteam1';

        loginUtils.loginToAMI('chpass');

        const testChangePassword = (password, newPassword) => {
            changeDropdownUtils.selectUserOption("Change password");

            cy.get('input[name="password"]').clear().type(password);
            cy.get('input[name="new-password"]').clear().type(newPassword);
            cy.get('input[name="confirm-password"]').clear().type(newPassword);

            cy.get('button:contains("Change password")').click();

            cy.get('.message').should(($message) => {
                expect($message.first()).to.contain('Password updated successfully');
            });

            return cy.get('button:contains("OK")').click();
        };

        testChangePassword(password, newPassword).then(() => {
            // Change It Back
            testChangePassword(newPassword, password);
        });

        loginUtils.logoutFromAMI();
    });
});