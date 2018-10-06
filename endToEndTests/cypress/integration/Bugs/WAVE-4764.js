const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');

/*
STR
Log in as cypress1
Open workspace with a To Do List and edit workspace
Uncheck object workflow status checkbox
Save workspace
Confirm Object Workflow status and associated label not showing (first table td element empty)
Go back in to edit workspace and tick box again to return test to initial state
*/

describe('WAVE-4764 Allow hiding of To Do List gadgets checkboxes', function () {
    it('Test to make sure To Do gadget Display checkboxes work', function () {
        // Log in as cypress1
        loginUtils.loginToAMI('cypress1');

        // Open workspace with a QA To Do Gadget
        changeDropdownUtils.changeWorkspace('QA To Do Gadget');

        // Click workspace dropdown
        cy.get('#ACMS-Workspace-Selector-dropdown').click();

        // Edit current workspace
        cy.get('.menu-opt-edit').click();

        //open To Do List gadget in workspace editor
        anyGadgetUtils.workspaceEditorExpandGadgetOrGroup('To Do List');

        // Uncheck Object Workflow status checkbox (first checkbox)
        cy.get('.gadget-design-view input:checkbox').first().uncheck();

        // OK to Save workspace
        cy.get('#ed-edit-ok').click();

        //open To Do List gadget
        anyGadgetUtils.openGadgetOrGroup('To Do List');

        //first todo-table cell is empty 
        cy.get('#todo-table td:first').should('be.empty');

        
        //Return to previous state
        
        // Click workspace dropdown
        cy.get('#ACMS-Workspace-Selector-dropdown').click();

        // Edit current workspace
        cy.get('.menu-opt-edit').click();

        //open To Do List gadget in edit mode
        anyGadgetUtils.workspaceEditorExpandGadgetOrGroup('To Do List');

        // Check Object Workflow status checkbox (first checkbox)
        cy.get('.gadget-design-view input:checkbox').first().check();

        // OK to Save workspace
        cy.get('#ed-edit-ok').click();

        // OK to Time delay to allow for workspace to be saved before loggin out
        cy.wait(2000);  
       
        // Log out from AMI
        loginUtils.logoutFromAMI();
    });
});
