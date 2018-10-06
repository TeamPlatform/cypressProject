const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');
const loginUtils = require('../../utils/loginUtils');

const styleName1 = 'TestStyleNoMenu';
const styleName2 = 'TestStyleInMenu';

describe('Testing the Agility Styles menu item', function () {
    beforeEach(() => {
        loginUtils.loginToAMI('cypress1');
    });

    afterEach(() => {
        loginUtils.logoutFromAMI();
    });

    it('Creates an Agility Style not shown in the editor menu', function () {
        // Open configuration options.
        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Agility Styles tool.
        configOptionsUtils.selectTool('Agility Styles');

        // Open 'Create Agility Styles'
        configOptionsUtils.selectToolMenuItem('Create Agility Style...');

        // Input style name and submit the form.
        cy.get('#ab-editor-name').type(styleName1);
        cy.get('#ab-agility-styles-editor-style-type').select('Paragraph');

        // Submit the form.
        cy.get('#ws-dialog-submit').click();
    });

    it('Creates an Agility Style shown in the editor menu', function () {
        // Open configuration options.
        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Agility Styles tool.
        configOptionsUtils.selectTool('Agility Styles');

        // Open 'Create Agility Styles'
        configOptionsUtils.selectToolMenuItem('Create Agility Style...');

        // Input style name and submit the form.
        cy.get('#ab-editor-name').type(styleName2);
        cy.get('#ab-agility-styles-editor-style-type').select('Paragraph');

        // Tick the "Menu Item" box.
        cy.get('#ab-agility-styles-editor-menu-item').click();

        // Submit the form.
        cy.get('#ws-dialog-submit').click();
    });

    it('Checks if expected styles are shown in the dropdown in an editor', function () {
        changeDropdownUtils.changeWorkspace('QA Attribute Gadget');

        // Open the browse gadget.
        anyGadgetUtils.openGadgetOrGroup("Don't show prefixes in object names");

        // Open the Events.
        browserGadgetUtils.setStructureType('Events');

        // Select an events structure in browse gadget (named 'Don't show prefixes in object names').
        browserGadgetUtils.setBrowseContext('Automated Test Group - DO NOT EDIT/DOOR FURNITURE');

        // Open the Attribute gadget
        anyGadgetUtils.openGadgetOrGroup("Attributes");

        // Open a table attribute editor.
        cy.get('p:contains("0 Text 3")').click();

        // Open the paragraph styles drop down.
        cy.get('#para-style-select > option').then((options) => {
            const visibleText = options.map((index, option) => Cypress.$(option).text()).sort().toArray();
            expect(visibleText).to.include('TestStyleInMenu');
            expect(visibleText).to.not.include('TestStyleNoMenu');

            cy.get('#ws-editor-cancel').click();

            changeDropdownUtils.changeWorkspace('Configuration Options');

            // Open the Agility Styles tool.
            configOptionsUtils.selectTool('Agility Styles');

            // Delete the style we've just created.
            cy.get('a:contains("' + styleName1 + '")').parent('li').within(() => {
                cy.get('div > input').click();
            });
            cy.get('a:contains("' + styleName2 + '")').parent('li').within(() => {
                cy.get('div > input').click();
            });

            // Select 'Delete Agility Style...'
            configOptionsUtils.selectToolMenuItem('Delete Agility Style...');
            cy.get('#ws-dialog-submit').click();
        });
    });
});
