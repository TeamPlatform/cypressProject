const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');
const createPriceList = 'Create Price List...';
const loginUtils = require('../../utils/loginUtils');

describe('Create, edit, and delete Price Lists', function () {

    it('Creates and deletes valid price lists', function () {
        const createPriceListName = '0 CreatePriceListsTest';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Price Lists tool.
        configOptionsUtils.selectTool('Price Lists');

        // Open 'Create Price Lists Definition...'
        configOptionsUtils.selectToolMenuItem(createPriceList);

        // Check that an empty name field disables the submit.
        cy.get('#ws-dialog-submit').should('be.disabled');

        // Input price list name and submit the form.
        cy.get('#ab-editor-name').type(createPriceListName);
        cy.get('#ws-dialog-submit').click();

        // Open 'Create Price Lists'
        configOptionsUtils.selectToolMenuItem(createPriceList);

        // Input duplicate price list name and submit the form.
        cy.get('#ab-editor-name').type(createPriceListName);
        cy.get('#ws-dialog-submit').click();

        cy.get('.error-message').then((errorText) => {
            expect(Cypress.$(errorText).text()).to.equal("Price Lists must have a unique name.");
            cy.get('#ws-dialog-2-submit').click();
            cy.get('#ws-dialog-cancel').click();
        });

        // Open the Price List to edit.
        cy.get('#conf-gadget-content').within(() => {
            cy.get('a:contains("' + createPriceListName + '")').click();
        });
        
        cy.get('#ab-editor-name').should('be.visible');
        cy.get('#ws-dialog-cancel').click();

        // Delete the test Price List.
        cy.get('a:contains("' + createPriceListName + '")').parent('li').within(() => {
            cy.get('div > input').click();
        });
        configOptionsUtils.selectToolMenuItem('Delete Price List...');
        cy.get('#ws-dialog-submit').click();

        loginUtils.logoutFromAMI();
    });

    it('Tests inputs of price lists', function () {
        const inputPriceListName = '0 PriceListsInputsTest';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Price Lists tool.
        configOptionsUtils.selectTool('Price Lists');

        // Open 'Create Price Lists Definition...'
        configOptionsUtils.selectToolMenuItem(createPriceList);

        // Input price list name.
        cy.get('#ab-editor-name').type(inputPriceListName);

        // Input Decimal separator.
        cy.get('#ab-pl-decimal-sep').clear().type('.');

        // Input Thousand separator.
        cy.get('#ab-pl-thousand-sep').clear().type(',');

        // Input Decimal places value.
        cy.get('#ab-pl-decimal-places').clear().type('2');

        // Input Prefix value.
        cy.get('#ab-pl-currency-prefix').clear().type('PrefixTest');

        // Input Suffix value.
        cy.get('#ab-pl-currency-suffix').clear().type('SuffixTest');
        cy.get('#ws-dialog-submit').click();

        // Logout.
        loginUtils.logoutFromAMI();
    });

    // On hold for CONTENT-3895.
    it.skip('Tests access right settings are applied', function () {
        const accessRightsPriceListName = '0 PriceListsAccessRightsTest';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Price Lists tool.
        configOptionsUtils.selectTool('Price Lists');

        // Open 'Create Price Lists Definition...'
        configOptionsUtils.selectToolMenuItem(createPriceList);

        // Input price list name.
        cy.get('#ab-editor-name').clear().type(accessRightsPriceListName);
        cy.get('#ws-dialog-submit').click();

        // Open the Price List to edit.
        cy.get('#conf-gadget-content').within(() => {
            cy.get('a:contains("' + accessRightsPriceListName + '")').click();
        });

        // Open access rights.
        cy.get('#ab-pl-access-rights').click();

        // Navigate to current users access rights.
        cy.get('#arrow-attrDefnAccessRightsDlg2-3').click();
        cy.get('#ode-cb-E-2-3-39013').should('be.enabled').click();
        cy.get('#ws-dialog-2-submit').click();
        cy.get('#ws-dialog-submit').click();

        // Logout and login again.
        loginUtils.logoutFromAMI();
        loginUtils.loginToAMI('cypress1');

        // Open the Price Lists tool.
        cy.get('#conf-priceLists').click();

        // Open the Price List to edit.
        cy.get('#conf-gadget-content').within(() => {
            cy.get('a:contains("' + accessRightsPriceListName + '")').click();
        });

        // Input price list name.
        cy.get('#ab-editor-name').clear().type(`${accessRightsPriceListName} 1`);
        cy.get('#ws-dialog-submit').click();

        // Check for error as editing is disabled.
        cy.get('.error-message');
        cy.get('#ws-dialog-cancel').click();

        // Delete the test Price List.
        cy.get('a:contains("' + accessRightsPriceListName + '")').parent('li').within(() => {
            cy.get('div > input').click();
        });
        configOptionsUtils.selectToolMenuItem('Delete Price List...');
        cy.get('#ws-dialog-submit').click();

        // Log out.
        loginUtils.logoutFromAMI();
    });

    it('Checks new price list is available in dropdown', function () {
        const dropdownPriceListName = '0 DropdownAccessRightsTest';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Price Lists tool.
        configOptionsUtils.selectTool('Price Lists');

        // Open 'Create Price Lists Definition...'
        configOptionsUtils.selectToolMenuItem(createPriceList);

        // Input price list name.
        cy.get('#ab-editor-name').clear().type(dropdownPriceListName);
        cy.get('#ws-dialog-submit').click();

        //logout then in again to refresh the price list dropdown.
        loginUtils.logoutFromAMI();
        loginUtils.loginToAMI('cypress1');

        // Open the Price Lists tool.
        cy.get('#conf-priceLists').click();

        // Select the new pricelist.
        changeDropdownUtils.changePriceList(dropdownPriceListName);

        // Delete the test Price List.
        cy.get('a:contains("' + dropdownPriceListName + '")').parent('li').within(() => {
            cy.get('div > input').click();
        });
        configOptionsUtils.selectToolMenuItem('Delete Price List...');
        cy.get('#ws-dialog-submit').click();

        // Logout.
        loginUtils.logoutFromAMI();
    });
});