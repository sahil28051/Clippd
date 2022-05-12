const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();
before(() => {
  cy.login(email, password);
  cy.wait(5000);
});
describe("PUT dashboard page", () => {
  it("Logs in and redirect to  dashboard page", () => {
    //Click on Putting
    cy.get('.w-full > :nth-child(5) > .flex').click()
    cy.wait(4000);
    cy.screenshot();
    cy.wait(4000);
    // cy.screenshot("PUT Dashboard responsive test", {
    //   widths: [375, 992, 1200],
    // });
  });
});