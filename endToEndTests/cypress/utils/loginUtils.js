const changeDropdownUtils = require('./changeDropdownUtils');

/**
 * Utility function to log into AMI. Assumes the user has the standard password.
 * @param {string} userName - name of the user to login as. If an alternative username is supplied in cypress.env.json, that will be used instead.
 */
function loginToAMI(userName) {
    const alternativeUserName = Cypress.env('userName');

    if (alternativeUserName) {
        userName = alternativeUserName;
    }

    // See if Cypress was launched with an 'indexFile' environment variable set (e.g. by openCypress.ps1). If not, default to using 'index.html'.
    let indexFile = Cypress.env('indexFile') || 'index.html';

    // These make life easier for automated tests on login and logout.
    indexFile += '?silentExit=true&forceLogin=true';

    if (Cypress.env('agilityServer')) {
        indexFile += `&server=${Cypress.env('agilityServer')}`;
    }

    cy.visit(indexFile);

    cy.get('#login-username').should('be.visible').then((login) => {
        cy.wrap(login).clear().type(userName);
    });
    cy.get('#login-password').clear().type(`qcteam{enter}`);

    // Confirm that we can now see the workspace dropdown.
    cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 30000}).should('exist');
}

/**
 * Utility function to log out of AMI.
 */
function logoutFromAMI() {
    changeDropdownUtils.selectUserOption('Log out');
}

module.exports = {
    loginToAMI: loginToAMI,
    logoutFromAMI: logoutFromAMI
};
