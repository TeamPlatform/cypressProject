/* eslint-disable no-unused-expressions */
const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');

describe('WAVE‌-4818: Show current object ', function () {

    it('Shows current object', function () {
        loginUtils.loginToAMI('cypress2');
        changeDropdownUtils.changeWorkspace('QA Datasheet Gadget');
        anyGadgetUtils.openGadgetOrGroup('Browse');
        anyGadgetUtils.openGadgetOrGroup('Datasheet');

        browserGadgetUtils.setStructureType('Events');
        browserGadgetUtils.setBrowseContext('Cypress/WAVE-4822/Item 1');
        cy.wait(1000);

        // set current object option
        cy.get('#datasheet-view-select select').val('4');
        
        
        loginUtils.logoutFromAMI();
    });


});