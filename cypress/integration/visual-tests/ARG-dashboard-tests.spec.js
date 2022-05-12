const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
Cypress.env();

before(() => {
cy.login(email, password);
});

describe("ARG dashboard page", () => {
    it("Logs in and redirect to  dashboard page", () => {
      //Click on Around the green
      cy.get('.w-full > :nth-child(4) > .flex').click()
      cy.wait(4000);
      cy.screenshot("ARG Dashboard responsive test", {
        widths: [375, 992, 1200],
      });
    });
  });