/* eslint-disable no-unused-expressions */
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');

describe('Language Definition: Find and open the language definition', function () {

    it('Finds the language definitions', function () {
        loginUtils.loginToAMI('cypress2');
        changeDropdownUtils.changeWorkspace('Configuration Options');
        configOptionsUtils.selectTool('Language Definitions');

        // Check that we are in the Language Definition
        cy.get('#conf-gadget-title').should('have.text', 'Language Definitions');

        // Check that lang id 10 exists and the checkbox for it is unselected
        cy.get('#ab-lang-def-checkbox-10').should('not.be.checked');
        cy.get('#ab-lang-def-checkbox-10').check();

        //Get the create new job button and click it
        cy.get('#conf-gadget-menu .ws-hamburger-menu').click();

        //delete menu item should always be disabled 
        cy.get('#conf-atr-def-title-Delete-Language-Definition---').should('have.class', 'ui-state-disabled');

        //expect the create and edit menu items to be available 
        cy.get('#conf-atr-def-title-Create-Language-Definition---').should('not.be.disabled');
        cy.get('#conf-atr-def-title-Edit-Language-Definition---').should('not.be.disabled');

        //open the edit menu
        cy.get('#conf-atr-def-title-Edit-Language-Definition---').click();

        //don't want to mess too much with languages - so just cancel and exit
        cy.get('#ws-dialog-cancel').then(($cancel) => {
            $cancel.click();
        });

        loginUtils.logoutFromAMI();
    });
});