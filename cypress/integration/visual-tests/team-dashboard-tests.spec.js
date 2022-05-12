

const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
Cypress.env();

before(() => {
cy.login(email, password);
cy.wait(5000);
});



describe("The Team dashboard page", () => {
  it("Logs in and redirect to team dashboard page", () => {
    
    cy.wait(5000);

    cy.screenshot("Team Dashboard");
  });
});
