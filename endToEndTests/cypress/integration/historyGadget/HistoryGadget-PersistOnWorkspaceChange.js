const loginUtils = require('../../utils/loginUtils');
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');
const browserGadgetUtils = require('../../utils/browserGadgetUtils');

describe('History Gadget - Persist On Workspace Change', function () {

    it('Changes workspace and checks if history state persists', function () {
        loginUtils.loginToAMI('cypress1');

        changeDropdownUtils.changeWorkspace('QA Attribute Gadget');

        // Open the Browse and History gadget.
        anyGadgetUtils.openGadgetOrGroup("Don't show prefixes in object names");
        anyGadgetUtils.openGadgetOrGroup('History');
        browserGadgetUtils.setStructureType('Events');

        browserGadgetUtils.setBrowseContext('pwtest/ALTRO RANGE - STAINLESS STEEL');
        browserGadgetUtils.setBrowseContext('07 Office Supplies 2007');

        cy.wait(2000);

        function _getHistItems() {
            return new Promise((resolve, reject) => {
                let histItems = [];
                cy.get("#historyGadgetList .ws-rendered-name").then(($items) => {
                    if ($items.length === 0) {
                        reject(histItems);
                    }
                    for (let i = 0; i < $items.length; i++) {
                        histItems.push(Cypress.$($items[i]).text());
                    }
                    resolve(histItems);
                });
            });
        }

        // Grab the history gadgets listed objects in order then change to another workspace that has a history gadget shown.
        _getHistItems().then((histItems1) => {
            changeDropdownUtils.changeWorkspace('QA DatasheetWithFilters');

            // Open the history gadget and grab the listed objects in order.
            anyGadgetUtils.openGadgetOrGroup('History');
            _getHistItems().then((histItems2) => {

                // Check the list length pre and post workspace change.
                expect(histItems1.length).to.equal(histItems2.length);
                for (let i = 0; i < histItems1.length; i++) {
                    expect(histItems1[i]).to.equal(histItems2[i]);
                }
                loginUtils.logoutFromAMI();
            });
        });
    });
});