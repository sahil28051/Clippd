const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

before(() => {
  cy.login(email, password);
  	//by default dashboard screen should be visible 
	cy.url().should('include', '/dashboard')
  cy.wait(5000);
});

describe("Activity Details- Super Grid view", () => {
  it("Logs in and redirect to Activity Details Super grid view", () => {

    //clicking on any activty for activity details page
    
    cy.xpath("//a[normalize-space()='Activities']").click()

    cy.screenshot("Activity Details - Super Grid view");
 


  })

})