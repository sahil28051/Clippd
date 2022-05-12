import { utils } from "../../support/Utilities/Utils";

import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { profilePage } from "../../support/pageObjects/ProfilePage";
// import { random } from "cypress/types/lodash";
const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

var v;

before(() => {
  cy.login(email, password);
  //by default dashboard screen should be visible
  cy.url().should('include', '/dashboard')
});
//function to select random  a random element and obtain its text
function getcheckingelement() {

  profilePage.myGolfBagdynamicxpath().then($checkboxes => {
    return Cypress._.sampleSize($checkboxes.toArray(), 1)
  }).click().then(function (ele) {
    v = ele.text().substring(0, 1)
  })
  utils.waitFor(3000);
  profilePage.myBag_savebutton().click();
  utils.waitFor(3000);
}

describe("Validating myBag functional testcases", () => {

  it("navigating to player profile and then to 'My Bag' Page", { tags: ['@smoke'] }, () => {
    dashboardPage.profileName().click();
    //verifying url on my profile page 
    cy.url().should("include", "/profile/my-profile");
    //navigating to myBag page and verifying the url
    profilePage.myBagLink().click();
    cy.url().should("include", "/my-bag");
  });

  it("Verifying drivers", { tags: ['@smoke'] }, () => {
    //Clicking on driver selection option
    profilePage.myBag_driver().click();
    //checking the driver
    profilePage.myBag_checkbox().check().should("be.checked");
    //clicking on save button
    profilePage.myBag_savebutton().click();
    utils.waitFor(4000);
    //Clicking on driver selection option
    profilePage.myBag_driver().click();
    //unchecking the driver
    profilePage.myBag_checkbox().uncheck().should("not.be.checked");
    //clicking on save button
    profilePage.myBag_savebutton().click();
    utils.waitTillPageLoad();
  });
  it("Verifying Fairway Woods", { tags: ['@smoke'] }, () => {
    ////Clicking on Fairway woods selection option
    profilePage.myBag_fairway_woods().click();
    //checking all the Fairway woods options
    profilePage.myBag_checkbox().check().should("be.checked");
    //clicking on save button
    profilePage.myBag_savebutton().click();
    utils.waitFor(2000);

    //Clicking on Fairway woods selection option
    profilePage.myBag_fairway_woods().click();
    //unchecking all the Fairway woods options
    profilePage.myBag_checkbox().uncheck().should("not.be.checked");
    //clicking on save button
    profilePage.myBag_savebutton().click();
    utils.waitFor(3000);
    //Clicking on Fairway woods selection option
    profilePage.myBag_fairway_woods().click();
    utils.waitFor(3000);
    //checking any checkbox randomly and verifying it on the My Bag page 
    getcheckingelement();
    profilePage.myBag_fairway_woods().then(function (ele) {
      expect(v + "W").to.eq(ele.text());
    });
    // utils.waitTillPageLoad();
  });

  it("Verifying Hybrids", { tags: ['@smoke'] }, () => {
    //Clicking on Hybrids selection option 
    profilePage.myBag_Hybrids().click();
    //checking all the Hybrids options
    profilePage.myBag_checkbox().check().should("be.checked");
    //clicking on save button
    profilePage.myBag_savebutton().click();
    utils.waitFor(4000);
    //Clicking on Hybrids selection option 
    profilePage.myBag_Hybrids().click();
    //unchecking all the Hybrids options
    profilePage.myBag_checkbox().uncheck().should("not.be.checked");
    // clicking on save button
    profilePage.myBag_savebutton().click();
    utils.waitFor(3000);
    //Clicking on Hybrids selection option 
    profilePage.myBag_Hybrids().click();
    //checking any checkbox randomly and verifying it on the My Bag page 
    getcheckingelement();
    profilePage.myBag_Hybrids().then(function (ele) {
      expect(v + "H").to.eq(ele.text());
    });
  });

  it("Verifying Irons", { tags: ['@smoke'] }, () => {
    //Clicking on irons selection option 
    profilePage.myBag_Irons().click();
    //checking all the Hybrids options
    profilePage.myBag_checkbox().check().should("be.checked");
    //clicking on save button
    profilePage.myBag_savebutton().click();
    utils.waitFor(4000);
    //Clicking on irons selection option 
    profilePage.myBag_Irons().click();
    //checking all the iron options
    profilePage.myBag_checkbox().uncheck().should("not.be.checked");
    //clicking on save button
    profilePage.myBag_savebutton().click();
    utils.waitFor(3000);
    //Clicking on irons selection option 
    profilePage.myBag_Irons().click();
    //checking any checkbox randomly and verifying it on the My Bag page 
    getcheckingelement();
    profilePage.myBag_Irons().then(function (ele) {
      expect(v + "i").to.eq(ele.text());
    });
  });
  it("Verifying Wedges", { tags: ['@smoke'] }, () => {
    //Clicking on Wedges selection option 
    profilePage.myBag_Wedges().click();
    //checking all the Wedges options
    profilePage.myBag_checkbox().check().should("be.checked");
    //clicking on save button
    profilePage.myBag_savebutton().click();
    utils.waitFor(4000);
    //Clicking on Wedges selection option 
    profilePage.myBag_Wedges().click();
    //unchecking all the Wedges option checkboxes
    profilePage.myBag_checkbox().uncheck().should("not.be.checked");
    //clicking on save button
    profilePage.myBag_savebutton().click();
    utils.waitFor(3000);
    //Clicking on Wedges selection option 
    profilePage.myBag_Wedges().click();
    //checking any checkbox randomly and verifying it on the My Bag page 
    utils.waitFor(3000);
    getcheckingelement();
    profilePage.myBag_Wedges().then(function (ele) {
      expect(v + "W").to.eq(ele.text());
    });
  });
  it("Verifying Putters", { tags: ['@smoke'] }, () => {
    //Clicking on putter selection option
    profilePage.myBag_Putters().click();
    //checking the the putter option 
    profilePage.myBag_checkbox().check().should("be.checked");
    //clicking on save button 
    profilePage.myBag_savebutton().click();
    utils.waitFor(3000);
    //Clicking on putter selection option
    profilePage.myBag_Putters().click();
    //Checking the putter checkbox 
    profilePage.myBag_checkbox().uncheck().should("not.be.checked");
    //Clicking on save button
    profilePage.myBag_savebutton().click();
  });
});
