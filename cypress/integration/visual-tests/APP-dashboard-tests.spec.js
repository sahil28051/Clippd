const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

before(() => {
  cy.login(email, password);
});

describe("APP dashboard page", () => {
    it("Logs in and redirect to  APP dashboard page", () => {
      //Click on Approach
      cy.get('.overflow-x-scroll > .w-full > :nth-child(3) > .flex').click()
      cy.wait(4000);
      cy.screenshot("AAP Dashboard responsive test", {
        widths: [375, 992, 1200],
      });
    });
  });