/* eslint-disable no-unused-expressions */
const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');

describe('WAVE‌-4751 Edit relations: Add multi relations to an object ', function () {

    it('Creates and removes a single relation', function () {
        loginUtils.loginToAMI('cypress2');
        changeDropdownUtils.changeWorkspace('QA Attribute Gadget');
        anyGadgetUtils.openGadgetOrGroup("Don't show prefixes in object names");
        anyGadgetUtils.openGadgetOrGroup('Relations');

        browserGadgetUtils.setStructureType('Events');
        browserGadgetUtils.setBrowseContext('pwtest/ALTRO RANGE - STAINLESS STEEL');
        cy.wait(1000);
       
        //open the first single instance relation in the edit relations list
        cy.get('#RelationGadget .singleInstanceRelation').first().click();
        cy.get('#erd-object-id').type('1362'); //enter object id number
        cy.get('#erd-btn-add').click();
        cy.get('#ws-dialog-submit').click(); //add instance relation
        cy.wait(1000);
        cy.get('#RelationGadget .singleInstanceRelation').first().click();
        cy.get('#erd-btn-remove').click(); //remove the relation
        cy.get('#ws-dialog-submit').click();
        
        loginUtils.logoutFromAMI();
    });

    it('Creates and removes a multi relation', function () {
        // Log in as 'cypress2'.
        loginUtils.loginToAMI('cypress2');
        // Open the attribute workspace
        changeDropdownUtils.changeWorkspace('QA Attribute Gadget');
        // Open the browse and Relations gadget
        anyGadgetUtils.openGadgetOrGroup("Don't show prefixes in object names");
        anyGadgetUtils.openGadgetOrGroup('Relations');

        browserGadgetUtils.setStructureType('Events');
        browserGadgetUtils.setBrowseContext('pwtest/ALTRO RANGE - STAINLESS STEEL');
        cy.wait(1000);

        cy.get('#RelationGadget .multiInstanceRelation', {timeout: 2000}).first().click();
        cy.get('#erd-object-id').type('1361,1362');
        cy.get('#erd-btn-add').click();
        cy.wait(1000);
        cy.get('#erd-cb-select-all').check(); //select all of the added objects
        cy.get('#erd-object-id').clear().type('18265');
        cy.get('#erd-btn-replace').click(); //replace the existing asset relations
        cy.wait(1000);
        cy.get('.erd-cb').click();
        cy.get('#erd-btn-remove').click(); //remove the relation
        cy.get('#ws-dialog-cancel').click();

        loginUtils.logoutFromAMI();
    });
});