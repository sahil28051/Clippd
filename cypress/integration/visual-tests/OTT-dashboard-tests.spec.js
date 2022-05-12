const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
Cypress.env();

before(() => {
cy.login(email, password);
cy.wait(5000);
});

describe("My dashboard page", () => {
  it("Logs in and redirect to  dashboard page", () => {
    
    //Click on Off the Tee
    cy.get('.overflow-x-scroll > .w-full > :nth-child(2) > .flex',{timeout : '3000'}).click()
    cy.wait(4000);
    cy.screenshot("OTT Dashboard responsive test", {
      widths: [375, 992, 1200],
    });
  });
});
