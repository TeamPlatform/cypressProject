// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })


// This caused problems with tests getting faced with an Invalid Session message instead of a login page. Disable for now.
//Cypress.LocalStorage.clear = function () {
//    /*
//    WAVE-5182 - https://github.com/cypress-io/cypress/issues/461#issuecomment-325402086
//        Overriding this Cypress function stops the Local Storage being cleared in between tests (which breaks our sessions)
//        There may be other unexpected effects caused by this, but as AMI sometimes starts with cleared local sessions we want 
//        it to cope regardless, clearing it between tests doesn't reflect AMI real world use.
//    */
//};

Cypress.Commands.add('exactText', {prevSubject: true}, (subject, textToMatch) => 
    subject.filter((index, element) => element.textContent === textToMatch));

/*
    Opens The Gadget Hamburger Menu belong to the 'subject' element passed in.
*/
Cypress.Commands.add('openGadgetHamburger', {prevSubject: true}, (subject) => 
    cy.wrap(subject).closest('.ws-gadget-holder').find('span.ws-hamburger-menu').click().
            then(() => cy.get('ul.ws-menu-container')));

Cypress.Commands.add('getGadgetHamburgerMenuItem', {prevSubject: true}, (subject, menuItemText) => 
    cy.wrap(subject).
        openGadgetHamburger().
        find('span.ws-context-menu-title').
            exactText(menuItemText).
            should("be.visible", `Expected To Find A Menu Option Named '${menuItemText}'`));