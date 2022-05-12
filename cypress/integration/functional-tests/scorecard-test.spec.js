// <reference types="cypress" />
import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { activitiesPage } from "../../support/pageObjects/ActivitiesPage";
import { roundInsightsPage } from "../../support/pageObjects/roundInsightsPage";
import { shotByShotPage } from "../../support/pageObjects/ShotByShotPage";

import { utils } from "../../support/Utilities/Utils";
const { _ } = Cypress;
// Get the credentials
const { TEST_USER_EMAIL: email, TEST_USER_PASSWORD: password } =
  Cypress.env();
var PlayerNameFromActivity,
  roundScore,
  FWHit,
  GIR,
  UpDown,
  Putt,
  avgShotQuality;
var shotQualityOTTonTop,
  shotQualityAPPonTop,
  shotQualityARGonTop,
  shotQualityPUTTonTop,
  totalpar,
  totalscore;
var title, courseName, tee;
var sgOTT, sgAPP, sgARG, sgPUTT;
before(() => {
  cy.login(email, password);
  //by default dashboard screen should be visible
  cy.url().should("include", "/dashboard");
  cy.waitFor(6000);
});
function getSumOfParticularRow(xpathHere) {
  let sum1 = 0,
    sum2 = 0;
  //for par
  return cy.xpath(xpathHere).each(($ele, index, list) => {
    //for first row
    if (index < 9) {
      var val = $ele.text();
      var temp = parseInt(val);
      //ignoring empty cells
      if (!Object.is(parseInt(temp), NaN)) {
        sum1 += temp;
      }
      cy.wrap(sum1, {
        log: false,
      }).as("sumOfFirstRow");
    } else if (index > 9) {
      if (index != 19) {
        var val = $ele.text();
        var temp = parseInt(val);
        //ignoring empty cells
        if (!Object.is(parseInt(temp), NaN)) {
          sum2 += temp;
        }
        cy.wrap(sum2, {
          log: false,
        }).as("sumOfSecondRow");
      }
    }
  });
}
describe("Validating round insights", () => {
  it("Get the data from an activity", { tags: ["@smoke"] }, () => {
    //Click "Activities" from Dashboard
    dashboardPage.activityLink().click();
    utils.waitTillPageLoad();
    //Check the player name is available
    activitiesPage.playerProfileName().should("be.visible");
    activitiesPage
      .playerProfileName()
      .invoke("text")
      .then((text) => {
        PlayerNameFromActivity = text;
        cy.log(PlayerNameFromActivity);
      });
    //Check Round score is available
    activitiesPage.roundScoreValue().should("be.visible");
    //Get the Round Score for an activity
    activitiesPage
      .roundScoreValue()
      .invoke("text")
      .then((text) => {
        roundScore = text;
        cy.log(roundScore);
      });
    //Get the FW Hit for an activity
    activitiesPage
      .fwHitPercentage()
      .invoke("text")
      .then((text) => {
        FWHit = text;
        cy.log(FWHit);
      });
    //Get the GIR for an activity
    activitiesPage
      .girPercentage()
      .invoke("text")
      .then((text) => {
        GIR = text;
        cy.log(GIR);
      });
    //Get the Up/Down for an activity
    activitiesPage
      .up_downPercentage()
      .invoke("text")
      .then((text) => {
        UpDown = text;
        cy.log(UpDown);
      });
    //Get the 1 Putt for an activity
    activitiesPage
      .puttPercentage()
      .invoke("text")
      .then((text) => {
        Putt = text;
        cy.log(Putt);
      });
    //Get the average shot quality for an activity
    activitiesPage
      .avgQualityShot()
      .invoke("text")
      .then((text) => {
        avgShotQuality = text;
        cy.log(avgShotQuality);
      });
    utils.waitTillPageLoad();
  });
  it(
    "Select an activity from list",
    { tags: ["@smoke"] },
    () => {
      //Selecting an activity from list
      activitiesPage.activityCard().click();
      utils.waitTillPageLoad();
    }
  );
  it("Verify Player Name", () => {
    var PlayerNameFromRoundInsights;
    //Verifying Player name after selecting an activity
    roundInsightsPage
      .playerName()
      .invoke("text")
      .then((text) => {
        PlayerNameFromRoundInsights = text;
        cy.log(PlayerNameFromRoundInsights);
        expect(PlayerNameFromRoundInsights).to.eq(PlayerNameFromActivity);
      });
  });
  it("Verify Round Score", { tags: ["@smoke"] }, () => {
    var roundScoreFromRoundInsights;
    //Verifying Round score
    roundInsightsPage
      .roundScore()
      .invoke("text")
      .then((text) => {
        roundScoreFromRoundInsights = text;
        cy.log(roundScoreFromRoundInsights);
        expect(roundScoreFromRoundInsights).to.eq(roundScore);
        cy.go(-1);
      });
  });
  it("Verify FW Hit", () => {
    var FWHitFromRoundInsights;
    activitiesPage
      .fwHitPercentage()
      .invoke("text")
      .then((text) => {
        FWHitFromRoundInsights = text;
        cy.log(FWHitFromRoundInsights);
        expect(FWHitFromRoundInsights).to.eq(FWHit);
      });
  });
  it("Verify GIR", () => {
    var GIRFromRoundInsights;
    //Verifying GIR
    activitiesPage
      .girPercentage()
      .invoke("text")
      .then((text) => {
        GIRFromRoundInsights = text;
        cy.log(GIRFromRoundInsights);
        expect(GIRFromRoundInsights).to.eq(GIR);
      });
  });
  it("Verify Up/Down", () => {
    var upDownFromRoundInsights;
    //Verifying Up/Down
    activitiesPage
      .up_downPercentage()
      .invoke("text")
      .then((text) => {
        upDownFromRoundInsights = text;
        cy.log(upDownFromRoundInsights);
        expect(upDownFromRoundInsights).to.eq(UpDown);
      });
  });
  it("Verify 1 Putt", () => {
    var puttFromRoundInsights;
    //Verifying 1 Putt
    activitiesPage
      .puttPercentage()
      .invoke("text")
      .then((text) => {
        puttFromRoundInsights = text;
        cy.log(puttFromRoundInsights);
        expect(puttFromRoundInsights).to.eq(Putt);
      });
  });
  it("Verify Average Shot Quality", { tags: ["@smoke"] }, () => {
    var avgShotQualityFromRoundInsights;
    //Verifying Average Shot Quality
    activitiesPage
      .avgQualityShot()
      .invoke("text")
      .then((text) => {
        avgShotQualityFromRoundInsights = text;
        cy.log(avgShotQualityFromRoundInsights);
        expect(avgShotQualityFromRoundInsights).to.eq(avgShotQuality);
      });
  });
  it("Get shot quality for OTT, APP, ARG, PUTT from top section", { tags: ["@smoke"] }, () => {
    //getting shot quality from top section for OTT, APP, ARG, PUTT
    activitiesPage
      .ottshotqualitytop()
      .invoke("text")
      .then((text) => {
        shotQualityOTTonTop = text;
      });
    activitiesPage
      .appshotqualitytop()
      .invoke("text")
      .then((text) => {
        shotQualityAPPonTop = text;
      });
    activitiesPage
      .argshotqualitytop()
      .invoke("text")
      .then((text) => {
        shotQualityARGonTop = text;
      });
    activitiesPage
      .puttshotqualitytop()
      .invoke("text")
      .then((text) => {
        shotQualityPUTTonTop = text;
        cy.go(1);
      });
  });
  // to verify total par with final par by adding all PAR values
  it("Sum of total Par", { tags: ["@smoke"] }, () => {

    getSumOfParticularRow(
      "//*[contains(@class,'flex justify-center items-center border-r ')][2]"
    ).then(function () {
      cy.log(this.sumOfFirstRow);
      cy.log(this.sumOfSecondRow);
      cy.log(this.sumOfFirstRow + this.sumOfSecondRow);
      totalpar = this.sumOfFirstRow + this.sumOfSecondRow;
      //  sumscore = text;
      roundInsightsPage.totalpar().then(function (ele) {
        expect(totalpar).to.eq(Number(ele.text()));
      });
    });
  });
  // To verify all total score by adding all score and compare with below alloverscore
  it("Sum of total score", { tags: ["@smoke"] }, () => {
    getSumOfParticularRow(
      "//*[contains(@class,'flex justify-center items-center border-r ')][4]"
    ).then(function () {
      cy.log(this.sumOfFirstRow);
      cy.log(this.sumOfSecondRow);
      cy.log(this.sumOfFirstRow + this.sumOfSecondRow);
      totalscore = this.sumOfFirstRow + this.sumOfSecondRow;
      roundInsightsPage.totalscore().then(function (ele) {
        expect(totalscore).to.eq(Number(ele.text()));
      });
    });
  });
  // verifying player activity scorecard to shot by shot scorecard
  // for score 2
  it(
    "Verify Player activity score card from shot by shot",
    { tags: ["@smoke"] },
    () => {
      cy.xpath("(//*[contains(@class,'flex justify-center items-center bo')])[5]").click();
      roundInsightsPage
        .hole()
        .invoke("text")
        .then(function (hole) {
          roundInsightsPage.shotbyshotholeandpar().then(function (ele) {
            expect(hole).to.eq(ele.text().substring(5, 6));
          });
        });
    }
  );
  it("Verify Player activity score card from shot by shot", () => {
    cy.xpath(
      "(//*[contains(@class,'flex justify-center items-center bo')])[5]"
    ).click();
    roundInsightsPage
      .parscore()
      .invoke("text")
      .then(function (hole) {
        roundInsightsPage.shotbyshotholeandpar().then(function (ele) {
          expect(hole).to.eq(ele.text().substring(12, 13));
        });
      });
  });
  //verifying pards score from shot by shot element
  it("Verify Player activity score card from shot by shot", () => {
    utils.waitTillPageLoad();
    roundInsightsPage.firstroundselection().click();
    roundInsightsPage.scores().then(function (ele) {
      roundScore = ele.text();
      cy.log(roundScore);
    });
    roundInsightsPage.shotbyshotbutton().click();
    utils.waitTillPageLoad();
    roundInsightsPage.shotbyshotscore().then(function (ele) {
      expect(roundScore).to.eq(ele.text());
    });
  });
  it(
    "Verifying all the details of the first shot",
    { tags: ["@smoke"] },
    () => {
      roundInsightsPage.scorecarebutton().click();
      utils.waitTillPageLoad();
      roundInsightsPage.firstroundselection().click();
      var arr = utils.getTextOfAllElements(roundInsightsPage.roundoneshot1());
      roundInsightsPage.shotbyshotbutton().click();
      utils.waitTillPageLoad();
      var shotbyshot = utils.getTextOfAllElements(
        roundInsightsPage.firstshotinscorecardtable()
      ); //12 element
      cy.wrap(shotbyshot)
        .then(() => {
          return [shotbyshot[7], shotbyshot[10], shotbyshot[3]];
        })
        .then((temp) => {
          cy.wrap(arr).each(function ($ele, index, list) {
            console.log(list[2].replace(/(^.+)(\w\d+\w)(.+$)/i, "$2"));
            list[2].replace(/(^.+)(\w\d+\w)(.+$)/i, "$2");
            if (index != 3) {
              if (index == 2) {
                expect(temp).to.contains(
                  $ele.replace(/(^.+)(\w\d+\w)(.+$)/i, "$2")
                );
              } else {
                expect(temp).to.contains($ele.trim());
              }
            }
          });
        });
    }
  );
});