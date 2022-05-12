const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

before(() => {
  cy.login(email, password);
  	//by default dashboard screen should be visible 
	cy.url().should('include', '/dashboard')
});

describe("Activity Details- Grid View", () => {
  it("Logs in and redirect to Activity Details Grid view", () => {

    //clicking on any activty for activity details page
    
      cy.xpath("//a[normalize-space()='Activities']").click()
	  

      //Clicking on grid card view 
      cy.get('.rounded-l-none.bg-white').click({ multiple: true })

      cy.wait(5000);
      cy.screenshot("Activity Details - Grid view");

  })

})
