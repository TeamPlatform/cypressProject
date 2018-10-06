const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');

describe('History Gadget Object Sequence', function () {

    it('Checks that objects added to the gadget are shown in order from most recent', function () {
        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('QA Attribute Gadget');

        // Open the Browse and History gadget.
        anyGadgetUtils.openGadgetOrGroup("Don't show prefixes in object names");
        anyGadgetUtils.openGadgetOrGroup('History');
        browserGadgetUtils.setStructureType('Events');

        browserGadgetUtils.setBrowseContext('pwtest/ALTRO RANGE - STAINLESS STEEL');
        browserGadgetUtils.setBrowseContext('07 Office Supplies 2007');

        cy.wait(2000);

        function getHistItems() {
            return new Promise((resolve, reject) => {
                let histItems = [];
                cy.get("#historyGadgetList .ws-rendered-name").then((items) => {
                    if (items.length === 0) {
                        reject(histItems);
                    }
                    for (let i = 0; i < items.length; i++) {
                        histItems.push(Cypress.$(items[i]).text());
                    }
                    resolve(histItems);
                });
            });
        }

        let histItems2 = ["07 Office Supplies 2007", "ALTRO RANGE - STAINLESS STEEL"];

        getHistItems().then((histItems1) => {
            for (let i = 0; i < 2; i++) {
                cy.log(histItems1);
                expect(histItems1[i]).to.equal(histItems2[i]);
            }
            loginUtils.logoutFromAMI();
        });
    });
});