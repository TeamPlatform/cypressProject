// Utility functions for shared gadget functionality

/**
 * Open and select a gadget menu option
 * @param {string} gadgetName - The divs ID of the gadget to be selected (eg: 'ws-gadget-holder-ContextBrowser-0').
 * @param {string} optionName - The option to be selected.
 */
function selectMenuItem(gadgetName, optionName) {
    cy.get('div#' + gadgetName).within(() => {
        cy.get('span.ws-hamburger-menu').click().then(() => {
            cy.get('span.ws-context-menu-title:contains("' + optionName + '")').click();
        });
    });
}

/**
 * Utility function to open a gadget.
 * @param {string} name - the name of the gadget or group to open.
 * @param {string} titleClassname - the class of the span (title in WorkspaceEditor but gadget-title in Workspaces)
 */
function openGadgetOrGroup(name, titleClassname = 'gadget-title') {
    const titleSelector = `span.${titleClassname}:contains("${name}")`;
   
    // Check the gadget is in the current workspace.
    cy.get(titleSelector).then(function ($titleSelector) {
        cy.log('Checking that this workspace contains a gadget called ' + name);
        cy.wrap($titleSelector).should('be.visible');
        $titleSelector.closest('div').find('span.ws-show-hide-icon.mdi-chevron-down').click();
    });
}

/**
 * Utility function to open a gadget in worskpace editor.
 * @param {string} name - the name of the gadget or group to open.
 */
function workspaceEditorExpandGadgetOrGroup(name) {
    openGadgetOrGroup(name, 'title');
}
/*
above equivalent to:
//const workspaceEditorExpandGadgetOrGroup = (name) => openGadgetOrGroup(name, 'title');
*/

/**
 * Utility to open a grouped gadget within an already expanded parent gadget.
 * @param {string} groupedGadgetName - the name of the gadget as displayed on the tab in the group.
 */
function openGroupedGadget(groupedGadgetName) {
    cy.get('a.ui-tabs-anchor:contains("' + groupedGadgetName + '")').then((tabs) => {
        if (tabs.length == 1) {
            tabs.click();
        } else if (tabs.length > 1) {
            for (let i = 0; i < tabs.length; i++) {
                if (tabs[i].text === groupedGadgetName) {
                    tabs[i].click();
                    break;
                }
            }
        } else {
            cy.log("No grouped gadgets found");
        }
    });
}

module.exports = {
    selectMenuItem: selectMenuItem,
    openGadgetOrGroup: openGadgetOrGroup,
    openGroupedGadget: openGroupedGadget,
    workspaceEditorExpandGadgetOrGroup: workspaceEditorExpandGadgetOrGroup
};
