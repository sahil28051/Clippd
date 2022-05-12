import { utils } from "../../support/Utilities/Utils";

import { dashboardPage } from "../../support/pageObjects/DashboardPage";

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

before(() => {
  cy.login(email, password);
});

describe("The Edit information -Player page", () => {
  it("Logs in and redirect to Edit-information ", () => {
    dashboardPage.profileName().click();
    //verifying url on my profile page
    cy.url().should("include", "/profile/my-profile");
    cy.wait(4000);
    cy.xpath("//button[contains(@class,'cursor-pointer right-4 top-4')]", {
      timeout: "10000",
    }).click();
    cy.wait(4000);

    cy.screenshot("Edit-Information Player profile");
  });
});
