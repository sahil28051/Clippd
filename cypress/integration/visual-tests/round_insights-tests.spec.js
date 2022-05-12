import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { activitiesPage } from "../../support/pageObjects/ActivitiesPage";

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
    Cypress.env();

before(() => {
    cy.login(email, password);
});

describe("Round insights ", () => {

    it("Validating Menu items", { tags: ['@smoke'] }, () => {

        //Click "Activities" from Dashboard 
        dashboardPage.activityLink().click()
        cy.wait(5000)
        //Selecting an activity from list 
        activitiesPage.activityCard().click()
        cy.wait(5000)
        //Navigate to Round Insights tab
        activitiesPage.roundInsightsTab().click()
        cy.wait(3000)
        cy.screenshot("Round insghts responsive test", {
            widths: [375, 992, 1200],
        });
    });
});