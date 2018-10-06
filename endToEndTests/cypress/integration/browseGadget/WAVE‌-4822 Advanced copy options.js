/* eslint-disable no-unused-expressions */
const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');
const AEUtils = require('../../utils/attributeEditorUtils');

describe('WAVE‌-4822 Advanced copy options: Link objects', function () {

    it('Copies and pastes duplicate with link option set', function () {

        loginUtils.loginToAMI('cypress2');
        changeDropdownUtils.changeWorkspace('QA Attribute Gadget');
        anyGadgetUtils.openGadgetOrGroup("Don't show prefixes in object names");
        anyGadgetUtils.openGadgetOrGroup("Attributes");

        browserGadgetUtils.setStructureType('Events');
        browserGadgetUtils.setBrowseContext('Cypress/WAVE-4822', false);
        cy.wait(2000);
       
        // Copy the item to the clipboard
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-0', 'Copy');

        // Navigate to the copy to structure
        browserGadgetUtils.setBrowseContext('pwtest');    
        cy.wait(2000);
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-0', 'Paste Duplicate...');  
        cy.wait(1000);
        cy.get('.pastedup-lk-rad:visible').check(); //check the link object radio buttons 
        cy.get('#po-duplicate-copy-local').check(); //check copy local attributes box
        cy.get('#ws-dialog-submit').click(); //submit the dialog 
        cy.wait(2000); //wait for the copy 

        //check that new structure exists in copied to place and that child object has gle attribute values on it
        browserGadgetUtils.setBrowseContext('pwtest/WAVE-4822/Item 1/Subitem 1', false);
        //open attribute editor 
        cy.get('#attr_name_attr-1052 a').click();
        cy.get('#ws-editor-editor-scope-tab-edgespecific').click();
        AEUtils.checkText('Edge value');
        cy.get('#ws-editor-editor-scope-tab-local').click();
        AEUtils.checkText('Local value');
        cy.get('#ws-editor-editor-scope-tab-global').click();
        AEUtils.checkText('Global value');
        cy.get('#ws-editor-cancel').click();

        browserGadgetUtils.setBrowseContext('pwtest/WAVE-4822');
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-0', 'Delete...');

        loginUtils.logoutFromAMI();
    });

    it('Copies and pastes duplicate with duplicate option set', function () {

        loginUtils.loginToAMI('cypress2');
        changeDropdownUtils.changeWorkspace('QA Attribute Gadget');
        anyGadgetUtils.openGadgetOrGroup("Don't show prefixes in object names");
        anyGadgetUtils.openGadgetOrGroup("Attributes");

        browserGadgetUtils.setStructureType('Events');
        browserGadgetUtils.setBrowseContext('Cypress/WAVE-4822');
        cy.wait(2000);
       
        // Copy the item to the clipboard
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-0', 'Copy');

        // Navigate to the copy to structure
        browserGadgetUtils.setBrowseContext('pwtest');    
        cy.wait(2000);
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-0', 'Paste Duplicate...');  
        cy.wait(1000);
        cy.get('.pastedup-dup-rad:visible').check(); //check the duplicate object radio buttons 
        cy.get('#po-duplicate-copy-local').uncheck(); //don't copy local attributes box
        //add in the unique suffix and prefix values
        cy.get('#po-duplicate-prefix').clear().type('pre_');
        cy.get('#po-duplicate-suffix').clear().type('_suf');
        cy.get('#ws-dialog-submit').click(); //submit the dialog 
        cy.wait(2000); //wait for the copy 

        //check that new structure exists in copied to place and that child object only has global attribute values on it
        browserGadgetUtils.setBrowseContext('pwtest/WAVE-4822/Item 1/Subitem 1');
        //open attribute editor - should not have local and edge values copied 
        cy.get('#attr_name_attr-1052 a').click();
        cy.get('#ws-editor-editor-scope-tab-edgespecific').click();
        AEUtils.checkText('');
        cy.get('#ws-editor-editor-scope-tab-local').click();
        AEUtils.checkText('');
        cy.get('#ws-editor-editor-scope-tab-global').click();
        AEUtils.checkText('Global value');
        cy.get('#ws-editor-cancel').click();

        //the unique name object should have prefix and suffix values applied - so this value should exist
        browserGadgetUtils.setBrowseContext('pwtest/WAVE-4822/Item 1/pre_Unique item_suf');
        //the child below it should exist with amended parent path
        browserGadgetUtils.setBrowseContext('pwtest/WAVE-4822/Item 1/pre_Unique item_suf/Sub unique');

        //now remove test data from copy location 
        browserGadgetUtils.setBrowseContext('pwtest/WAVE-4822');
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-0', 'Delete...'); 

        loginUtils.logoutFromAMI();
    });

    it('Copies and pastes duplicate with duplicate/link/none options set', function () {

        loginUtils.loginToAMI('cypress2');
        changeDropdownUtils.changeWorkspace('QA Attribute Gadget');
        anyGadgetUtils.openGadgetOrGroup("Don't show prefixes in object names");
        anyGadgetUtils.openGadgetOrGroup("Attributes");

        browserGadgetUtils.setStructureType('Events');
        browserGadgetUtils.setBrowseContext('Cypress/WAVE-4822');
        cy.wait(2000);
       
        // Copy the item to the clipboard
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-0', 'Copy');

        // Navigate to the copy to structure
        browserGadgetUtils.setBrowseContext('pwtest');    
        cy.wait(2000);
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-0', 'Paste Duplicate...');  
        cy.wait(1000);
        cy.get('#pastedup-obj-row-0 .pastedup-lk-rad').check(); //check the link object radio button for first object
        cy.get('#pastedup-obj-row-1 .pastedup-dup-rad').check(); //check duplicate object radio button for second object
        cy.get('#pastedup-obj-row-2 .pastedup-non-rad').check(); //check none radio button for third object (to ignore)
        cy.get('#po-duplicate-copy-local').uncheck(); //don't copy local attributes box
        //add in the unique suffix and prefix values
        cy.get('#po-duplicate-prefix').clear().type('pre_');
        cy.get('#po-duplicate-suffix').clear().type('_suf');
        cy.get('#ws-dialog-submit').click(); //submit the dialog 
        cy.wait(2000); //wait for the copy 

        //the unique name object should have prefix and suffix values applied - so this value should exist
        browserGadgetUtils.setBrowseContext('pwtest/WAVE-4822/Item 1/pre_Unique item_suf');
        //the child below it should not exist (as ignored) - be good to have a test for this

        //now remove test data from copy location 
        browserGadgetUtils.setBrowseContext('pwtest/WAVE-4822');
        anyGadgetUtils.selectMenuItem('ws-gadget-holder-ContextBrowser-0', 'Delete...'); 

        loginUtils.logoutFromAMI();
    });

});