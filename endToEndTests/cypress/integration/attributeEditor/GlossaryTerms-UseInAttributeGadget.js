const loginUtils = require('../../utils/loginUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');
const AEUtils = require('../../utils/attributeEditorUtils');

describe('Use Glossary Terms in Attribute Gadget', function () {
    it('Adds Glossary Term to an attribute', function () {

        // Login to AMI.
        loginUtils.loginToAMI('cypress1');

        // Open 'QA Attribute Gadget' workspace.
        changeDropdownUtils.changeWorkspace('QA Attribute Gadget');
        anyGadgetUtils.openGadgetOrGroup("Don't show prefixes in object names");

        // Open the Events.
        browserGadgetUtils.setStructureType('Events');

        // Select an events structure in browse gadget (named 'Don't show prefixes in object names').
        browserGadgetUtils.setBrowseContext('Automated Test Group - DO NOT EDIT');

        // Open the Attribute gadget
        anyGadgetUtils.openGadgetOrGroup("Attributes");

        // Open a text attribute editor.
        cy.get('p:contains("SMW Text Within Structure")').click();

        // Edit the text input pane using the glossary term shortcut 'ctrl+shift+a'.
        AEUtils.enterText('{ctrl}{shift}a');

        AEUtils.checkText('<blah>Less than < greater than ><fnord>1a');

        // Avoid making any DB changes.
        cy.get('#ws-editor-cancel').click();

        loginUtils.logoutFromAMI();
    });
});