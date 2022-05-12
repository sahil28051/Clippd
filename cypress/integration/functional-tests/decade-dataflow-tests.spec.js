// <reference types="cypress" />
import { dashboardPage } from "../../support/pageObjects/DashBoardPage";
import { utils } from "../../support/Utilities/Utils";
import { activitiesPage } from "../../support/pageObjects/ActivitiesPage";
import { recurse } from "cypress-recurse";
const {} = Cypress;
// Get the credentials
const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();
function loadBefore() {
  before(() => {
    cy.login("test+decade@clippd.io", password);
  });
}
describe("Verifying if Decade present or not ", () => {
  loadBefore();
  it("Verifying if dataflow is decade", () => {
    dashboardPage.activityLink().click();
    utils.waitFor(3000);
    recurse(
      () => cy.xpath("//a[@aria-label='Next page']").invoke("prop", "ariaDisabled"),
      (n) => n === "true",
      {
        limit: 10,
        timeout: 60000,
        delay: 2000,
        log: false,
        post() {
        var arr = new Array();
        arr = utils.getTextOfAllElements("//div[@class='flex flex-row-reverse pr-4']" );
        cy.log(arr)
		
	
		cy.wrap(arr).should('contain','Data: Decade')

		//   .then(function (arr) {
			

		// 	if ("Data: Decade" in arr) {
        //       expect(arr).to.contain("Data: Decade");
        //     }
        //   });

        utils.clickOn("//a[@aria-label='Next page']//*[name()='svg']");
        },
      }
    );
    // utils.validateIfElementExistsInDom("//a[@aria-label='Next page']")
    utils.waitFor(3000);
  });
});
