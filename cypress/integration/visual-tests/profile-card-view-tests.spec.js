const { DEFAULT_COACH_EMAIL: email, DEFAULT_COACH_PASSWORD: password } =
  Cypress.env();

before(() => {
  cy.login(email, password);
});

describe("Profile Card View - Team Dashboard ", () => {
    it("Logs in and clicks on Profile Card View", () => {

      cy.screenshot("Profile Card view responsive test", {
        widths: [375, 992, 1200],
    })
  })
})