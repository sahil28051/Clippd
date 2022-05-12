/// <reference types="Cypress" />

import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { activitiesPage } from "../../support/pageObjects/ActivitiesPage";
import { roundInsightsPage } from "../../support/pageObjects/RoundInsightsPage";
import { shotByShotPage } from "../../support/pageObjects/ShotByShotPage";

const { _ } = Cypress;
// Get the credentials
const { TEST_USER_EMAIL: email, TEST_USER_PASSWORD: password } = Cypress.env();

var PlayerNameFromActivity, roundScore, FWHit, GIR, UpDown, Putt, avgShotQuality
var shotQualityOTTonTop, shotQualityAPPonTop, shotQualityARGonTop, shotQualityPUTTonTop
var title, courseName, tee
var sgOTT, sgAPP, sgARG, sgPUTT

before(() => {
  cy.login(email, password);
  //by default dashboard screen should be visible
  cy.url().should('include', '/dashboard')
});

describe("Validating round insights", () => {
  it("Get the data from an activity", { tags: ['@smoke'] }, () => {

    //Click "Activities" from Dashboard 
    dashboardPage.activityLink().click()
    cy.wait(5000)
    //Check the player name is available
    activitiesPage.playerProfileName().should('be.visible')
    activitiesPage.playerProfileName().invoke('text').then((text) => {
      PlayerNameFromActivity = text
      cy.log(PlayerNameFromActivity)
    })
    //Check Round score is available
    activitiesPage.roundScoreValue().should('be.visible')
    //Get the Round Score for an activity
    activitiesPage.roundScoreValue().invoke('text').then((text) => {
      roundScore = text
      cy.log(roundScore)
    })
    //Get the FW Hit for an activity
    activitiesPage.fwHitPercentage().invoke('text').then((text) => {
      FWHit = text
      cy.log(FWHit)
    })

    //Get the GIR for an activity
    activitiesPage.girPercentage().invoke('text').then((text) => {
      GIR = text
      cy.log(GIR)
    })

    //Get the Up/Down for an activity
    activitiesPage.up_downPercentage().invoke('text').then((text) => {
      UpDown = text
      cy.log(UpDown)
    })

    //Get the 1 Putt for an activity
    activitiesPage.puttPercentage().invoke('text').then((text) => {
      Putt = text
      cy.log(Putt)
    })

    //Get the average shot quality for an activity
    activitiesPage.avgQualityShot().invoke('text').then((text) => {
      avgShotQuality = text
      cy.log(avgShotQuality)
    })
    cy.wait(3000)

  });



  it("Select an activity from list", { tags: ['@smoke'] }, () => {
    //Selecting an activity from list 
    activitiesPage.activityCard().click()
    cy.wait(5000)

  });

  it("Click on Round Insights", { tags: ['@smoke'] }, () => {
    //Navigate to Round Insights tab
    activitiesPage.roundInsightsTab().click()
    cy.wait(3000)

  });
  it("Verify Player Name", { tags: ['@smoke'] }, () => {
    var PlayerNameFromRoundInsights
    //Verifying Player name after selecting an activity 
    roundInsightsPage.playerName().invoke('text').then((text) => {
      PlayerNameFromRoundInsights = text
      cy.log(PlayerNameFromRoundInsights)
      expect(PlayerNameFromRoundInsights).to.eq(PlayerNameFromActivity)
    })
  });

  it("Verify Round Score", { tags: ['@smoke'] }, () => {
    var roundScoreFromRoundInsights
    //Verifying Round score
    roundInsightsPage.roundScore().invoke('text').then((text) => {
      roundScoreFromRoundInsights = text
      cy.log(roundScoreFromRoundInsights)
      expect(roundScoreFromRoundInsights).to.eq(roundScore)
    })
  });

  it("Verify FW Hit", { tags: ['@smoke'] }, () => {
    var FWHitFromRoundInsights
    //Verifying FWHit 
    roundInsightsPage.fwHitPercentage().invoke('text').then((text) => {
      FWHitFromRoundInsights = text
      cy.log(FWHitFromRoundInsights)
      expect(FWHitFromRoundInsights).to.eq(FWHit)
    })
  });

  it("Verify GIR", { tags: ['@smoke'] }, () => {
    var GIRFromRoundInsights
    //Verifying GIR 
    roundInsightsPage.girPercentage().invoke('text').then((text) => {
      GIRFromRoundInsights = text
      cy.log(GIRFromRoundInsights)
      expect(GIRFromRoundInsights).to.eq(GIR)
    })
  });

  it("Verify Up/Down", { tags: ['@smoke'] }, () => {
    var upDownFromRoundInsights
    //Verifying Up/Down 
    roundInsightsPage.up_downPercentage().invoke('text').then((text) => {
      upDownFromRoundInsights = text
      cy.log(upDownFromRoundInsights)
      expect(upDownFromRoundInsights).to.eq(UpDown)
    })
  });

  it("Verify 1 Putt", { tags: ['@smoke'] }, () => {
    var puttFromRoundInsights
    //Verifying 1 Putt 
    roundInsightsPage.puttPercentage().invoke('text').then((text) => {
      puttFromRoundInsights = text
      cy.log(puttFromRoundInsights)
      expect(puttFromRoundInsights).to.eq(Putt)
    })
  });

  it("Verify Average Shot Quality", { tags: ['@smoke'] }, () => {
    var avgShotQualityFromRoundInsights
    //Verifying Average Shot Quality
    roundInsightsPage.avgQualityShot().invoke('text').then((text) => {
      avgShotQualityFromRoundInsights = text
      cy.log(avgShotQualityFromRoundInsights)
      expect(avgShotQualityFromRoundInsights).to.eq(avgShotQuality)
    })
  });

  it("Get shot quality for OTT, APP, ARG, PUTT from top section", { tags: ['@smoke'] }, () => {
    //getting shot quality from top section for OTT, APP, ARG, PUTT
    roundInsightsPage.ottShotQualityTopSection().invoke('text').then((text) => {
      shotQualityOTTonTop = text
    })
    roundInsightsPage.appShotQualityTopSection().invoke('text').then((text) => {
      shotQualityAPPonTop = text
    })
    roundInsightsPage.argShotQualityTopSection().invoke('text').then((text) => {
      shotQualityARGonTop = text
    })
    roundInsightsPage.puttShotQualityTopSection().invoke('text').then((text) => {
      shotQualityPUTTonTop = text
    })
  })


  it("Verifying shot quality for OTT, APP, ARG, PUTT with shot quality tracker section", { tags: ['@smoke'] }, () => {
    //verifies top section OTT quality shot with OTT quality tracker
    roundInsightsPage.ottShotQualityTracker().click()
    cy.wait(2000)
    roundInsightsPage.shotQualityTrackerValue().invoke('text').then((text) => {
      cy.log(text)
      expect(shotQualityOTTonTop).to.eq(text)
    })
    //verifies top section APP quality shot with APP quality tracker
    roundInsightsPage.appShotQualityTracker().click()
    cy.wait(2000)
    roundInsightsPage.shotQualityTrackerValue().invoke('text').then((text) => {
      cy.log(text)
      expect(shotQualityAPPonTop).to.eq(text)
    })
    //verifies top section ARG quality shot with ARG quality tracker
    roundInsightsPage.argShotQualityTracker().click()
    cy.wait(2000)
    roundInsightsPage.shotQualityTrackerValue().invoke('text').then((text) => {
      cy.log(text)
      expect(shotQualityARGonTop).to.eq(text)
    })
    //verifies top section PUTT quality shot with PUTT quality tracker
    roundInsightsPage.puttShotQualityTracker().click()
    cy.wait(2000)
    roundInsightsPage.shotQualityTrackerValue().invoke('text').then((text) => {
      cy.log(text)
      expect(shotQualityPUTTonTop).to.eq(text)
    })
  })

  it("Verifying shot quality for OTT, APP, ARG, PUTT with shot quality summary section", { tags: ['@smoke'] }, () => {
    //verifies top section OTT quality shot with OTT quality summary
    roundInsightsPage.shotQualitySummary().invoke('text').then((text) => {
      cy.log(text)
      expect(shotQualityOTTonTop).to.eq(text)
    })
    //verifies top section APP quality shot with APP quality summary
    roundInsightsPage.appBottomBtn().click()
    cy.wait(2000)
    roundInsightsPage.shotQualitySummary().invoke('text').then((text) => {
      cy.log(text)
      expect(shotQualityAPPonTop).to.eq(text)
    })
    //verifies top section ARG quality shot with ARG quality summary
    roundInsightsPage.argBottomBtn().click()
    cy.wait(2000)
    roundInsightsPage.shotQualitySummary().invoke('text').then((text) => {
      cy.log(text)
      expect(shotQualityARGonTop).to.eq(text)
    })
    //verifies top section PUTT quality shot with PUTT quality summary
    roundInsightsPage.puttBottomBtn().click()
    cy.wait(2000)
    roundInsightsPage.shotQualitySummary().invoke('text').then((text) => {
      cy.log(text)
      expect(shotQualityPUTTonTop).to.eq(text)
    })
  })

  it("Get details from round-insights page", { tags: ['@smoke'] }, () => {
    //Getting round-insights details from round-insights page
    roundInsightsPage.titleValue().invoke('text').then((text) => {
      title = text
    })
    roundInsightsPage.courseName().invoke('text').then((text) => {
      courseName = text
    })
    roundInsightsPage.teeText().invoke('text').then((text) => {
      tee = text
    })
  })

  it("Verifying details on edit model", { tags: ['@smoke'] }, () => {
    //verifying round-insights details on edit mode with round-insights page
    var titleName, courseValue, teeData
    roundInsightsPage.editBtn().click()
    cy.wait(5000)
    roundInsightsPage.titleTextBox().then(function (element) {
      titleName = element.prop('value')
      expect(title).to.eq(titleName)
    })
    roundInsightsPage.courseTextValue().then(function (element) {
      courseValue = element.prop('value')
      expect(courseName.includes(courseValue)).to.be.true
    })
    roundInsightsPage.teeValue().then(function (element) {
      teeData = element.text();
      expect(tee.includes(teeData)).to.be.true
    })
    roundInsightsPage.cancelBtn().click()
  })

  it("Verify Best 3 shots is selected by default", { tags: ['@smoke'] }, () => {

    roundInsightsPage.bestShotsBtn().should('be.visible')
    //Check if all 3 shots are visible
    cy.xpath("//div[@class='flex flex-col items-center select-none w-full h-full pt-3']").should('be.visible')
    cy.log('All 3 Best shots are Visible')

  });

  it("Verify user is able to view Worst 3 shots", { tags: ['@smoke'] }, () => {

    //Click on Worst 3 shots
    roundInsightsPage.worstShotsBtn().click()
    //Check if all 3 shots are visible
    roundInsightsPage.Best_WorstShotsSection().should('be.visible')
    cy.log('All 3 Worst shots are Visible')
    roundInsightsPage.bestShotsBtn().click()

  });

  it("Verifying shot quality section", { tags: ['@smoke'] }, function () {
    //checking shot quality section on round insigths page
    roundInsightsPage.Best_WorstShotsSection().should('be.visible')
    cy.log('Shot quality summary are Visible')
  })

  it("Verifying best 3 shots from all screens", { tags: ['@smoke'] }, function () {
    //creating array to store best 3 shots froms round-insights screen
    var bestShotsRIpage = new Array();
    roundInsightsPage.bestworstShotQuality().eq(0).then(function (ele) {
      bestShotsRIpage[0] = Number(ele.text())
    })
    roundInsightsPage.bestworstShotQuality().eq(1).then(function (ele) {
      bestShotsRIpage[1] = Number(ele.text())
    })
    roundInsightsPage.bestworstShotQuality().eq(2).then(function (ele) {
      bestShotsRIpage[2] = Number(ele.text())
    })
    //creating array to store best 3 shots from shot by shot screen
    var bestShotsSbSpage = new Array();
    //clicking on shot by shot tab
    roundInsightsPage.shotByShotTab().click()
    cy.wait(3000)
    shotByShotPage.shotQualityColumnLink().click()
    shotByShotPage.shotQualitiesFromTable().eq(0).then(function (ele) {
      bestShotsSbSpage[0] = Number(ele.text())
    })
    shotByShotPage.shotQualitiesFromTable().eq(1).then(function (ele) {
      bestShotsSbSpage[1] = Number(ele.text())
    })
    shotByShotPage.shotQualitiesFromTable().eq(2).then(function (ele) {
      bestShotsSbSpage[2] = Number(ele.text())
    })
    //comparing 3 best shots from shot-by-shot screen and round-insights screen
    if (JSON.stringify(bestShotsRIpage) == JSON.stringify(bestShotsSbSpage)) {
      expect(true).to.be.true
    }
    else {
      expect(false).to.be.true
    }
  })

  it("Verifying worst 3 shots from all screens", { tags: ['@smoke'] }, function () {
    //creating array to store worst 3 shots froms shot-by-shot screen
    var worstShotsSbSpage = new Array();
    shotByShotPage.shotQualityColumnLink().click()
    shotByShotPage.shotQualitiesFromTable().eq(0).then(function (ele) {
      worstShotsSbSpage[0] = Number(ele.text())
    })
    shotByShotPage.shotQualitiesFromTable().eq(1).then(function (ele) {
      worstShotsSbSpage[1] = Number(ele.text())
    })
    shotByShotPage.shotQualitiesFromTable().eq(2).then(function (ele) {
      worstShotsSbSpage[2] = Number(ele.text())
    })
    //creating array to store worst 3 shots froms round-insights screen
    var worstShotsRIpage = new Array();
    activitiesPage.roundInsightsTab().click()
    cy.wait(6000)
    roundInsightsPage.worstShotsBtn().click()
    roundInsightsPage.bestworstShotQuality().eq(0).then(function (ele) {
      worstShotsRIpage[0] = Number(ele.text())
    })
    roundInsightsPage.bestworstShotQuality().eq(1).then(function (ele) {
      worstShotsRIpage[1] = Number(ele.text())
    })
    roundInsightsPage.bestworstShotQuality().eq(2).then(function (ele) {
      worstShotsRIpage[2] = Number(ele.text())
    })
    //comparing 3 worst shots from shot-by-shot screen and round-insights screen
    if (JSON.stringify(worstShotsRIpage) == JSON.stringify(worstShotsSbSpage)) {
      expect(true).to.be.true
    }
    else {
      expect(false).to.be.true
    }
  })

  it("Getting SG values from Par performance", { tags: ['@smoke'] }, function () {
    //getting each SG values from par performance section
    roundInsightsPage.sgValueTop("SG OTT").then(function (ele) {
      sgOTT = ele.text()
      cy.log(sgOTT)
    })
    roundInsightsPage.sgValueTop("SG APP").then(function (ele) {
      sgAPP = ele.text()
      cy.log(sgAPP)
    })
    roundInsightsPage.sgValueTop("SG ARG").then(function (ele) {
      sgARG = ele.text()
      cy.log(sgARG)
    })
    roundInsightsPage.sgValueTop("SG PUTT").then(function (ele) {
      sgPUTT = ele.text()
      cy.log(sgPUTT)
    })
  })

  it("Verifying SG total value with individual values", { tags: ['@smoke'] }, function () {
    //verifying total SG value with each SG values
    roundInsightsPage.sgTotalValue().then(function (ele) {
      var sgTOTAL = ele.text()
      var sgTotalValue = Number(sgTOTAL)
      var sgValues = Number(Number(sgOTT) + Number(sgAPP) + Number(sgARG) + Number(sgPUTT)).toFixed(2)
      expect(Math.round(sgTotalValue)).to.eq(Math.round(Number(sgValues)))
    })
  })

  it("Verifying each SG values with the dashboards", { tags: ['@smoke'] }, function () {
    //comparing each SG value on both Par performance section and dashboard section
    roundInsightsPage.bottomBtn("OTT").click()
    roundInsightsPage.sgValueBottom().then(function (ele) {
      expect(sgOTT).to.eq(ele.text())
    })
    roundInsightsPage.bottomBtn("APP").click()
    roundInsightsPage.sgValueBottom().then(function (ele) {
      expect(sgAPP).to.eq(ele.text())
    })
    roundInsightsPage.bottomBtn("ARG").click()
    roundInsightsPage.sgValueBottom().then(function (ele) {
      expect(sgARG).to.eq(ele.text())
    })
    roundInsightsPage.bottomBtn("PUTT").click()
    roundInsightsPage.sgValueBottom().then(function (ele) {
      expect(sgPUTT).to.eq(ele.text())
    })
  })

  it("Verify View Scorecard button functionality", { tags: ['@smoke'] }, () => {

    roundInsightsPage.scorecardTab().should('be.visible')
    //Verifying clicking on "View Scorecard"
    roundInsightsPage.scorecardTab().click()
    //verifying user redirects to scorecard page
    cy.url().should('include', '/scorecard')

  });

});

