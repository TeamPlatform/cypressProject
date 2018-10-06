// Utility functions for the Configuration Options workspace gadget functionality.

/**
 * Open and select a Configuration Options tool.
 * @param {string} toolName - The label of the Configuration Options tool to open.
 */
function selectTool(toolName) {
    let toolId;

    switch (toolName) {
        case 'Agility Styles': toolId = '#conf-agilityStyles'; break;
        case 'Attribute Definitions': toolId = '#conf-AttributeDefinitionGadget'; break;
        case 'Channels': toolId = '#conf-channels'; break;
        case 'Glossary Terms': toolId = '#conf-glossaryTerms'; break;
        case 'Identity Servers': toolId = '#conf-identityServers'; break;
        case 'Language Definitions': toolId = '#conf-languageDefinition'; break;
        case 'Object Types': toolId = '#conf-ObjectDefinitionGadget'; break;
        case 'PDF Styles': toolId = '#conf-pdfStyles'; break;
        case 'Price Lists': toolId = '#conf-priceLists'; break;
        case 'Price Text Labels': toolId = '#conf-priceTextLabels'; break;
        case 'Price Types': toolId = '#conf-priceTypes'; break;
        case 'Search Servers': toolId = '#conf-searchServers'; break;
        case 'System Preferences': toolId = '#conf-SystemPreferencesGadget'; break;
        case 'Users': toolId = '#conf-UserGadget'; break;
        case 'User Groups': toolId = '#conf-UserGroupGadget'; break;
        default: break;
    }
    cy.get(toolId, {timeout: 10000}).click();
}

/**
 * Select a tool menu option in the configuration options workspace
 * @param {string} optionName - The option to be selected.
 */
function selectToolMenuItem(optionName) {
    cy.get('#conf-gadget-content span.ws-hamburger-menu').click().then(() => {
        cy.get('span.ws-context-menu-title:contains("' + optionName + '")').closest('li').click();
    });
}

module.exports = {
    selectTool: selectTool,
    selectToolMenuItem: selectToolMenuItem
};
