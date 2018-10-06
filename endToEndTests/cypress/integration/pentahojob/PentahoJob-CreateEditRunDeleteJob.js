/* eslint-disable no-unused-expressions */
const changeDropdownUtils = require('../../utils/changeDropdownUtils');
const loginUtils = require('../../utils/loginUtils');
const anyGadgetUtils = require('../../utils/anyGadgetUtils');

//held for CONTENT-3895 - edit does not save parameters as thinks job does not exist
describe.skip('PentahoJob: Create, Edit and check Run using Pentaho Job UI', function () {

    it('Checks the Pentaho Create job validation messages', function () {

        // Log in as 'cypress2'.
        loginUtils.loginToAMI('cypress2');

        // Open a workspace that has a Pentaho jobs gadget.
        changeDropdownUtils.changeWorkspace('QA Pentaho');

        // Find the Pentaho jobs Gadget and open it if necessary.
        anyGadgetUtils.openGadgetOrGroup('Pentaho Jobs');

        //Get the create new job button and click it
        cy.get('#PentahoJob-menu-icon').then(($span) => {
            $span.click();
            cy.get('#PentahoJob-menu-createPentahoJob').click();
        });

        //set the job name  
        cy.get('#pentCreatejob-name').then(($span) => {
            $span.val('Pentaho end to end name');
        });

        //check form validation
        cy.get('#ws-dialog-submit').then(($submit) => {
            $submit.click();
        });

        //check that there is a validation message returned 
        cy.get('.ws-notification-content').should('contain', '1221: The Pentaho Job must have a description');

        //close the error message
        cy.get('.mdi-close').click();

        //set the job description       
        cy.get('#pentCreatejob-desc').then(($span) => {
            $span.val('Pentaho end to end testing description');
        });

        //check form validation
        cy.get('#ws-dialog-submit').then(($submit) => {
            $submit.click();
        });

        //check that there is a validation message returned 
        cy.get('.ws-notification-content').should('contain', '1221: The Pentaho Job must have a respository path');

        //close the error message
        cy.get('.mdi-close').click();

        //set the repository path     
        cy.get('#pentCreatejob-repPath').then(($span) => {
            $span.val('end/to/end/path');
        });

        //check the end user can abort box
        cy.get('#pentCreatejob-abort-bool').click();

        //add job
        cy.get('#ws-dialog-submit').click();

        loginUtils.logoutFromAMI();

    });
 
    it('Edits an Existing Pentaho Job', function () {

        // Log in as 'cypress2'.
        loginUtils.loginToAMI('cypress2');

        // Open a workspace that has a Pentaho jobs gadget.
        changeDropdownUtils.changeWorkspace('QA Pentaho');

        // Find the Pentaho jobs Gadget and open it if necessary.
        anyGadgetUtils.openGadgetOrGroup('Pentaho Jobs');

        //sort on last edit date
        cy.get('#browsetab-jobLastModified-col', {timeout: 15000}).then(($span) => {
            $span.click();
            cy.get('#browsetab-jobLastModified-col', {timeout: 15000}).click();
            //select the latest job
            cy.get('#grid-select-checkbox1').check();
        });

        //edit the job
        cy.get('#PentahoJob-menu-icon').then(($span) => {
            $span.click();
            cy.get('#PentahoJob-menu-editPentahoJob').click();
        });

        //create some job parameters
        cy.get('#add-param-btn').click();

        cy.get('#pentCreateParam-name').then(($span) => {
            $span.val('End to End 1');
        });

        //click submit to test validation
        cy.get('#ws-dialog-2-submit').click();
        
        //check that there is a validation message returned 
        cy.get('.ws-notification-content').should('contain', '1221: Parameter fields name, type and label must have a value');

        //close the error message
        cy.get('.mdi-close').click();

        //set the parameter type - attribute set
        cy.get('select#pentCreateParam-type').select('1');
        
        //set the parameter label
        cy.get('#pentCreateParam-label').then(($span) => {
            $span.val('EtoE attrib set label');
        });

        //set the parameter value
        cy.get('select#pentCreateParam-value').select('2');

        //submit parameter
        cy.get('#ws-dialog-2-submit').click();
         
        //second parameter - object type
        cy.get('#add-param-btn').click();

        cy.get('#pentCreateParam-name').then(($span) => {
            $span.val('End to End 2');
        });

        //set the parameter type, label, value
        cy.get('select#pentCreateParam-type').select('2');
        
        cy.get('#pentCreateParam-label').then(($span) => {
            $span.val('EtoE obj type label');
        });

        cy.get('select#pentCreateParam-value').select('40');

        //submit parameter
        cy.get('#ws-dialog-2-submit').click();

        //third parameter - checkbox
        cy.get('#add-param-btn').click();

        cy.get('#pentCreateParam-name').then(($span) => {
            $span.val('End to End 3');
        });

        //set the parameter type, label, value
        cy.get('select#pentCreateParam-type').select('3');
        
        cy.get('#pentCreateParam-label').then(($span) => {
            $span.val('EtoE checkbox label');
        });

        cy.get('select#pentCreateParam-value').select('1');        
        
        //submit parameter
        cy.get('#ws-dialog-2-submit').click();
        
        //4th parameter - numeric
        cy.get('#add-param-btn').click();

        cy.get('#pentCreateParam-name').then(($span) => {
            $span.val('End to End 4');
        });

        //set the parameter type, label, value
        cy.get('select#pentCreateParam-type').select('4');
        
        cy.get('#pentCreateParam-label').then(($span) => {
            $span.val('EtoE numeric label');
        });

        cy.get('#pentCreateParam-value').then(($span) => {
            $span.val('5');
        });

        //submit parameter
        cy.get('#ws-dialog-2-submit').click();
                
        //5th parameter - text field
        cy.get('#add-param-btn').click();

        cy.get('#pentCreateParam-name').then(($span) => {
            $span.val('End to End 5');
        });

        //set the parameter type, label, value
        cy.get('select#pentCreateParam-type').select('5');
        
        cy.get('#pentCreateParam-label').then(($span) => {
            $span.val('EtoE text field label');
        });

        cy.get('#pentCreateParam-value').then(($span) => {
            $span.val('End to end text field');
        });

        //submit parameter
        cy.get('#ws-dialog-2-submit').click();

        //6th parameter - text box
        cy.get('#add-param-btn').click();

        cy.get('#pentCreateParam-name').then(($span) => {
            $span.val('End to End 6');
        });

        //set the parameter type, label, value
        cy.get('select#pentCreateParam-type').select('6');
        
        cy.get('#pentCreateParam-label').then(($span) => {
            $span.val('EtoE text box label');
        });

        cy.get('#pentCreateParam-value').then(($span) => {
            $span.val('End to end text box field');
        });

        //submit parameter
        cy.get('#ws-dialog-2-submit').click();

        //7th parameter - date
        cy.get('#add-param-btn').click();

        cy.get('#pentCreateParam-name').then(($span) => {
            $span.val('End to End 7');
        });

        //set the parameter type, label, value
        cy.get('select#pentCreateParam-type').select('7');
        
        cy.get('#pentCreateParam-label').then(($span) => {
            $span.val('EtoE date label');
        });

        cy.get('#pentCreateParam-value').then(($span) => {
            $span.val('04-04-2018');
        });
        //submit parameter
        cy.get('#ws-dialog-2-submit').click();

        //8th parameter - file
        cy.get('#add-param-btn').click();

        cy.get('#pentCreateParam-name').then(($span) => {
            $span.val('End to End 8');
        });

        cy.get('select#pentCreateParam-type').select('8');

        cy.get('#pentCreateParam-label').then(($span) => {
            $span.val('EtoE file label');
        });

        cy.get('#pentCreateParam-value').should('be.disabled');

        //submit parameter
        cy.get('#ws-dialog-2-submit').click();

        //Select the 'Selection tab'
        cy.get('#pentahoCreateJob-tab-list a[href^="#tab-2"]').click();

        //Check all of the boxes on the Selection tab
        cy.get('#pentCreatejob-browseSelection-bool').check();
        cy.get('#pentCreatejob-searchSelection-bool').check();
        cy.get('#pentCreatejob-searchResults-bool').check();
        cy.get('#pentCreatejob-searchCriteria-bool').check();

        //Select the 'Access Rights tab'
        cy.get('#pentahoCreateJob-tab-list a[href^="#tab-3"]').click();

        //Expand the access rights tree
        cy.get('#arrow-pent-createjob2').click();
        cy.get('#arrow-pent-createjob2-3').click();

        //Remove access for Jason
        cy.get('#ode-cb-I-2-3-26425').uncheck();
        cy.get('#ode-cb-V-2-3-26425').uncheck();

        //update job
        cy.get('#ws-dialog-submit').click();

        loginUtils.logoutFromAMI();

    });

    it('Runs an Existing Pentaho Job', function () {

        // Log in as 'cypress2'.
        loginUtils.loginToAMI('cypress2');

        // Open a workspace that has a Pentaho jobs gadget.
        changeDropdownUtils.changeWorkspace('QA Pentaho');

        // Find the Pentaho jobs Gadget and open it if necessary.
        anyGadgetUtils.openGadgetOrGroup('Pentaho Jobs');
 
        //sort on last edit date
        cy.get('#browsetab-jobLastModified-col', {timeout: 15000}).then(($span) => {
            $span.click();
            cy.get('#browsetab-jobLastModified-col', {timeout: 15000}).click();
            //select the latest job
            cy.get('#grid-select-checkbox1').check();
        });

        //start the job
        cy.get('#PentahoJob-menu-icon').then(($span) => {
            $span.click();
            cy.get('#PentahoJob-menu-startPentahoJob', {timeout: 3000}).click();
        });

        //check run job parameters exist as expected from created job
        cy.get('#pentrunjob-jobDesc').should('contain', 'The currently selected objects in the browse gadget');
        cy.get('#pentrunjob-jobDesc').should('contain', 'The results from the search gadget');
        cy.get('#pentrunjob-jobDesc').should('contain', 'The currently selected objects in the Search gadget');
        cy.get('#pentrunjob-jobDesc').should('contain', 'The AQL query currently in use by the Search gadget');

        //check parameter values on job
        cy.get('#pentrunjob-attribute-set-1').should(function (select) {
            expect(select.val()).to.eq('2');
        });
        cy.get('#pentrunjob-object-type-2').should(function (select) {
            expect(select.val()).to.eq('40');
        });
        cy.get('#pentrunjob-bool-3').should(function (select) {
            expect(select.isChecked()).to.be.false;
        });
        cy.get('#pentrunjob-numeric-4').should(function (select) {
            expect(select.val()).to.eq('5');
        });
        cy.get('#pentrunjob-shortText-5').should(function (select) {
            expect(select.val()).to.eq('End to end text field');
        });
        cy.get('#pentrunjob-longText-6').should(function (select) {
            expect(select.val()).to.eq('End to end text box field');
        });
        cy.get('#pentrunjob-date-7').should(function (select) {
            expect(select.val()).to.contain('-20');
        });
        cy.get('#pentrunjob-file-8').should(function (select) {
            expect(select.val()).to.eq('');
        });

        //cancel the job - will check for background gadget selections and error if it can't find them
        cy.get('#ws-dialog-cancel').then(($cancel) => {
            $cancel.click();
        });

        loginUtils.logoutFromAMI();
    });

    it('Deletes an Existing Pentaho Job', function () {

        // Log in as 'cypress2'.
        loginUtils.loginToAMI('cypress2');

        // Open a workspace that has a Pentaho jobs gadget.
        changeDropdownUtils.changeWorkspace('QA Pentaho');

        // Find the Pentaho jobs Gadget and open it if necessary.
        anyGadgetUtils.openGadgetOrGroup('Pentaho Jobs');

        //sort on last edit date
        cy.get('#browsetab-jobLastModified-col', {timeout: 15000}).then(($span) => {
            $span.click();
            cy.get('#browsetab-jobLastModified-col', {timeout: 15000}).click();
            //select the latest job
            cy.get('#grid-select-checkbox1').check();
        });

        //delete the job
        cy.get('#PentahoJob-menu-icon').then(($span) => {
            $span.click();
            cy.get('#PentahoJob-menu-deletePentahoJob', {timeout: 5000}).click();
        });

        //confirm job deletion
        cy.get('#ws-dialog-submit', {timeout: 5000}).click();

        loginUtils.logoutFromAMI();
    });

});

 