const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
Cypress.env();

before(() => {
cy.login(email, password);
cy.wait(5000);
});




describe("The Player profile page", () => {
  it("Logs in and redirect to player profile page", () => {
   
    cy.wait(5000);
    cy.visit("/profile");
    cy.wait(9000);
    cy.screenshot("Player Profile");
  });
});
