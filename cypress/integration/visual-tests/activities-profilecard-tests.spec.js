const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

before(() => {
  cy.login(email, password);
  //by default dashboard screen should be visible
  cy.url().should("include", "/dashboard");
});

describe("Activity Details- Profile Card View", () => {
  it("Logs in and redirect to Activity Details Profile Card view", () => {
    //clicking on any activty for activity details page

    cy.xpath("//a[normalize-space()='Activities']").click();

    //Clicking on profile card view
    cy.get(".border-r-0.rounded-l-none").click();

    // cy.percySnapshot("Activity Details - Profile Card view");
    cy.screenshot("Activity Details - Profile Card view");
  });
});
