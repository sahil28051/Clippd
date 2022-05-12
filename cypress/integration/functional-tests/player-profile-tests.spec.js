/// <reference types="Cypress" />
import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { profilePage } from "../../support/pageObjects/ProfilePage";
import { utils } from "../../support/Utilities/Utils";
const { _ } = Cypress;
// Get the credentials
const { TEST_USER_EMAIL: email, TEST_USER_PASSWORD: password } = Cypress.env();
var userNameDashboard;
//performance quality from my-profile page
var totalQuality, OTTquality, APPquality, ARGquality, PUTTquality;
const imageFilePath = "clippd-logo.png";
before(() => {
  cy.login(email, password);
  //by default dashboard screen should be visible
  cy.url().should("include", "/dashboard");
  utils.waitTillPageLoad();
  cy.fixture("playerinformation").then(function (data) {
    this.data = data;
  });
});
describe(
  "Validating player profile functional testcases",
  { tags: ["@smoke"] },
  function () {
    it("Navigating to my profile page", function () {
      //getting user name from dashboard page
      dashboardPage.profileName().then(function (ele) {
        userNameDashboard = ele.text();
      });
      dashboardPage.profileName().click();
      //verifying url on my profile page
      cy.url().should("include", "/profile/my-profile");
      //validating name on both dashboard page and my profile page
      profilePage.userName().then(function (ele) {
        expect(userNameDashboard).to.eq(ele.text());
      });
    });
    it("Navigating to edit information model", function () {
      //click on edit icon
      profilePage.editIcon().click();
      //verifying lable information
      profilePage.popupLabel().then(function (ele) {
        expect(ele.text()).to.eq("Edit Information");
      });
      //click on cancel button
      profilePage.cancelBtn().click();
      profilePage.editIcon().click();
      //click on cross icon button
      profilePage.crossIconBtn().click();
      profilePage.editIcon().click();
    });
    it("Editing the player information", function () {
      profilePage.firstname().clear().type(this.data.firstname);
      profilePage.lastname().clear().type(this.data.lastname);
      profilePage.username().clear().type(this.data.username);
      profilePage.selectDateOfBirth(
        this.data.year,
        this.data.month,
        this.data.date
      );
      profilePage.selectGender(this.data.gender);
      profilePage.selectYourPlayingAbility(this.data.playingability);
      profilePage.selectYourCountry(this.data.country);
      profilePage.saveBtn().click();
      utils.waitTillPageLoad();
    });
    it("Validating the updated player information", function () {
      profilePage.editIcon().click();
      profilePage.firstname().then(function (ele) {
        expect(this.data.firstname).to.eq(ele.prop("value"));
      });
      profilePage.lastname().then(function (ele) {
        expect(this.data.lastname).to.eq(ele.prop("value"));
      });
      profilePage.username().then(function (ele) {
        expect(this.data.username).to.eq(ele.prop("value"));
      });
      profilePage.genderText().then(function (ele) {
        expect(this.data.gender).to.eq(ele.text());
      });
      profilePage.playingAbilityText().then(function (ele) {
        expect(this.data.playingability).to.eq(ele.text());
      });
      profilePage.countryText().then(function (ele) {
        expect(this.data.country).to.eq(ele.text());
      });
      profilePage.crossIconBtn().click();
    });
    it("Validating adding and deleting the profile pic", function () {
      profilePage.editIcon().click();
      profilePage.addMedia(imageFilePath);
      profilePage.saveBtn().click({force : true});
      utils.waitFor(2000);
      profilePage.editIcon().click({ force: true });
      utils.waitTillPageLoad()
      profilePage.deleteProfilePicBtn().click({ force: true });
      utils.waitTillPageLoad()
      profilePage.saveBtn().click({ force: true });
      utils.waitTillPageLoad();
    });
    it("Getting performance details from my-profile page", function () {
      profilePage.totalPlayerQualityText().then(function (ele) {
        totalQuality = ele.text();
      });
      profilePage.OTTqualityText().then(function (ele) {
        OTTquality = ele.text();
      });
      profilePage.APPqualityText().then(function (ele) {
        APPquality = ele.text();
      });
      profilePage.ARGqualityText().then(function (ele) {
        ARGquality = ele.text();
      });
      profilePage.PUTTqualityText().then(function (ele) {
        PUTTquality = ele.text();
      });
    });
    it("Verifying performance details from my-profile page with dashboard page", function () {
      //navigating to dashboard page
      profilePage.myPerformanceDashboardLink().click({force:true});
      utils.waitFor(3000);
      dashboardPage.totalPlayerQuality().then(function (ele) {
        expect(totalQuality).to.eq(ele.text());
      });
      dashboardPage.OTTquality().then(function (ele) {
        expect(OTTquality).to.eq(ele.text());
      });
      dashboardPage.APPquality().then(function (ele) {
        expect(APPquality).to.eq(ele.text());
      });
      dashboardPage.ARGquality().then(function (ele) {
        expect(ARGquality).to.eq(ele.text());
      });
      dashboardPage.PUTTquality().then(function (ele) {
        expect(PUTTquality).to.eq(ele.text());
      });
      //navigating back to profile page
      dashboardPage.profileName().click();
    });
    it("Verifying the navigation after clicking on page links", function () {
      //navigating to dashboard page
      profilePage.myPerformanceDashboardLink().click();
      //verifying dashboard url after navigation
      cy.url().should("include", "/dashboard");
      //navigating back to profile page
      cy.go("back");
      //navigating to scoring page
      profilePage.navigation("TOTAL").click();
      //verifying scoring url after navigation
      cy.url().should("include", "/scoring");
      cy.go("back");
      //navigating to off-the-tee page
      profilePage.navigation("OTT").click();
      //verifying ott url after navigation
      cy.url().should("include", "/off-the-tee");
      cy.go("back");
      //navigating to approach page
      profilePage.navigation("APP").click();
      //verifying app url after navigation
      cy.url().should("include", "/approach");
      cy.go("back");
      //navigating to around the ground page
      profilePage.navigation("ARG").click();
      //verifying arg url after navigation
      cy.url().should("include", "/around-the-green");
      cy.go("back");
      //navigating to putting page
      profilePage.navigation("PUTT").click();
      //verifying putt url after navigation
      cy.url().should("include", "/putting");
      cy.go("back");
      //navigating to settings page
      profilePage.settingsLink().click();
      //verifying settings url after navigation
      cy.url().should("include", "settings");
      cy.go("back");
      //navigating to my-bag page
      profilePage.myBagLink().click();
      //verifying my-bag url after navigation
      cy.url().should("include", "my-bag");
    });
  }
);
