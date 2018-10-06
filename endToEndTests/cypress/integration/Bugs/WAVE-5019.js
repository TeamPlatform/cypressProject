const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');

/*
Test outline
Configuration Options, Price Lists - add a new price list
Make sure there's a 10 character limit for Decimal Separator, Currency Prefix, Thousand Separator and Currency Suffix:
*/

describe('WAVE-5019 Impose 10 character limit on input fields in price list editor', function () {
    it('Test to make sure user cant add more than 10 characters in price list input fields', function () {
        
        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Click price options (timeout to ensure loaded)
        cy.get('#conf-priceLists', {timeout: 5000}).click();

        // Click create price list icon - span within conf-toolbar which has title "Create Price List..."
        cy.get('#conf-toolbar').find('span[title="Create Price List..."]').click();

        // Attempt to add a 15 digit string into each input we are testing, check if only 10 characters are entered

        const inputAttempt = '123456789abcde';
        const expectedValue = '123456789a'; 

        function tenCharacterLimit(inputId) {
            cy.get(inputId).type(inputAttempt).
            should('have.value', expectedValue).
            and('not.have.value', inputAttempt);
        }

        tenCharacterLimit('#ab-pl-decimal-sep'); // decimal separator
        tenCharacterLimit('#ab-pl-currency-prefix'); // currency prefix
        tenCharacterLimit('#ab-pl-thousand-sep'); // thousand separator
        tenCharacterLimit('#ab-pl-currency-suffix'); // currency suffix

        loginUtils.logoutFromAMI();

    });
});
