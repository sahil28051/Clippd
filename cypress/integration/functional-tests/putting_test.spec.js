/// <reference types="Cypress" />

import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { puttingPage } from "../../support/pageObjects/PuttingPage";
import { utils } from "../../support/Utilities/Utils";

const { _ } = Cypress;
// Get the credentials
const { TEST_USER_EMAIL: email, TEST_USER_PASSWORD: password } =
  Cypress.env();
var userNameDashboard, whatsgoingwell_putt_percentage, focus;
//performance quality from my-profile page
var PUTTquality, date, roundScore, holes, par_score, putt_shot_quality;

before(() => {
  cy.login(email, password);
  //by default dashboard screen should be visible
  cy.url().should('include', '/dashboard')
  cy.wait(5000);
  cy.fixture("playerinformation").then(function (data) {
    this.data = data;
  });
});

describe("validating putting testcase", function () {
  it("Navigating to putting page", { tags: ['@smoke'] }, function () {
    //getting PUTT quality score from dashboard page
    dashboardPage.profileName().then(function (ele) {
      userNameDashboard = ele.text();
    });
    utils.waitFor(3000);
    dashboardPage.PUTTquality().then(function (ele) {
      PUTTquality = Number(ele.text());
    });
    //navigating to putting page and verifying the page
    dashboardPage.navigateMenuTabs("Putting").click();
    cy.url().should("include", "/putting");
    utils.waitFor(5000);
    dashboardPage.profileName().then(function (ele) {
      expect(userNameDashboard).to.eq(ele.text());
    });
  });

  it("Verifying putting score from dashboard page with putting page", { tags: ['@smoke'] }, function () {
    //verifying putting quality score on putting page
    cy.wait(5000);
    puttingPage.puttingqualitycheck().then(function (ele) {
      expect(PUTTquality).to.eq(Number(ele.text()));
    });
  });

  it.skip("Verifying what's going well statitics", { tags: ['@smoke'] }, function () {
    //getting percentage value from What's going well section
    puttingPage.whatsgoingwell_putt_percentage().then(function (ele) {
      whatsgoingwell_putt_percentage = ele.text();
    });

    //Verifying percentage value with the one in the latest round section
    puttingPage.puttscoringzones_top_3().then(function (ele) {
		expect(utils.extractnumber(whatsgoingwell_putt_percentage)).to.eq(Number(utils.extractnumber(ele.text()).toFixed(0)));
    });
  });

  it.skip("Verifying what's to .skip on statitics", { tags: ['@smoke'] }, function () {
    //getting percentage value from What's to focus section
    utils.waitFor(2000);

    puttingPage.What_to_focus_on_putt_percentage().then(function (ele) {
      focus = ele.text();
    });
    utils.waitFor(3000);
    // utils.clickOn(puttingPage.bottom_3);
    puttingPage.bottom_3().click();
    utils.waitFor(4000);
    //Verifying percentage value with the one in the latest round section
    puttingPage.puttscoringzones_bottom_3().then(function (ele) {
      expect(Math.round(Number(focus.substring(0, 2)))).to.eq(
        Math.round(Number(ele.text().substring(0, 4)))
      );
    });
  });

  it("Verifying playing date in the FIRST PUTT graph", { tags: ['@smoke'] }, function () {
    //Getting the playing date from latest round section
    puttingPage.latest_playing_date().then(function (ele) {
      date = ele.text();
    });

    //Verifying value with the latest playing date in the graph
    puttingPage.latest_playing_date_graph().then(function (ele) {
      expect(date).to.eq(ele.text());
      utils.waitFor(4000);
    });
  });

  it("Verifying round score", { tags: ['@smoke'] }, function () {
    //Getting the round score from the latest round section
    puttingPage.roundscore().then(function (ele) {
      roundScore = ele.text();
    });
    //Verifying value with the latest round score in the graph
    puttingPage.latestroundscoreingraph().then(function (ele) {
      expect(roundScore.substring(1, 3)).to.eq(ele.text().substring(0, 2));
    });
  });

  it("Verifying the par score ", { tags: ['@smoke'] }, function () {
    //getting the latest par score
    puttingPage.latestparscore().then(function (ele) {
      par_score = ele.text();
    });

    //Verifying value with the latest round score in the graph

    puttingPage.latestroundscoreingraph().then(function (ele) {
      expect(par_score).to.eq(ele.text().substring(4, 7));
    });
  });

  it("Verifying the PUTT Shot quality", { tags: ['@smoke'] }, function () {
    //getting the latest par score
    puttingPage.latest_putt_shot_quality().then(function (ele) {
      putt_shot_quality = ele.text();
    });

    //Verifying value with the latest round score in the graph

    puttingPage.putt_shot_quality_graph().then(function (ele) {
      expect(putt_shot_quality).to.eq(ele.text());
    });
  });

  it("navigating to scorecard page and validating all the details", { tags: ['@smoke'] }, function () {
    puttingPage.latestholes().then(function (ele) {
      holes = ele.text();
    });
    cy.wait(2000);
    //navigating to scorecard page and verifying all the details again
    puttingPage.latestRoundLink().click();
    cy.url().should("include", "/scorecard");

    cy.wait(2000);
    //Verifying the number of holes in the scorecard page
    puttingPage.holesscorecardpage().then(function (ele) {
      expect(holes).to.eq(ele.text());
    });
    //Verifying the round score in the score card page
    puttingPage.roundscoreinscorecard().then(function (ele) {
      expect(roundScore.substring(1, 3)).to.eq(ele.text().substring(0, 2));
    });
    //Verifying the par score in the score card page
    puttingPage.par_score_scorecard().then(function (ele) {
      expect(par_score).to.eq(ele.text());
    });
  });
});
