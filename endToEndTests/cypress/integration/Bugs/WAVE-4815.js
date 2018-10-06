const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');

/*
STR
Log in as cypress1
Open workspace with Search gadget (QA Asset)
Open search gadget
Examine second attribute dropdown (id: srch-op-select)
Test if there are options for "starts with", "equals" and "not equals"
Log out
*/

describe('WAVE-4815 Search options "starts with", "equals" and "not equal to" have been added for choice list attributes in the Search Gadget', function () {
    it('Test to make sure "starts with", "equals" and "not equal to" display in attributes dropdown', function () {
        
        // Log in as cypress1
        loginUtils.loginToAMI('cypress1');

        // Open workspace with Search gadget (QA Asset)
        changeDropdownUtils.changeWorkspace('QA Asset');

        // Open search gadget
        anyGadgetUtils.openGadgetOrGroup('Search');

        //Examine second attribute dropdown (id: srch-op-select)
        //Test if there are options for "starts with", "equals" and "not equals"
        cy.get('#srch-op-select').should('contain', 'starts with');
        cy.get('#srch-op-select').should('contain', 'equals');
        cy.get('#srch-op-select').should('contain', 'not equal to');

        // Log out from AMI
        loginUtils.logoutFromAMI();

    });
});
