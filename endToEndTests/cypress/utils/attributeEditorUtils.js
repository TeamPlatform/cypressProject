/**
 * Utility function to type in an attribute editor text box.
 * @param {string} value - the value to type in the editor.
 */
function enterText(value) {
    cy.get('#ws-text-editor', { timeout: 20000 }).then((iframe) => {
        const $editorBox = iframe.contents().find('.ws-editable-content');

        cy.wrap($editorBox).type(value, {force: true});
    });
}

function checkText(expectedValue) {
    cy.get('#ws-text-editor', { timeout: 20000 }).then((iframe) => {
        const $editorBox = iframe.contents().find('.ws-editable-content');

        expect($editorBox.text()).to.eq(expectedValue);
    });
}

module.exports = {
    enterText: enterText,
    checkText: checkText
};
