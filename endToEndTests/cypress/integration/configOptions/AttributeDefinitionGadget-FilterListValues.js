const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const configOptionsUtils = require('../../utils/configOptionsUtils');

describe('Attribute Definitions - Filter list values', function () {

    it('Exercises the filter of the attribute definition list', function () {

        // Following is text to input and expected results in the following format: [*Filter text value*, [*Expected filtered values in list*]]
        const filtersResults = [
            ["Des", ['Description']],
            ["dz",  ['dzaaaTest']],
            ["0.1", ['0.1 Test']],
            ["*0.", ['0.1 Test', '0.2 Test', 'Test 0.1']],
            ["0,",  ['0, Filtertest']],
            ["é",   ['Éspace', 'éspace']],
            ['a""', ['A"" Test', 'a"" Test']],
            ["a£",  ['A£ Test', 'a£ Test']],
            ["a$",  ['A$ Test', 'a$ Test']],
            ["a€",  ['A€ Test', 'a€ Test']],
            ["a!",  ['A! Test', 'a! Test']],
            ["a%",  ['A% Test', 'a% Test']],
            ["a^",  ['A^ Test', 'a^ Test']],
            ["a&",  ['A& Test', 'a& Test']],
            ["a[",  ['A[ Test', 'a[ Test']],
            ["a]",  ['A] Test', 'a] Test']],
            ["_",   ['_Description', '_Heading', '_Item Group Name', '_JR SFAL Workflow', '_Preview Image', '_Product Table', '_[Pub] Focus text', '_[Vendor] Brand Name', '_[Web] Display as Option', '_[Web] Option attribute list', '_[Web] Published', '_page number']],
            ["a{",  ['A{ Test', 'a{ Test']],
            ["a}",  ['A} Test', 'a} Test']],
            ["a:",  ['A: Test', 'a: Test']],
            ["a@",  ['A@ Test', 'a@ Test']],
            ["a'",  ["A' Test", "a' Test"]],
            ["a~",  ['A~ Test', 'a~ Test']],
            ["a#",  ['A# Test', 'a# Test']],
            ["a<",  ['A< Test', 'a< Test']],
            ["a>",  ['A> Test', 'a> Test']],
            ["a\\\\", ['A\\\\ Test', 'a\\\\ Test']],
            ["a|",  ['A| Test', 'a| Test']],
            ["the", ['THE Test', 'the Test']],
            ["Acme C?", ['Acme Cachet Level', 'Acme Colour']]
        ];


        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('Configuration Options');

        // Open the Attribute definition tool.
        configOptionsUtils.selectTool('Attribute Definitions');

        for (let i = 0; i < filtersResults.length; i++) {
            const filterText = filtersResults[i][0];
            const expectedVisibleItems = filtersResults[i][1].sort();

            // Clear the attribute definition filter input and enter (filterText).
            cy.get('#attrDefn-filter').clear().type(filterText);

            // Get the visible attribute definitions in the list after the filter is applied.
            cy.get('#attrDefn-list a:visible').then((visibleAttribs) => {                

                const visibleText = visibleAttribs.map((index, visibleAttrib) => Cypress.$(visibleAttrib).text()).sort();
                
                // Iterate through the listed values and match them to the expected values in (expectedText).
                for (let j = 0; j < visibleAttribs.length; j++) {
                    const attribText = visibleText[j];
                    const expectedText = expectedVisibleItems[j]; // This assumes they are sorted in exactly the same order
                    
                    expect(attribText).to.equal(expectedText);
                }
            });
        }
        // Logout.
        loginUtils.logoutFromAMI();
    });
});
