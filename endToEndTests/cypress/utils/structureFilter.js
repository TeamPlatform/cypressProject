// TODO: Make these functions just check the classes of #ws-structureFilter to see if the filter is enabled or not.

function _activate() {
    // Open the structure filter dialog.
    cy.get('#ws-structureFilter').click();

    cy.get('#structure-filter-enabled').then(() => {
        // If the filter is already active, this won't find any elements.
        Cypress.$('#structure-filter-enabled:not(checked)').click();
    });

    cy.get('#ws-dialog-submit').click();
}

function _deactivate() {
    // Open the structure filter dialog.
    cy.get('#ws-structureFilter').click();

    cy.get('#structure-filter-enabled').then(() => {
        // If the filter is already inactive, this won't find any elements.
        Cypress.$('#structure-filter-enabled:checked').click();
    });

    cy.get('#ws-dialog-submit').click();
}

/**
 * Set an 'input' or 'select' filter to a value.
 * @param {string} filter - the filter name case sensitive without the following ':'.
 * @param {string} value - the required value to type or select.
 */
function _setFilterValue(filter, value) {
    // Set a 'filter' to a 'value'.
    filter = filter + ':';

    cy.get('#ws-structureFilter').click();

    cy.get('#ws-structure-filter-container').within(() => {
        cy.get('p>label').then(($filters) => {
            cy.log(filter);
            for (let i = 0; i < $filters.length; i++) {
                if ($filters[i].innerText === filter) {
                    cy.get('#' + $filters[i].htmlFor).then(($option) => {
                        if ($option[0].tagName === 'SELECT') {
                            cy.wrap($option).select(value);
                        } else if ($option[0].tagName === 'INPUT') {
                            cy.wrap($option).clear().type(value);
                        }
                    });
                    break;
                }
            }
        });
    });

    cy.get('#ws-dialog-submit').click();  
}

module.exports = {
    activate: _activate,
    deactivate: _deactivate,
    setFilterValue: _setFilterValue
};
