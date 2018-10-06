const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');

/*
Test outline
Open workspace with Relations and Brand Relations gadgets (QA Relations)
Open Relations gadget
Click menu - should show Select and Show (each suffixed with "Suffic Attribute" - click Select
Select an attribute | OK
Click menu - should show Select and Hide - click Hide
Click menu - should have returned to Select and Show
Repeat for brand relations gadget
*/

describe('WAVE-4676 The Product and Brand Relations gadgets have an extra menu item called "Select Suffix Attribute..."', function () {
    it('Test to make sure options appear and they function correctly', function () {
        
        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('QA Relations');

        anyGadgetUtils.openGadgetOrGroup('Relations');

        // Click menu - should show Select and Show (each suffixed with "Suffix Attribute" - click Select
        cy.get('#Relation-menu-icon').click();
        cy.get('#Relation-menu').
            should('contain', 'Select Suffix Attribute...').
            should('contain', 'Show Suffix Attribute');
        cy.get('#Relation-menu-labelSelectSafetySuffixAttribute').click();
        
        // Select an attribute and OK
        cy.get('#ws-dialog-page-content li:nth-child(10) input').check();
        cy.get('#ws-dialog-submit').click();

        cy.get('#Relation-menu-icon').click();
        
        /* Before
        cy.get('#Relation-menu').should('contain', 'Hide Suffix Attribute');
        cy.get('#Relation-menu').find('span').contains('Hide Suffix Attribute').
        cy.get('#Relation-menu').click();
        */

        // Click menu, check if Show has changed to Hide and click Hide
        cy.get('#Relation-menu').
            should('contain', 'Hide Suffix Attribute').
            find('span').
            contains('Hide Suffix Attribute').
            click();

        // Click menu, check if Hide has changed back to Show and minimise menu by clicking body
        cy.get('#Relation-menu-icon').click();
        cy.get('#Relation-menu').should('contain', 'Show Suffix Attribute');
        cy.get('body').click();


        // As per above but Relation-menu changed to Vendor-menu
        anyGadgetUtils.openGadgetOrGroup('Brand Relations');
        cy.get('#Vendor-menu-icon').click();
        cy.get('#Vendor-menu').
            should('contain', 'Select Suffix Attribute...').
            should('contain', 'Show Suffix Attribute');
        cy.get('#Vendor-menu-labelSelectSafetySuffixAttribute').click();
        cy.get('#select-attribute-dialog li:nth-child(10) input').check();
        cy.get('#ws-dialog-submit').click();
        cy.get('#Vendor-menu-icon').click();
        cy.get('#Vendor-menu').
            should('contain', 'Hide Suffix Attribute').
            find('span').
            contains('Hide Suffix Attribute').
            click();
        cy.get('#Vendor-menu-icon').click();
        cy.get('#Vendor-menu').should('contain', 'Show Suffix Attribute');
        cy.get('body').click();

        // Log out from AMI
        loginUtils.logoutFromAMI();

    });
});
