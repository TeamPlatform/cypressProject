const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const structureFilter = require('../../utils/structureFilter');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');

describe('WAVE-4650: Advanced Editor is enabled in Datasheet gadget even if no cell selected', function () {

    it('Checks the Datasheet gadget menu', function () {
        // Log in as 'cypress1'.
        loginUtils.loginToAMI('cypress1');

        // Open a workspace that has a Browser gadget and a Datasheet gadget.
        changeDropdownUtils.changeWorkspace('QA Datasheet Gadget');

        // Make sure the structure filter is off.
        structureFilter.deactivate();
        
        // Find the Datasheet Gadget and open it if necessary.
        anyGadgetUtils.openGadgetOrGroup('Datasheet');

        // Set the gadget to display the current object.
        cy.get('#datasheet-view-select').select('Show Current Object');

        // Find the Browser Gadget and open it if necessary.
        anyGadgetUtils.openGadgetOrGroup('Browse');

        // Open the Events.
        browserGadgetUtils.setStructureType('Events');

        // Open object 'CA Root/CA Obj 2/d1'
        browserGadgetUtils.setBrowseContext('Automated Test Group - DO NOT EDIT');

        // Open the gadget's menu.
        cy.get('#ws-gadget-holder-DatasheetGadget .mdi-menu.ws-hamburger-menu').click();

        // Check that the 'Advanced Editor...' option is disabled.
        cy.contains('Advanced Editor...').parent().should('have.class', 'ui-state-disabled');

        loginUtils.logoutFromAMI();
    });

});
