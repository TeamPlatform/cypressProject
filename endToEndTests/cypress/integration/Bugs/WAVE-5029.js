const loginUtils = require('../../utils/loginUtils');
const structureFilter = require('../../utils/structureFilter');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');

describe('WAVE-5029: Datasheet gadget show current view is showing empty.', function () {
    it('Checks the Datasheet gadget view', function () {
        // Log in as 'cypress1'.
        loginUtils.loginToAMI('cypress1');

        // Open a workspace that has a Browser gadget and a Datasheet gadget.
        changeDropdownUtils.changeWorkspace('QA Datasheet Gadget');

        // Set to 'English'
        changeDropdownUtils.changeLanguage('English');

        // Set to 'Default Price List'
        changeDropdownUtils.changePriceList('QA Price list');

        // Make sure the structure filter is off.
        structureFilter.deactivate();
        
        // Find the Datasheet Gadget and open it if necessary.
        anyGadgetUtils.openGadgetOrGroup('Datasheet');

        // Set the gadget to display children.
        cy.get('#datasheet-view-select').select('Show Current Object');

        // Open the 'Browse' gadget.
        anyGadgetUtils.openGadgetOrGroup("Browse");

        // Open the Events.
        browserGadgetUtils.setStructureType('Events');

        // Open object 'Automated Test Group - DO NOT EDIT'
        browserGadgetUtils.setBrowseContext('Automated Test Group - DO NOT EDIT');

        // Check we are now in the datasheet.
        cy.get('#datasheet-table', {timeout: 5000}).should('be.visible');

        // Logout
        loginUtils.logoutFromAMI();
    });
});
