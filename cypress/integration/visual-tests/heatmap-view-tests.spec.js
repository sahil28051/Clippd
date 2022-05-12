const { DEFAULT_COACH_EMAIL: email, DEFAULT_COACH_PASSWORD: password } =
  Cypress.env();

before(() => {
  cy.login(email, password);
});

describe("Heatmap View - Team Dashboard ", () => {
    it("Logs in and clicks for heatmap View", () => {

      cy.get('.rounded-l-none').click()
      cy.wait(7000);
      cy.screenshot("Heatmap view responsive test", {
        widths: [375, 992, 1200],

    })
  })
})