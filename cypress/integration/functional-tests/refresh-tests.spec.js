import { dashboardPage } from "../../support/pageObjects/DashboardPage";

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

before(() => {
  cy.login(email, password);
  //by default dashboard screen should be visible
  cy.url().should('include', '/dashboard')
});

describe("Validating toasts messages for refresh button", () => {
  it("Check the toasts messages ", () => {

    dashboardPage.plusDropdown().click()
    dashboardPage.refreshData().click()
    cy.wait(7000);
    //Verifying if the refresh process has successfully started
    cy.get(".shadow-modal > .flex")
      .contains(
        "We are currently fetching your activity data. Please check back in a few minutes."
      )
      .should("be.visible");

    cy.wait(20000);
    //Verifying the toast message when refresh process completes
    // cy.xpath('/html[1]/body[1]/div[3]/div[1]/div[1]/div[1]',{timeout:60000}).contains('There are no new activities to load.').should('be.visible')
  });
});
