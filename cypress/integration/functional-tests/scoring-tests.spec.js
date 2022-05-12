/// <reference types="Cypress" />
import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { utils } from "../../support/Utilities/Utils";
import { offTheTeePage } from "../../support/pageObjects/OffTheTeePage";
import { scoringPage } from "../../support/pageObjects/ScoringPage";
import { recurse } from "cypress-recurse";

const { _ } = Cypress;

// Get the credentials
//const{   TEST_USER_EMAIL: email,   TEST_USER_PASSWORD: password } = Cypress.env();
const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
    Cypress.env();

before(() => {
    cy.login(email, password);
    //by default dashboard screen should be visible
    cy.url().should("include", "/dashboard");
    utils.waitTillPageLoad();
    cy.fixture("playerinformation").then(function (data) {
        this.data = data;
    });
});

describe("validating scoring-page testcases", function () {
    it("Validate the Clippd Menu items ", { tags: ["@smoke"] }, function () {
        dashboardPage.navigateMenuTabs("Off the Tee").click({ force: true });
        cy.url().should("include", "/off-the-tee");
        cy.go("back");
        dashboardPage.navigateMenuTabs("Approach").click({ force: true });
        cy.url().should("include", "/approach");
        cy.go("back");
        dashboardPage.navigateMenuTabs("Around the Green").click({ force: true });
        cy.url().should("include", "/around-the-green");
        cy.go("back");
        dashboardPage.navigateMenuTabs("Putting").click({ force: true });
        cy.url().should("include", "/putting");
        cy.go("back");
        dashboardPage.navigateMenuTabs("Scoring").click({ force: true });
        cy.url().should("include", "/scoring");
        cy.go("back");
        dashboardPage.activityLink().click();
        cy.url().should("include", "/activities");
        cy.go("back");
        dashboardPage.whatToWorkOn().click();
        cy.url().should("include", "/what-to-work-on");
        cy.go("back");
        utils.waitTillPageLoad()
    });
    it(
        "Verifying if user can navigate to scoring page",
        { tags: ["@smoke"] },
        function () {
            //getting ott quality score from dashboard page expecting it to be grater than 0
            recurse(
                () =>
                    dashboardPage
                        .totalPlayerQuality()
                        .invoke("text")
                        .then(parseInt)
                        .as("PlayerQualityOnDashboard"),
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
            );
            //navigating to Off the Tee page
            dashboardPage.navigateMenuTabs("Scoring").click();

            //verifying if the user navifgates to the scoring page
            cy.url().should("include", "/me/scoring");

            //waiting till the new page/documnet loads completely
            utils.waitTillPageLoad();

            recurse(
                () =>
                    utils
                        .getText(offTheTeePage.roundScoreValue)
                        .then(parseInt)
                        .as("roundScoreValueUnderlatestRound"),
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
            );

            utils
                .getText(offTheTeePage.roundScoreInformation)
                .then(parseInt)
                .as("roundScoreplusMinusvalueUnderlatestRound");
        }
    );

    it("Verifying player information on scoring page is correct", function () {
        //first and last name
        utils
            .getElement(offTheTeePage.playerFirstNameLastName)
            .filter(":last")
            .invoke("text")
            .should("be.eq", "Tester" + " " + "User");
        //player country
        utils
            .getText(offTheTeePage.playerCountry)
            .should("be.eq", this.data.country);
        //player ability
        utils
            .getText(offTheTeePage.playingability)
            .should("be.eq", this.data.playingability);
    });

    it("Verifying player quality on scoring page is same as on the dashboard", function () {
        //verifying app quality score on offthetee page is same as on the dashboard page
        utils
            .getText(offTheTeePage.ottPlayerQuality)
            .then(parseInt)
            .then((TotalplayerQualityOnOScoringPage) => {
                expect(this.PlayerQualityOnDashboard).to.eq(
                    TotalplayerQualityOnOScoringPage
                );
            });
    });

    it("verifying latest round score value under bar chart is same as under latest round section", function () {
        //verifying if round score value is same under bar chart and lastest round section
        offTheTeePage
            .latestRoundScoreUnderBar()
            .then((val) => expect(val).to.eq(this.roundScoreValueUnderlatestRound));

        //verifying if round score info is same under bar chart and lastest round section
        offTheTeePage
            .latestRoundScoreInfoUnderBar()
            .then((val) =>
                expect(val).to.eq(this.roundScoreplusMinusvalueUnderlatestRound)
            );
    });

    it.skip("Verifying whats  going well section - labels", function () {
        cy.contains("Whatʼs Going Well").should("be.visible");
        cy.contains("Avg Shot Q").filter(":first").should("be.visible");
        cy.contains("Avg Score To Par").filter(":first").should("be.visible");
        cy.contains("Positive Impact").should("be.visible");
    });

    it("verifying if Avg shot q value contains only numbers and grater than equal to 0", function () {
        utils
            .getElement(scoringPage.avgShotQValue)
            .filter(":first")
            .invoke("text")
            .then((val) => {
                cy.wrap(val.trim())
                    .should("match", /^[0-9]*$/)
                    .then(parseInt)
                    .should("be.gte", 0);
            });
    });

    //p[@class='text-base font-medium text-white']
    it.skip("Verifying if the par section showin distance in yards", function () {
        utils.getText(scoringPage.parValue).should("contain", "yds");
    });

    it.skip("Verifying if postive impact section is having green color", function () {
        utils
            .getAttribute(offTheTeePage.positiveImpact, "class")
            .then((BootStrapClass) => {
                expect(BootStrapClass).to.include("bg-success");
            });
    });

    ////////////////////////////
    it.skip("Verifying whats to focus on section - labels", function () {
        cy.contains("What to Focus on").should("be.visible");
        cy.contains("Avg Shot Q").filter(":last").should("be.visible");
        cy.contains("Avg Score To Par").filter(":last").should("be.visible");
        cy.contains("Negative Impact").should("be.visible");
    });

    it("verifying if Avg shot q value contains only numbers and grater than equal to 0", function () {
        utils
            .getElement(scoringPage.avgShotQValue)
            .filter(":last")
            .invoke("text")
            .then((val) => {
                cy.wrap(val.trim())
                    .should("match", /^[0-9]*$/)
                    .then(parseInt)
                    .should("be.gte", 0);
            });
    });

    //p[@class='text-base font-medium text-white']
    it("Verifying if the par section showin distance in yards", function () {
        utils.getText(scoringPage.parValue).should("contain", "yds");
    });

    it("Verifying if Negative impact section is having red color", function () {
        utils
            .getAttribute(offTheTeePage.negativeImpact, "class")
            .then((BootStrapClass) => {
                expect(BootStrapClass).to.include("bg-danger");
            });
    });

    it(" verifying if round score value under Scoring overview only contains numbers ", function () {
        //waiting till scoring overview section loads completely
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
        );

        //storing date displayed under latest round section
        utils
            .getText(offTheTeePage.dateUnderLatestRound)
            .as("date_Under_Latest_Round");

        //verifying if round score value only contains numbers
        utils
            .getText(offTheTeePage.roundScoreValue)
            .as("roundScoreValueUnderScoringOverview")
            .then((val) => {
                cy.wrap(val.trim()).should("match", /^[0-9]*$/);
            });
        utils
            .getText(offTheTeePage.roundScoreInformation)
            .then(parseInt)
            .as("roundScoreplusMinusvalue");
    });

    it.skip(" verifying if round score information about progress is correct ", function () {
        //verifying if the round score information displayed is correct
        utils
            .getText(offTheTeePage.roundScoreInformation)
            .then(parseInt)
            .as("roundScoreplusMinusvalue")
            .then((plusMinusvalue) => {
                var roundScore = this.roundScoreValueUnderScoringOverview;
                //cy.log('********' + roundScore);
                /*
                    var s = 79;
                    var final = s-72;
                    var final = final > 0 ? '+'+final : final;
                    console.log(final)
                    */
                var expectedScoreInfo = roundScore - 70;
                expect(plusMinusvalue).to.eq(expectedScoreInfo);
            });
    });

    it("verifying if 18 value is present under latest round ", function () {
        utils.getText(offTheTeePage.HolesLabel).should("contain", "Holes");
    });

    it("verifying latest round score value under bar chart is same as under latest round section", function () {
        //verifying if round score value is same under bar chart and lastest round section
        offTheTeePage
            .latestRoundScoreUnderBar()
            .then((val) =>
                expect(val).to.eq(parseInt(this.roundScoreValueUnderScoringOverview))
            );

        //verifying if round score info is same under bar chart and lastest round section
        offTheTeePage.latestRoundScoreInfoUnderBar().then(function (val) {
            expect(val).to.eq(this.roundScoreplusMinusvalue);
        });
    });

    it("verifying if the latest date is shown under latest round section", function () {
        //verifying if the latest date is shown under latest round section
        utils
            .getElement(offTheTeePage.last5Rounds)
            .filter(":last")
            .invoke("text")
            .should("be.equal", this.date_Under_Latest_Round);
    });

    it("verifying if the total shot quality as per last 5 rounds is same as in the latest round", function () {
        utils
            .getElement(scoringPage.shotQualityOflastFiveRounds)
            .should("have.length", 5)
            .filter(":last")
            .invoke("text")
            .as("shotQualityOflatestFifthRound");
    });

    it("verifying if the shotquality of fifth round is same as displayed under scoring overview", function () {
        utils
            .getText(scoringPage.totalShotQualityUnderScoreoverview)
            .then(function (thatValue) {
                expect(thatValue).to.eq(this.shotQualityOflatestFifthRound);
            });
    });

    it("verifying if OTT APP ARG PUTT values shown under scoring overview are same as displayed on OTT APP ARG PUTT pages", function () {
        dashboardPage.navigateMenuTabs("Off the Tee").click();
        utils.waitTillPageLoad();
        waitTillValueLoadsCompletely(offTheTeePage.OttShotQuality);
        utils
            .getText(offTheTeePage.OttShotQuality)
            .then(parseInt)
            .as("OttShotualityOnOttPage")
            .then(function () {
                dashboardPage.navigateMenuTabs("Approach").click();
                utils.waitTillPageLoad();
                waitTillValueLoadsCompletely(offTheTeePage.OttShotQuality);
                utils
                    .getText(offTheTeePage.OttShotQuality)
                    .then(parseInt)
                    .as("AppShotQualityOnApproachPage")
                    .then(function () {
                        dashboardPage.navigateMenuTabs("Around the Green").click();
                        utils.waitTillPageLoad();
                        waitTillValueLoadsCompletely(offTheTeePage.OttShotQuality);
                        utils
                            .getText(offTheTeePage.OttShotQuality)
                            .then(parseInt)
                            .as("ArgShotQualityOnARGPage");
                    })
                    .then(function () {
                        dashboardPage.navigateMenuTabs("Putting").click();
                        utils.waitTillPageLoad();
                        waitTillValueLoadsCompletely(offTheTeePage.OttShotQuality);
                        utils
                            .getText(offTheTeePage.OttShotQuality)
                            .then(parseInt)
                            .as("PuttShotQualityOnPuttingPage");
                    });
            })
            .then(function () {
                dashboardPage.navigateMenuTabs("Scoring").click();
                utils.waitTillPageLoad();
                cy.wait(5000).then(function () {
                    let shotualitiesOnScoringPage = new Array();

                    var shotQualitiesOnPages = [
                        this.OttShotualityOnOttPage,
                        this.AppShotQualityOnApproachPage,
                        this.ArgShotQualityOnARGPage,
                        this.PuttShotQualityOnPuttingPage,
                    ];

                    shotualitiesOnScoringPage = utils.getTextOfAllElements(
                        scoringPage.shotQualitiesUnderScoreOverview
                    );

                    cy.log(shotQualitiesOnPages);
                    cy.log(shotualitiesOnScoringPage);

                    cy.wrap(shotualitiesOnScoringPage).each(function ($ele, index, list) {
                        var temp = parseInt(shotualitiesOnScoringPage[index]);
                        expect(shotQualitiesOnPages[index]).to.eq(temp);
                    });
                });
            });
    });

    it(" verifying if SG OTT , SG APP, SG ARG ,SG PUTT adds upto SG TOTAL ", function () {
        let sumOfSgValues = 0;
        var sgValues = utils.getTextOfAllElements(
            scoringPage.sgValuesOfLatestRound
        );
        cy.wrap(sgValues)
            .each(function ($ele, index, list) {
                var temp = parseFloat(sgValues[index]);
                sumOfSgValues += temp;
                cy.wrap(sumOfSgValues, {
                    log: false,
                }).as("sumOfAllSgValues");
            })
            .then(function () {
                utils
                    .getText(scoringPage.sgTotal)
                    .then(function (ele) {
                        expect(Number(ele).toFixed(1)).to.eq(this.sumOfAllSgValues.toFixed(1))
                    })
            });
    });

    it.skip(" verifying if Relative Importance of OTT , APP, ARG ,PUTT adds upto 100 % ", function () {
        let totalPercent = 0;
        var relativeImportanceValues = utils.getTextOfAllElements(
            scoringPage.relativeImportanceValues
        );
        cy.wrap(relativeImportanceValues)
            .each(function ($ele, index, list) {
                var temp = parseInt(relativeImportanceValues[index]);
                totalPercent += temp;
                cy.wrap(totalPercent, {
                    log: false,
                }).as("sumOfAllRelativeImportance");
            })
            .then(function () {
                expect(this.sumOfAllRelativeImportance).to.eq(100);
            });
    });

    it(" verifying if Score to Par Trend, Last 20 Rounds section shows graph of 20 elements ", function () {
        utils
            .getElement(scoringPage.scoreToParTrendLast20Rounds)
            .should("have.length", 20);
    });

    it(" verifying if Avg OTT Shot Quality, Last 20 Rounds section shows graph of 20 elements ", function () {
        utils
            .getElement(scoringPage.avgOttShotQualityLast20Rounds)
            .should("have.length", 20);
    });
});

function waitTillValueLoadsCompletely(selector) {
    recurse(
        () => utils.getText(selector).then(parseInt),
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
    );
}
