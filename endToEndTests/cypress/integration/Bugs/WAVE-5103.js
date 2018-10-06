const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');

describe('WAVE-5103: Cannot unlink in a secondary browser', function () {

    it('Pastes links in the secondary gadget then unlinks them', function () {
        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Two Browser Gadgets');

        // Open the Browse and Browse 1 gadget.
        anyGadgetUtils.openGadgetOrGroup('Browse');
        anyGadgetUtils.openGadgetOrGroup('Browse 1');

        // Select 'Lists' category
        browserGadgetUtils.setStructureType('Lists');

        // Open the test context.
        browserGadgetUtils.setBrowseContext('CA List/82028');

        // Set the checkboxes of the objects to copy.
        browserGadgetUtils.setCheckBoxes('82028,277995,29194,29107');

        // Copy to clipboard.
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-0', 'Copy');

        // Set secondary browse gadget category.
        browserGadgetUtils.setStructureType('Categories', true);

        // Set current context in secondary browser.
        browserGadgetUtils.setBrowseContext('CS Test Group', true);

        // Paste as link.
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-01', 'Paste Link...');
        cy.get('#ws-dialog-submit').click();

        // Select the pasted links.
        browserGadgetUtils.setCheckBoxes('82028,277995,29194,29107', true);

        // Unlink the pasted items.
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-01', 'Unlink...');
        cy.get('#ws-dialog-submit').click();
        cy.wait(5000);

        // Logout.
        loginUtils.logoutFromAMI();
    });
});