const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');

describe('Relation Gadgets - Editing Relations Should Check User Permissions (Wave-4775)', function () {

    beforeEach(() => {
        loginUtils.loginToAMI('cypress1');
        changeDropdownUtils.changeWorkspace('QA Relations With Browse');
        anyGadgetUtils.openGadgetOrGroup('Browse');
        browserGadgetUtils.setStructureType('Categories');
        browserGadgetUtils.setBrowseContext('Cypress', false);
        anyGadgetUtils.openGadgetOrGroup('Assets');        
        cy.get('#ws-asset-show-select').select('All Relations');
    });

    afterEach(() => {
        loginUtils.logoutFromAMI('');
    });
    
    const thisGadget = () => cy.get('#ws-gadget-holder-AssetGadget');

    /*
        This only happens if the context is changed.
    */
    const assertThatTheGadgetBlockerComesAndGoes = () => {
        thisGadget().find('.ws-gadget-blocker').should('be.visible',     "The blocker should briefly appear when context is loading");
        thisGadget().find('.ws-gadget-blocker').should('not.be.visible', "The blocker should then disappear when context is loaded");
    };

    const clickRelation = (relationName, expectedClass = '') => {
        thisGadget().find(`div.ws-asset-container_thumbnail${expectedClass}`).
            contains(relationName).
            should('be.visible').
            then((div) => {
                cy.wrap(div).invoke('width').should('be.greaterThan', 0);
                cy.wrap(div).click({force: true});
            });
    };

    const getRelationCheckBox = (relationName) => thisGadget().
        find('p').
        exactText(relationName).
        closest('div').
        find('input[type="checkbox"]');

    const testThatTheEditRelationDialogOpens = () => {
        cy.get('#ws-dialog-container_edit-relation-dialog').should('be.visible');
        cy.wait(100); // Until WAVE-5225 is fixed, allow the dialog some time to render before we click cancel
        cy.get('#ws-dialog-container_edit-relation-dialog').find('#ws-dialog-cancel').should('be.visible').click();
        cy.get('#ws-dialog-container_edit-relation-dialog').should('not.be.visible');
    };

    it(`Can edit an asset relation when we have the correct permission `, function () {
        browserGadgetUtils.setBrowseContext('Cypress/Edit', false, assertThatTheGadgetBlockerComesAndGoes);

        clickRelation('cypressRelationAssetNoAdd', '.editable');

        // The Edit Dialog Opens
        testThatTheEditRelationDialogOpens('cypressRelationAsset');

        // Select An Item        
        getRelationCheckBox('cypressRelationAssetNoAdd').check().should('be.checked');

        // It Can UnLink
        thisGadget().getGadgetHamburgerMenuItem('Unlink').closest('li').should('not.have.class', 'ui-state-disabled').click();
        // But we cancel
        cy.get('#ws-dialog-container_confirm-dialog').find('#ws-dialog-cancel').should('be.visible').click();
        thisGadget().get('span.ws-context-menu-title').should('not.be.visible');

        // It Can Copy        
        thisGadget().getGadgetHamburgerMenuItem('Copy').click();
        // Copying should close the menu
        thisGadget().get('span.ws-context-menu-title').should('not.be.visible');
        getRelationCheckBox('cypressRelationAssetNoAdd').should('not.be.checked');

        // Once we have copied something then Paste should be enabled
        thisGadget().getGadgetHamburgerMenuItem('Paste').closest('li').should('not.have.class', 'ui-state-disabled').click();
        // But We Cancel The Paste Dialog
        cy.get('#ws-dialog-container_paste-asset-dlg').find('#ws-dialog-cancel').should('be.visible').click();
    });

    it(`Can't edit an asset relation when we don't have the edit permission.`, function () {
        browserGadgetUtils.setBrowseContext('Cypress/NoEdit', false, assertThatTheGadgetBlockerComesAndGoes);

        clickRelation('cypressRelationAssetNoAdd', '.edit-disabled');
        // The Edit Dialog Should NOT Open
        cy.get('#ws-dialog-container_edit-relation-dialog').should('not.be.visible');

        // Select An Item        
        getRelationCheckBox('cypressRelationAssetNoAdd').check().should('be.checked');

        // It Can't UnLink
        thisGadget().getGadgetHamburgerMenuItem('Unlink').closest('li').should('have.class', 'ui-state-disabled').click({force: true});
        cy.get('#ws-dialog-container_confirm-dialog').should('not.be.visible');

        // It Can Copy        
        thisGadget().getGadgetHamburgerMenuItem('Copy').click();
        // Copying should close the menu
        thisGadget().get('span.ws-context-menu-title').should('not.be.visible');
        getRelationCheckBox('cypressRelationAssetNoAdd').should('not.be.checked');

        // But It Can't Paste
        thisGadget().getGadgetHamburgerMenuItem('Paste').closest('li').should('have.class', 'ui-state-disabled').click({force: true});
        cy.get('#ws-dialog-container_paste-asset-dlg').should('not.be.visible');
    });
});