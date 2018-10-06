const loginUtils = require('../../utils/loginUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');

describe('Use Agility Styles In Tables', function () {
    it('Adds a paragraph style in the table editor, then a character style', function () {

        // Login to AMI.
        loginUtils.loginToAMI('cypress1');

        // Open 'QA Attribute Gadget' workspace.
        changeDropdownUtils.changeWorkspace('QA Attribute Gadget');
        anyGadgetUtils.openGadgetOrGroup("Don't show prefixes in object names");

        // Open the Events.
        browserGadgetUtils.setStructureType('Events');

        // Select an events structure in browse gadget (named 'Don't show prefixes in object names').
        browserGadgetUtils.setBrowseContext('Automated Test Group - DO NOT EDIT/DOOR FURNITURE');

        // Open the Attribute gadget
        anyGadgetUtils.openGadgetOrGroup("Attributes");

        // Open a table attribute editor.
        cy.get('p:contains("_Product Table")').click();

        // Open a cell editor within the table.
        cy.get('#cell_2_3').click();

        // Apply a paragraph style (displays as green and underlined).
        cy.get('#para-style-select').select('JLD Header 1');

        // Get text styling.
        cy.get('#ws-text-editor', { timeout: 20000 }).then((iframe) => {
            const myInput = iframe.contents().find('.ws-editable-content');
            cy.wrap(myInput).should('have.attr', 'style', 'font-weight:bold;text-decoration:underline;font-size:200%;color:#00ff00;');
        });

        // Apply a character style.
        cy.get('#char-style-select').select('Bold (Ctrl+Shift+Z)');

        // Get text styling.
        cy.get('#ws-text-editor', { timeout: 20000 }).then((iframe) => {
            const myInput = iframe.contents().find('.ws-editable-content span.acms-styles');
            cy.wrap(myInput).should('have.attr', 'style', 'font-weight:bold;');

            // Avoid making any DB changes.
            cy.get('#ws-editor-2-cancel').click();

            loginUtils.logoutFromAMI();
        });
    });
});
