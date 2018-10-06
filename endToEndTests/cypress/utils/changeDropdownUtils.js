/**
 * Utility function to change the workspace.
 * @param {string} newWorkspace - the name of the workspace to change to.
 */
function changeWorkspace(newWorkspace) {
    _selectOptionFromDropdown('#ACMS-Workspace-Selector-dropdown', newWorkspace);

    // Check we are now in the required workspace.
    cy.get('#ACMS-Workspace-Selector-dropdown', {timeout: 5000}).should('contain', newWorkspace);

    // Close all the gadgets and groups to start with.
    cy.get('body').then(() => {
        Cypress.$('.ws-show-hide-icon.mdi-chevron-up').click();
    });
}

/**
 * Utility function to change the language.
 * @param {string} newLanguage - the name of the language to change to.
 */
function changeLanguage(newLanguage) {
    _selectOptionFromDropdown('#ACMS-Language-Selector-dropdown', newLanguage);
}

/**
 * Utility function to change the price list.
 * @param {string} newPriceList - the name of the price list to change to.
 */
function changePriceList(newPriceList) {
    _selectOptionFromDropdown('#ACMS-PriceList-Selector-dropdown', newPriceList);
}

/**
 * Utility function to select options in the workspace user menu.
 * Note: The strings in this dropdown actually have a preceding ' '; however, this will be added automatically, so the parameter 'option' should not have one.
 * @param {string} option - the text value of the option to select.
 */
function selectUserOption(option) {
    _selectOptionFromDropdown('#user-menu', ' ' + option);
}

/**
 * function to select dropdown list and set a item
 * @param {string} dropDown - passed dropdown list name
 * @param {string} item - the item in the dropdown list to select
 */
function _selectOptionFromDropdown(dropDown, item) {
    // Allow 30 seconds in case we've just logged in.
    cy.get(dropDown, {timeout: 30000}).within((selector) => {
        if (selector.text() !== item) {
            // Click to expand the dropDown
            selector.click();

            cy.get('a').then((list) => {
                for (var i = 0; i < list.length; i++) {
                    if (list[i].text === item) {
                        cy.log("Clicking " + item);
                        list[i].click();
                        break;
                    }
                }
            });
        }
    });
}

module.exports = {
    changeWorkspace: changeWorkspace,
    changeLanguage: changeLanguage,
    changePriceList: changePriceList,
    selectUserOption: selectUserOption, 
    selectOptionFromDropdown: _selectOptionFromDropdown
};
