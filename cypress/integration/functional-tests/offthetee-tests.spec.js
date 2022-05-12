/// <reference types="Cypress" />
import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { activitiesPage } from '../../support/pageObjects/ActivitiesPage'
import { utils } from "../../support/Utilities/Utils";
import { offTheTeePage } from "../../support/pageObjects/OffTheTeePage";
import { recurse } from 'cypress-recurse'
const { _ } = Cypress;

// Get the credentials
const
    { TEST_USER_EMAIL: email, TEST_USER_PASSWORD: password } = Cypress.env();

before(() => {
    cy.login(email, password);
    //by default dashboard screen should be visible
    cy.url().should('include', '/dashboard')
    utils.waitTillPageLoad();
    cy.fixture('playerinformation').then(function (data) {
        this.data = data
    })
})

describe("validating off the tee testcases", function () {

    it("Verifying if user can navigate to off the tee page", { tags: ['@smoke'] }, function () {
        //getting ott quality score from dashboard page
        recurse(
            () => dashboardPage.OTTquality().invoke('text').then(parseInt).as('ottQualityOnDashboard'),
            (n) => n > 0,
            {
                limit: 10,
                timeout: 60000,
                delay: 2000,
                log: false,
                post() {
                    cy.wait(3000);
                },
            }
        )
        //navigating to Off the Tee page
        dashboardPage.navigateMenuTabs("Off the Tee").click();

        //verifying if the user navifgates to the off the tee page
        cy.url().should('include', '/off-the-tee');

        //waiting till the new page/documnet loads completely
        utils.waitTillPageLoad();

    })
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
        dashboardPage.whatToWorkOn().click()
        cy.url().should("include", "/what-to-work-on");
        cy.go('back')
        // utils.waitTillPageLoad()
    })

    it("Verifying player information on ott page", { tags: ['@smoke'] }, function () {
        //first and last name
        utils.getElement(offTheTeePage.playerFirstNameLastName)
            .filter(':last')
            .invoke('text')
            .should('be.eq', this.data.firstname + " " + this.data.lastname)
        //player country
        utils.getText(offTheTeePage.playerCountry).should('be.eq', this.data.country);
        //player ability
        utils.getText(offTheTeePage.playingability).should('be.eq', this.data.playingability)
    })

    it("Verifying ott score from dashboard page with ott page", { tags: ['@smoke'] }, function () {
        //verifying app quality score on offthetee page is same as on the dashboard page
        dashboardPage.navigateMenuTabs("Off the Tee").click({ force: true })
        cy.url().should("include", "/off-the-tee");
        utils.waitFor(3000)
        utils.getText(offTheTeePage.ottPlayerQuality).then(parseInt).then((ottQualityOnOffTheTeePage) => {
            expect(this.ottQualityOnDashboard).to.eq(ottQualityOnOffTheTeePage)
        })
    })



    it.skip("Verifying whats going well section - Labels", { tags: ['@smoke'] }, function () {
        //verifying if the label is visible
        utils.getElement(offTheTeePage.whatsGoingWellLabel)
            .should('be.visible')
            .should('have.length', 1);

        //verifying ott par label is displayed under whats going well section
        utils.getElement(offTheTeePage.ottParLabels)
            .should('have.length', 2)
            .filter(':first')
            .should('be.visible');

        //verify ott shot quality label is visible 
        utils.getElement(offTheTeePage.ottShotQualityLabels)
            .filter(':first')
            .should('be.visible')

        //verifying Fw hit labbel is present 
        utils.getElement(offTheTeePage.fwHitlabels)
            .filter(':first')
            .should('be.visible')

        //verifying if positive impact label is present 
        utils.getElement(offTheTeePage.positiveImpact).should('be.visible');

    })

    //separated
    it("Verifying if ott shot quality contains only numbers not text", function () {
        utils.getElement(offTheTeePage.ottShotQualityValues)
            .filter(':first')
            .then(($value) => {
                cy.wrap($value.text()).should('match', /^[0-9]*$/)
            })
    })

    it("verifying if fw hit is having % sign at the end and contains only numbers", function () {
        //verifying if fw hit is having % sign at the end
        //and contains only numbers 
        utils.getElement(offTheTeePage.fwHitValues)
            .filter(':first')
            .invoke('text')
            .then((val) => {
                cy.wrap(val.substr(val, val.length - 1)).should('match', /^[0-9]*$/)
                expect(val.substr(val.length - 1)).to.eq('%');
            })
    })

    it("Verifying if postive impact section is having green color", function () {
        utils.getAttribute(offTheTeePage.positiveImpact, 'class').then((BootStrapClass) => {
            expect(BootStrapClass).to.include('bg-success');
        })
    })



    it("Veryfying What to Focus on section - Labels", function () {
        //verifying if the label is visible
        utils.getElement(offTheTeePage.whatToFocusOnLabel)
            .should('be.visible')
            .should('have.length', 1);

        //verifying ott par label is displayed under whats going well section
        utils.getElement(offTheTeePage.ottParLabels)
            .should('have.length', 2)
            .filter(':last')
            .should('be.visible');

        //verify ott shot quality label is visible 
        utils.getElement(offTheTeePage.ottShotQualityLabels)
            .filter(':last')
            .should('be.visible')

        //verifying Fw hit labbel is present 
        utils.getElement(offTheTeePage.fwHitlabels)
            .filter(':last')
            .should('be.visible')

        //verifying if negative impact label is present 
        utils.getElement(offTheTeePage.negativeImpact).should('be.visible');
    })

    //separated
    it("Verifying if ott shot qulaity contains only numbers not text", function () {
        //verify ott shot qulaity is contains only numbers not text
        utils.getElement(offTheTeePage.ottShotQualityValues)
            .filter(':last')
            .then(($value) => {
                cy.wrap($value.text()).should('match', /^[0-9]*$/)
            })
    })

    it("verifying if fw hit is having % sign at the end and contains only numbers", function () {
        //verifying if fw hit is having % sign at the end
        //and contains only numbers 
        utils.getElement(offTheTeePage.fwHitValues)
            .filter(':last')
            .invoke('text')
            .then((val) => {
                cy.wrap(val.substr(val, val.length - 1)).should('match', /^[0-9]*$/)
                expect(val.substr(val.length - 1)).to.eq('%');
            })
    })

    it("Verifying if negative impact section is having red color", function () {
        // and is having red color 
        utils.getAttribute(offTheTeePage.negativeImpact, 'class').then((BootStrapClass) => {
            expect(BootStrapClass).to.include('bg-danger');
        })
    })


    it("Verifying ott overview section", function () {

        recurse(
            () => utils.getText(offTheTeePage.roundScoreValue).then(parseInt),
            (value) => value > 0 || value != NaN,
            {
                limit: 10,
                timeout: 60000,
                delay: 2000,
                log: false,
                post() {
                    cy.wait(2000);
                },
            }
        )

        //storing date displayed under latest round section
        utils.getText(offTheTeePage.dateUnderLatestRound).as('date_Under_Latest_Round')

        /* utils.getText(offTheTeePage.missLeft).then(parseInt).then(function(missleft)
        {
            utils.getText(offTheTeePage.fwHit).then(parseInt).then(function(fwhit)
            {
                utils.getText(offTheTeePage.missRight).then(parseInt).then(function(missright)
                {
                    var total = missleft + fwhit + missright;
                    //cy.wrap(total).as('Total')
                    return total;
                    // while(total!=100)
                    //  {
                    //       setTimeout(function()
                    //          {
                    //             total=missleft+fwhit+missright;
                    //          }, 2000);
                    //   }
                    //  expect(total).to.eq(100);
                })
            })
        }) */



    })

    it(" verifying if round score value only contains numbers ", function () {
        //verifying if round score value only contains numbers 
        utils.getText(offTheTeePage.roundScoreValue).as('roundScoreValueUnderOttOverview').then((val) => {
            cy.wrap(val.trim()).should('match', /^[0-9]*$/)
        })
    })

    it(" verifying if round score information about progress is correct ", function () {
        //verifying if the round score information displayed is correct 
        utils.getText(offTheTeePage.roundScoreInformation).then(parseInt).as('roundScoreplusMinusvalue').then((plusMinusvalue) => {
            var roundScore = this.roundScoreValueUnderOttOverview;
            //cy.log('********' + roundScore);
            /*
            var s = 79;
            var final = s-72;
            var final = final > 0 ? '+'+final : final;
            console.log(final)
            */
            var expectedScoreInfo = roundScore - 68;
            expect(plusMinusvalue).to.eq(expectedScoreInfo);
        })
    })

    it("verifying if 18 value is present under latest round ", function () {
        utils.getText(offTheTeePage.HolesLabel).should('contain', '18');
    })


    it("verifying if Miss Left, FW Hit, Miss Right to adds to become 100 ", function () {
        //verifying if Miss Left FW Hit Miss Right to adds upto 100
        recurse(
            () => utils.getText(offTheTeePage.missLeft).then(parseInt).then(function (missleft) {
                utils.getText(offTheTeePage.fwHit).then(parseInt).then(function (fwhit) {
                    utils.getText(offTheTeePage.missRight).then(parseInt).then(function (missright) {
                        var total = missleft + fwhit + missright;
                        return total;
                    })
                })
            })
                .then(parseInt).as('totalAfterCompletlyLoading'),
            (value) => value === 100,
            {
                limit: 10,
                timeout: 60000,
                delay: 2000,
                log: false,
                post() {
                    cy.wait(2000);
                },
            })
            .then(() => {
                cy.wrap(this.totalAfterCompletlyLoading).should('eq', 100);
            })
    })

    it("verifying OTT Shot Quality, Last 5 Rounds section showns dates in sorted order ", function () {
        //verifying if 5 rounds are              
        utils.getElement(offTheTeePage.last5Rounds)
            .should('have.length', 5)
            .should('be.visible')
            .then(() => {
                var actualDates = utils.getTextOfAllElements(offTheTeePage.last5Rounds);
                var expectedDates = actualDates.sort(function (a, b) {
                    return a - b
                });
                //verifying if dates are in sorted order
                cy.wrap(actualDates).should("deep.eq", expectedDates);
            })
    })

    it('verifying if the latest date is shown under latest round section', function () {
        //verifying if the latest date is shown under latest round section
        utils.getElement(offTheTeePage.last5Rounds)
            .filter(':last')
            .invoke('text')
            .should('be.equal', this.date_Under_Latest_Round);
    })

    it("verifying latest round score value under bar chart is same as under latest round section", function () {
        //verifying if round score value is same under bar chart and lastest round section
        offTheTeePage.latestRoundScoreUnderBar().then(val => expect(val).to.eq(parseInt(this.roundScoreValueUnderOttOverview)))

        //verifying if round score info is same under bar chart and lastest round section
        offTheTeePage.latestRoundScoreInfoUnderBar().then(val => expect(val).to.eq(this.roundScoreplusMinusvalue))
    })

    it('verifying if on clicking Latest Round link user navigates to activities page', function () {
        utils.clickOn(offTheTeePage.latestRoundLink)
            .then(() => {
                cy.url().should('include', '/me/activities');
            })
        utils.waitTillPageLoad();
    })

    it('verifying if round score value on activities page is same as on the ott page', function () {
        recurse(
            () => utils.getText(activitiesPage.roundScorevalue).then(parseInt),
            (value) => value > 0 || value != NaN,
            {
                limit: 10,
                timeout: 60000,
                delay: 2000,
                log: false,
                post() {
                    cy.wait(1000);
                },
            }
        )

        utils.getText(activitiesPage.roundScorevalue).should('eq', this.roundScoreValueUnderOttOverview.trim());
    })
})
