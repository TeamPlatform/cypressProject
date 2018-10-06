const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');
const loginUtils = require('../../utils/loginUtils');

describe('Create and delete Channel Definitions', function () {

    it('Creates and deletes valid channel definitions', function () {
        const createChannel = 'Create Channel...';
        const createChannelName = '0 CreateChannelsTest';

        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Channels definition tool.
        configOptionsUtils.selectTool('Channels');

        // Open 'Create Channels Definition...'
        configOptionsUtils.selectToolMenuItem(createChannel);

        // Input channel name and submit the form.
        cy.get('#ab-editor-name').type(createChannelName);
        cy.get('#ws-dialog-submit').click();

        // Open 'Create Channels Definition...'
        configOptionsUtils.selectToolMenuItem(createChannel);

        // Input duplicate channel name and submit the form.
        cy.get('#ab-editor-name').type(createChannelName);
        cy.get('#ws-dialog-submit').click();

        cy.get('.error-message').then((errorText) => {
            expect(Cypress.$(errorText).text()).to.equal("Channels must have a unique name.");
            cy.get('#ws-dialog-2-submit').click();
            cy.get('#ws-dialog-cancel').click();
        });

        // Open the Channel to edit.
        cy.get('a:contains("' + createChannelName + '")').click();
        cy.get('#ab-editor-name').should('be.visible');
        cy.get('#ws-dialog-cancel').click();

        // Delete the test Channel.
        cy.get('a:contains("' + createChannelName + '")').parent('li').within(() => {
            cy.get('div > input').click();
        });
        configOptionsUtils.selectToolMenuItem('Delete Channel...');
        cy.get('#ws-dialog-submit').click();

        loginUtils.logoutFromAMI();
    });
});