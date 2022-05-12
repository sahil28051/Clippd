const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
Cypress.env();

before(() => {
cy.login(email, password);
cy.waitFor(5000)
});

describe("ARG dashboard page", () => {
    it("Logs in and redirect to  dashboard page", () => {
      //Click on Around the green
      cy.get('.overflow-x-scroll > .w-full > :nth-child(6) > .flex').click()
      cy.wait(4000);
      cy.screenshot("Scoring Dashboard responsive test", {
        widths: [375, 992, 1200],
      });
    });
  });