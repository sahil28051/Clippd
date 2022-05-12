/// <reference types="Cypress" />

import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { homePage } from "../../support/pageObjects/HomePage"
const { _ } = Cypress;
// Get the credentials
const { TEST_USER_EMAIL: email, TEST_USER_PASSWORD: password } = Cypress.env();
var playerQuality, ottQuality, appQuality, argQuality, puttQuality

before(() => {
    cy.login(email, password);
    //by default dashboard screen should be visible
    cy.url().should('include', '/dashboard')
    cy.wait(5000);
    cy.fixture('playerinformation').then(function (data) {
        this.data = data
    })
})

describe("validating dashboard page", function () {
    it("Validating default navigation page after login", function () {
        //navigate to dashboard page and verifying the url
        cy.url().should('include', '/dashboard')
    })

    it("Validating user info visibilty on dashboard page", { tags: ['@smoke'] }, function () {
        dashboardPage.userInfoSection().should('be.visible')
        dashboardPage.userName().then(function (ele) {
            expect(this.data.firstname + " " + this.data.lastname).to.eq(ele.text())
        })
        dashboardPage.userCountry().then(function (ele) {
            expect(this.data.country).to.eq(ele.text())
        })
        dashboardPage.playingAbility().then(function (ele) {
            expect(this.data.playingability).to.eq(ele.text())
        })
    })

    it("Validating traditional stats section on dashboard page", { tags: ['@smoke'] }, function () {
        dashboardPage.traditionalStats().should('be.visible')
    })
    it("Getting qualities from dashboard page", { tags: ['@smoke'] }, function () {
        dashboardPage.totalPlayerQuality().then(function (ele) {
            playerQuality = ele.text()
        })
        dashboardPage.OTTquality().then(function (ele) {
            ottQuality = ele.text()
        })
        dashboardPage.APPquality().then(function (ele) {
            appQuality = ele.text()
        })
        dashboardPage.ARGquality().then(function (ele) {
            argQuality = ele.text()
        })
        dashboardPage.PUTTquality().then(function (ele) {
            puttQuality = ele.text()
        })
    })

    it("Validating qualities from category quality score and dashboard quality score", { tags: ['@smoke'] }, function () {
        dashboardPage.categoryQualityScore().then(function (ele) {
            expect(playerQuality).to.eq(ele.text())
        })
        dashboardPage.categoryOTT().click({ force: true })
        dashboardPage.categoryQualityScore().then(function (ele) {
            expect(ottQuality).to.eq(ele.text())
        })
        dashboardPage.categoryAPP().click({ force: true })
        dashboardPage.categoryQualityScore().then(function (ele) {
            expect(appQuality).to.eq(ele.text())
        })
        dashboardPage.categoryARG().click({ force: true })
        dashboardPage.categoryQualityScore().then(function (ele) {
            expect(argQuality).to.eq(ele.text())
        })
        dashboardPage.categoryPUTT().click({ force: true })
        dashboardPage.categoryQualityScore().then(function (ele) {
            expect(puttQuality).to.eq(ele.text())
        })
    })

    it("Validating qualities from graph and dashboard quality score", { tags: ['@smoke'] }, function () {
        dashboardPage.categoryPlayerQuality().click({ force: true })
        cy.wait(1000)
        dashboardPage.qualityScoreGraph().then(function (ele) {
            expect(playerQuality).to.eq(ele.text())
        })
        cy.wait(1000)
        dashboardPage.categoryOTT().click({ force: true })
        dashboardPage.qualityScoreGraph().then(function (ele) {
            expect(ottQuality).to.eq(ele.text())
        })
        cy.wait(1000)
        dashboardPage.categoryAPP().click({ force: true })
        dashboardPage.qualityScoreGraph().then(function (ele) {
            expect(appQuality).to.eq(ele.text())
        })
        cy.wait(1000)
        dashboardPage.categoryARG().click({ force: true })
        dashboardPage.qualityScoreGraph().then(function (ele) {
            expect(argQuality).to.eq(ele.text())
        })
        cy.wait(1000)
        dashboardPage.categoryPUTT().click({ force: true })
        dashboardPage.qualityScoreGraph().then(function (ele) {
            expect(puttQuality).to.eq(ele.text())
        })
    })

    it("Validate the Clippd Menu items ", { tags: ['@smoke'] }, function () {
        dashboardPage.navigateMenuTabs("Off the Tee").click({ force: true })
        cy.url().should("include", "/off-the-tee");
        cy.go('back')
		cy.wait(3000)
        dashboardPage.navigateMenuTabs("Approach").click({ force: true })
        cy.url().should("include", "/approach");
        cy.go('back')
		cy.wait(3000)
        dashboardPage.navigateMenuTabs("Around the Green").click({ force: true })
        cy.url().should("include", "/around-the-green");
        cy.go('back')
		cy.wait(3000)
        dashboardPage.navigateMenuTabs("Putting").click({ force: true })
        cy.url().should("include", "/putting");
        cy.go('back')
		cy.wait(3000)
        dashboardPage.navigateMenuTabs("Scoring").click({ force: true })
        cy.url().should("include", "/scoring");
        cy.go('back')
		cy.wait(3000)
        dashboardPage.activityLink().click()
        cy.url().should("include", "/activities");
        cy.go('back')
		cy.wait(3000)
        dashboardPage.whatToWorkOn().click()
        cy.url().should("include", "/what-to-work-on");
        cy.go('back')
		cy.wait(3000)

        // utils.waitTillPageLoad()
    })
    it("Validating navigations from dashboard page", { tags: ['@smoke'] }, function () {
        dashboardPage.navigateMenuTabs("Off the Tee").click()
        cy.go('back')
        dashboardPage.navigateMenuTabs("Approach").click()
        cy.go('back')
        dashboardPage.navigateMenuTabs("Around the Green").click()
        cy.go('back')
        dashboardPage.navigateMenuTabs("Putting").click()
        cy.go('back')
        dashboardPage.navigateMenuTabs("Scoring").click()
        cy.go('back')
        dashboardPage.allActivityLink().click()
        cy.go('back')
    })
})
