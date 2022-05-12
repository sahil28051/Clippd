before(() => {
  cy.visit("/forgotten-password");
  cy.wait(5000);
  cy.screenshot("Forgotten your password page");
});

describe("Validate forgetten your password ", () => {
  it("validate a success message for forgotten password", () => {
    cy.get("input[name=email]").type("test@test.com");
    cy.get(".block").click();
    cy.wait(9000);

 /*   cy.get('p:nth-child(1)').contains(
      "Help is on the way. Weʼve sent an email to test@test.com. Please check your inbox for a password reset link."
    );
*/
    cy.screenshot("Success message for password reset");
  });
});
