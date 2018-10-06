const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');

/*
Workspace steps prior to testing
Locate/create workspace with browse and asset gadgets
Create Cypress event category and create a new object for the wave (4678)
In Assets, all relations select Image Pool and add more than one relation (browse to images, logos, brands to get a few images)
Test is then to ensure that when all of these are selected, deselecting one object changes the all button to intermediate state
*/

describe('WAVE-4678 Add a select all/none checkbox to the Edit Relations dialog', function () {
    it('Test to make sure "All" checkbox changes state to neutral once any item is unselected', function () {
        // Log in as cypress1
        loginUtils.loginToAMI('cypress1');

        // Open QA Asset workspace (this workspace has the required browse and assets gadgets)
        changeDropdownUtils.changeWorkspace('QA Asset');

        // Browse (open up Browse gadget)
        anyGadgetUtils.openGadgetOrGroup('Browse');

        // Events (open up Events structure)
        browserGadgetUtils.setStructureType('Events');

        // Open Events object 'Cypress/WAVE-4678' - this is the object with the relations added 
        browserGadgetUtils.setBrowseContext('Cypress/WAVE-4678');

        //Open Assets group
        anyGadgetUtils.openGadgetOrGroup('Assets');   

        //Click first item with relation to open edit relation dialogue
        cy.get('.tile-view div:first').click();

        //Click all button (id erd-cb-select-all)
        cy.get('#erd-cb-select-all').check();

        //Uncheck second item
        cy.get('#erd-relation-list li:nth-child(2) input').uncheck();

        //Make sure check box has now changed to neutral state (should have propery indeterminate)
        cy.get('#erd-cb-select-all').should('have.prop', 'indeterminate');

        // Log out from AMI
        loginUtils.logoutFromAMI();

    });
});