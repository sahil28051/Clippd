const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

before(() => {
  cy.login(email, password);
  cy.wait(5000);
});

describe("Activity Details- Profile Card View", () => {
  it("Logs in and redirect to Activity Details Profile Card view", () => {

    //navigating to My bag page
    cy.visit("/profile/my-bag");


    cy.wait(2000);
    cy.screenshot("Profile - My bag page");


  })
})
