const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');
const structureFilter = require('../../utils/structureFilter');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');

const newFolderName = 'New favourites folder';

describe.skip('WAVE-4935: Favourites gadget needs to respect the structure filter', function () {

    it('Checks that the Favourites gadget obeys the structure filter', function () {
        // Log in as 'cypress1'.
        loginUtils.loginToAMI('cypress1');

        // Open a workspace that has a Favourites gadget.
        changeDropdownUtils.changeWorkspace('QA Favourites Gadget');

        // Make sure the structure filter is off.
        structureFilter.deactivate();

        // Set structure filter 'my text attribute' value to 'HELLO'.
        structureFilter.setFilterValue('my text attribute', 'HELLO');

        // Open the Browse and Favourites gadget.
        anyGadgetUtils.openGadgetOrGroup('Browse');
        anyGadgetUtils.openGadgetOrGroup('Favourites');

        // Open the 'Events' structure.
        browserGadgetUtils.setStructureType('Events');

        // Open the test context 'Automated Test Group - DO NOT EDIT/FavouritesTesting'.
        browserGadgetUtils.setBrowseContext('Automated Test Group - DO NOT EDIT/FavouritesTesting');

        // Create a new folder 'Favs 1'.
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-FavouritesGadget', 'Add Folder...');
        cy.get('#favnew-folder-name').type(newFolderName);
        cy.get('#ws-dialog-submit').click();

        cy.get(`a:contains(${newFolderName})`).should('be.visible');

        // Add the two objects.
        cy.get('#cb_22117-22134 > .mdi-star-outline').click();
        cy.get('#cb_22117-22136 > .mdi-star-outline').click();

        // Check that you can see the objects in the Favourites gadget.
        cy.get('#FavouritesGadget').within(() => {
            cy.contains('Objects To Move Destination').should('be.visible');
            cy.contains('Object Pastebin').should('be.visible');
        });

        // Switch on the structure filter.
        structureFilter.activate();

        // Check that you can now see the first favourite but not the second.
        cy.contains('Objects To Move Destination').should('be.visible');
        cy.contains('Object Pastebin').should('not.be.visible');

        // Get rid of the new Favourites folder.
        cy.contains(newFolderName).prev('div.sb-controls').find('input[type=checkbox]').click();
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-FavouritesGadget', 'Remove Folders');
        cy.get('#ws-dialog-submit').click();

        loginUtils.logoutFromAMI();
    });

});
