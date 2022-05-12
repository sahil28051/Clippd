/// <reference types ="Cypress"/>

import { activitiesPage } from "../../support/pageObjects/ActivitiesPage";
import { aroundthegreeen } from "../../support/pageObjects/AroundtheGreenPage";
import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { utils } from "../../support/Utilities/Utils";


const { _ } = Cypress;
// Get the credentials
const { TEST_USER_EMAIL: email, TEST_USER_PASSWORD: password } = Cypress.env();
var appQuality;
var roundScore, holes, ShotScore;

before(() => {
  cy.login(email, password)
  //by default dashboard screen should be visible
  cy.url().should('include', '/dashboard')
  cy.wait(5000)
});

describe("validating around the green testcase", function () {
  it("Navigating to around the green page", function () {
    //getting app quality score from dashboard page

    dashboardPage.ARGquality().then(function (ele) {
      appQuality = Number(ele.text());
    });
    //navigating to Around the Green 
    dashboardPage.navigateMenuTabs("Around the Green").click();
    cy.url().should("include", "/around-the-green");
    utils.waitTillPageLoad();
  });
  it("Verifying quality score from dashboard page with around the green page", function () {
    //verifying ARG quality score on approach page
    // utils.waitTillPageLoad();
    aroundthegreeen.argPlayerquality().then(function (ele) {
      expect(appQuality).to.eq(Number(ele.text()));
    });
  });

  it("navigating to scorecard page ", function () {
    //navigating to scorecard page
    utils.waitFor(2000)
    aroundthegreeen.latestRoundLink().click();
    utils.waitTillPageLoad()
    cy.url().should("include", "/scorecard");
    // utils.waitTillPageLoad()
  });

  // to get round score holes and average shots from scoreboard

  it("Getting Round score, holes and Avg shot quality from scorecard page", function () {
    activitiesPage.scoreCardRoundScore().then(function (ele) {
      roundScore = ele.text();
    });
    activitiesPage.scoreCardHoles().then(function (ele) {
      holes = ele.text();
    });
    activitiesPage.parsescore().then(function (ele) {
      ShotScore = ele.text();
    });
    cy.go("back");
    utils.waitTillPageLoad();
  });


  it("Verifying roundscore, holes and avg shot quality from approach page with scorecard page", function () {
    aroundthegreeen.roundscorevalue().then(function (ele) {
      expect(roundScore).to.eq(ele.text().trim());
    });
    aroundthegreeen.holesvalues().then(function (ele) {
      expect(holes.trim()).to.eq(ele.text().substring(0, 2));
    });
    aroundthegreeen.shotscore().then(function (ele) {
      expect(ShotScore).to.eq(ele.text().substring(0, 4));
    });

    // aroundthegreeen.avgShotQuality().then(function (ele) {
    //   expect(avgQualityShot).to.eq(ele.text());
    // });
  });

 
  it('Verify theTEst Player Block is visible', function () {
    aroundthegreeen.testplayer().should("be.visible")
  });

  it('Verify the section of ARG Player Quailty is visible', function () {
    aroundthegreeen.ARGplayerqualitysection().should("be.visible")
  });

  it('Verify PGA Tour section is visible', function () {
    aroundthegreeen.PGATourTopsection().should("be.visible")
  });

  it('Verify Section of Whats going well section visibility', function () {
    aroundthegreeen.whatsgoingwellsection().should("be.visible")
  });

  it('Verify Whats focus on section visibility', function () {
    aroundthegreeen.whatsfocuson().should("be.visible")
  })

  it('Verify blocks of Faiway Roughs and Sand visible', function () {
    aroundthegreeen.fairwayroughsand().should("be.visible")
  })

  it('check the latest round block visibility', function () {
    aroundthegreeen.ARGoverviewsection().should("be.visible")
  })

  it("verifying ARG SCoring zone block visibility", function () {
    aroundthegreeen.ARgscoringzone().should("be.visible")
  })

  it('Verifying ARG Shot Quality block visibiliity', function () {
    aroundthegreeen.Argsshotquality().should("be.visible")
  })

  it("Verifying ARG club Usage", function () {
    aroundthegreeen.Argclubusage().should("be.visible")
  })

  it("Verifying ARG DNA block element", function () {
    aroundthegreeen.ArgDna().should("be.visible")
  })

});




