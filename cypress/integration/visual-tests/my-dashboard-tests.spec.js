
import{dashboardPage}from '../../support/pageObjects/DashBoardPage'
import {   utils } from "../../support/Utilities/Utils";
const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
Cypress.env();

before(() => {
cy.login(email, password);
utils.waitTillPageLoad();
});



describe("My dashboard page", () =>
{


    it("Logs in and redirect to dashboard page", () =>
    {
        cy.screenshot("Validating Navigation bar items ( My Dashboard , Off-the-Tee ,Approach , Around the Green , Putting and Scoring ",
        {});
    });

    it.skip("Logs in and verify by default what's going on is selected in Dashboard", () =>
    {

        dashboardPage.whatsGoingOnwell().click();
        //check if color of impact sections is green  
        dashboardPage.impactsections()
                     .should('be.visible')
                     .should('have.length', 3)
                     .each((item, index, list) =>
                        {
                            var atrib = Cypress.$(item).attr('class');
                            cy.wrap(atrib).should('contain', 'bg-success');
                        });

        cy.screenshot("What's going on well",
        {

        });
    });

    it.skip("Logs in and verify what to focus on in Dashboard", () =>
    {

        dashboardPage.whatTofocus().click(
                          {
                             force: true
                          })
                     .then(()=>
                         {
                            //check if color of impact sections is red 
                             dashboardPage.impactsections()
                                          .should('be.visible')
                                          .should('have.length', 3)
                                          .each((item, index, list) =>
                                            {
                                                var atrib = Cypress.$(item).attr('class');
                                                cy.wrap(atrib).should('contain', 'bg-danger');
                                            });
                         })
        //check colors 
        cy.screenshot("What to focus on",
        {

        });
    });
});
