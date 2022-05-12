/// <reference types="Cypress" />
import { activitiesPage } from "../../support/pageObjects/ActivitiesPage";
import { approachPage } from "../../support/pageObjects/AppraochPage";
import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { utils } from "../../support/Utilities/Utils";
import { offTheTeePage } from "../../support/pageObjects/OffTheTeePage";
const { _ } = Cypress;
// Get the credentials
const { TEST_USER_EMAIL: email, TEST_USER_PASSWORD: password } = Cypress.env();
var appQuality, highProximity, lowProximity
var roundScore, holes, avgQualityShot
before(() => {
    cy.login(email, password);
    cy.fixture("playerinformation").then(function (data) {
        this.data = data;
    });
})
describe("validating approach testcase", function () {
    it("Validate the Clippd Menu items ", { tags: ['@smoke'] }, function () {
        dashboardPage.navigateMenuTabs("Off the Tee").click({ force: true })
        cy.url().should("include", "/off-the-tee");
        cy.go('back')
        dashboardPage.navigateMenuTabs("Approach").click({ force: true })
        cy.url().should("include", "/approach");
        cy.go('back')
        dashboardPage.navigateMenuTabs("Around the Green").click({ force: true })
        cy.url().should("include", "/around-the-green");
        cy.go('back')
        dashboardPage.navigateMenuTabs("Putting").click({ force: true })
        cy.url().should("include", "/putting");
        cy.go('back')
        dashboardPage.navigateMenuTabs("Scoring").click({ force: true })
        cy.url().should("include", "/scoring");
        cy.go('back')
        dashboardPage.activityLink().click()
        cy.url().should("include", "/activities");
        cy.go('back')
        utils.waitFor(4000)
    })
    it("Verifying player information on scoring page is correct", function () {
        //first and last name
        utils
            .getElement(offTheTeePage.playerFirstNameLastName)
            .filter(":last")
            .invoke("text")
            .should("be.eq", this.data.firstname + " " + this.data.lastname);
        //player country
        utils
            .getText(offTheTeePage.playerCountry)
            .should("be.eq", this.data.country);
        //player ability
        utils
            .getText(offTheTeePage.playingability)
            .should("be.eq", this.data.playingability);
        utils.waitFor(4000)
    });
    it("Navigating to approach page", function () {
        //getting app quality score from dashboard page
        utils.waitTillPageLoad()
        utils.waitFor(4000)
        dashboardPage.APPquality().then(function (ele) {
            appQuality = ele.text()
        })
        //navigating to approach page
        dashboardPage.navigateMenuTabs("Approach").click()
        cy.url().should('include', '/approach')
        utils.waitTillPageLoad()
        utils.waitFor(4000)
    })
    it("Verifying quality score from dashboard page with approach page", function () {
        //verifying app quality score on approach page
        utils.waitFor(5000)
        approachPage.appPlayerQuality().then(function (ele) {
            expect(appQuality).to.eq(ele.text())
            utils.waitFor(4000)
        })
    })
    it.skip("Getting high and low proximities", function () {
        //getting high proximities values on approach page
        approachPage.proximityValues().eq(0).then(function (ele) {
            highProximity = ele.text()
        })
        //getting low proximities values on approach page
        approachPage.proximityValues().eq(1).then(function (ele) {
            lowProximity = ele.text()
        })
        utils.waitFor(4000)
    })
    it.skip("Verifying proximities values top and bottom quality zones", function () {
        //verifying proximities value on approach page
        approachPage.shotQualityZone().eq(0).then(function (ele) {
            expect(highProximity).to.eq(ele.text())
        })
        approachPage.bottom3Btn().click()
        //verifying proximities value on approach page
        approachPage.shotQualityZone().eq(2).then(function (ele) {
            expect(lowProximity).to.eq(ele.text())
        })
        approachPage.top3Btn().click()
        utils.waitTillPageLoad()
        utils.waitFor(4000)
    })
    it("navigating to scorecard page", function () {
        //navigating to scorecard page
        utils.waitFor(5000)
        approachPage.latestRoundLink().click()
        cy.url().should('include', '/scorecard')
        utils.waitFor(4000)
    })
    it("Getting Round score, holes and Avg shot quality from scorecard page", function () {
        activitiesPage.scoreCardRoundScore().then(function (ele) {
            roundScore = ele.text()
        })
        activitiesPage.scoreCardHoles().then(function (ele) {
            holes = ele.text()
        })
        activitiesPage.avgQualityShotScorecard().then(function (ele) {
            avgQualityShot = ele.text()
        })
        cy.go('back')
        utils.waitFor(4000)
    })
    it('Verifying roundscore, holes and avg shot quality from approach page with scorecard page', function () {
        approachPage.roundScoreValue().then(function (ele) {
            expect(roundScore).to.eq(ele.text().trim())
        })
        approachPage.holesValue().then(function (ele) {
            expect(holes.trim()).to.eq(ele.text().substring(0, 2))
        })
        utils.waitFor(4000)
    })
})