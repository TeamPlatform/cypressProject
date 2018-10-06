// Utility functions for common 'Browse' gadget operations


function getBrowserGadgetClass(secondary = false) {
    let browserInstance = 'div#ContextBrowser-0 > form > .context-browser';

    if (secondary) {
        browserInstance = 'div#ContextBrowser-01 > form > .secondary-browser';
    }
    return browserInstance;
}

/**
 * Utility to select a structure tab in the Browse gadget.
 * @param {string} structure - the structure tab name
 * @param {bool} secondary - set 'true' to use a second browse gadget within the workspace.
 */
function setStructureType(structure, secondary = false) {
    let browserClass = getBrowserGadgetClass(secondary);

    cy.get(`${browserClass} > .ui-accordion`).within(() => {
        cy.get('a').contains(structure).click();
    });
}

/**
 * Utility to navigate through the browse gadget
 * @param {string} browserPath - '/' delimited path through the context browser from root eg: testObject/child1/grandchild1
 * @param {bool} secondary - set 'true' to use a second browse gadget within the workspace.
 */
function setBrowseContext(browserPath, secondary = false) {
    let browserClass = getBrowserGadgetClass(secondary);
    const pathArray = browserPath.split("/");
    
    /**
     * expandBrowserList - recursive function that expands and clicks on browse gadget elements
     * eg if pathArray == ['Cypress', 'Edit']
     * it will find the top level Object named 'Cypress', and click on it to expand it (unless it is already expanded)
     * it will then recursively search the children of the 'Cypress' ul for an Object Named 'Edit'
     * @param {element} ulElement the ul element to recursively search
     * @param {array} pathArray - an aray of Object Names to find and expand (uses shift so the array is altered)
     */
    const expandBrowserList = (ulElement, pathArray) => {
        const textToFind = pathArray.shift();
        // once an arrow to expand is found, expandBrowserListFromArrow finds the closest parent 'ul' and recursively calls this function
        // with the shifted pathArray, to look for and expand or click the children
        const expandBrowserListFromArrow = (arrow) => cy.wrap(arrow).closest('li').find('ul').then((ul) => expandBrowserList(ul, pathArray));
        let found = false;
        // First find ALL anchors underneath the 'ul'
        cy.wrap(ulElement).find('a').then((anchors) => {
            cy.wrap(anchors).each((anchor) => {
                // If we have already found an anchor with matching text, we don't need to do anything
                // According to the cy docs the each callback should be able to return false to stop it continuing, 
                // but that didn't work, so this is a work around to avoid unneeded processing.
                if (found) {
                    return;
                }
                // if the anchor has text that exactly matches it will be expanded or clicked.
                if (Cypress.$(anchor).find('span.ws-rendered-name').text() === textToFind) {
                    found = true; // tell the loop that it doesn't need to process any more anchors.
                    const idPath = anchor.attr('id');
                    // if pathArray.length > 0 then this is not the leaf node we are looking for,
                    // so we find the arrow, click on it (if it is not already expanded) and make a recursive call
                    // with the resulting child ul
                    if (pathArray.length) { 
                        // Get the expansion arrow for this Object, click on it if necessary and then recursively call this function
                        // with the child ul
                        cy.get('#arrow-' + idPath).
                            then((arrow) => {
                                if ((Cypress.$(arrow).hasClass('mdi-triangle-closed'))) {
                                    cy.wrap(arrow).click({timeout: 5000, force: true}).
                                        then(() => expandBrowserListFromArrow(arrow));
                                } else {
                                    expandBrowserListFromArrow(arrow);
                                }
                            });
                    } else { 
                        /*
                            if pathArray.length === 0 then this is the leaf node we are looking for so click it.
                            ideally there would be an additional check after the click to cause cypress to wait until the context has loaded
                            (such as cy.get('something we expect to see').should('be.visible'))
                            but the expected page that is rendered differs from workspace to workspace 
                            so the tests will need to make that assertion
                        */
                        cy.get('#' + idPath).click({timeout: 5000, force: true});
                    }
                }
            });
        });
    };
    // Get the Browse Gadgets root ul. and kick off the recursive search
    cy.get(`${browserClass} > .ui-accordion`).within(() => {
        cy.get('.simple-browser > ul', {timeout: 5000}).within((ul) => {
            expandBrowserList(ul, pathArray);
        });
    });
}

/*
 * Utility to set checkboxes that are currently visible in the browse gadget
 * @param {string} objectNames - ',' delimited list of the object names to tick; e.g.: 'testObj1,testObj2'
 * @param {bool} secondary - set 'true' to use a second browse gadget within the workspace.
 */

function setCheckBoxes(objectNames, secondary = false) {
    let browserClass = getBrowserGadgetClass(secondary);

    cy.get(`${browserClass} > .ui-accordion`).within(() => {
        cy.get('.simple-browser', {timeout: 5000}).within(() => {
            let boxesArray = objectNames.split(",");
            for (let i = 0; i < boxesArray.length; i++) {
                cy.get('span.ws-rendered-name:contains("' + boxesArray[i] + '")').parent('a').then(($parentNode) => {
                    let checkNode = $parentNode.attr('id');
                    cy.log(checkNode);
                    cy.get(`input#check-${checkNode}`).click();
                });
            }
        });
    });
}

module.exports = {
    setStructureType: setStructureType,
    setBrowseContext: setBrowseContext,
    setCheckBoxes: setCheckBoxes
};
