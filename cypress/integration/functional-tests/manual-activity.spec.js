/// <reference types="Cypress" />

import { utils } from "../../support/Utilities/Utils";
import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import { offCoursePage } from "../../support/pageObjects/Off_CoursePage";

const { _ } = Cypress;
// Get the credentials
const { TEST_USER_EMAIL: email, TEST_USER_PASSWORD: password } = Cypress.env();
const imageFilePath = 'clippd-logo.png'
// const videoFilePath = 'clippdvideo.mp4'
const fileName = 'clippdvideo.mp4'

before(() => {
    cy.login(email, password);
    //by default dashboard screen should be visible
    cy.url().should('include', '/dashboard')
    cy.wait(5000);
    //Getting activity details from the json file
    cy.fixture('activitydetails').then(function (data) {
        this.data = data
    })
})


describe("Valiting manual-activity", function () {

    it("Navigating to Add activity popup model", { tags: ['@smoke'] }, function () {
        //click on + icon dropdown
        dashboardPage.plusDropdown().click()
        //select add activity option
        dashboardPage.addActivityBtn().click()
    })
    it("Adding manual activity", function () {
        //Adding all the details from json file into the activity model
        dashboardPage.selectActivityType(this.data.type).click()
        dashboardPage.titleTextBox().type(this.data.title)
        dashboardPage.descTextBox().type(this.data.description)
        dashboardPage.locationTextBox().type(this.data.location)
        dashboardPage.selectDateAndTime(this.data.year, this.data.month, this.data.date, this.data.time)
        dashboardPage.durationHourBtn().click()
        dashboardPage.selectHourDuration(this.data.Hour).click()
        dashboardPage.durationMinutesBtn().click()
        dashboardPage.selectMinuteDuration(this.data.Minute).click()
        dashboardPage.notesField().type(this.data.Notes)
        dashboardPage.addMedia(imageFilePath)
        // dashboardPage.addMedia(videoFilePath)
        utils.upload_video(fileName)
        cy.wait(3000)
        dashboardPage.saveActivityBtn().click()
        cy.wait(3000)
        dashboardPage.successMsg().contains('was created successfully. It will now appear in your activity feed.')
    })
    it("Validating newly added activity details on activities off_course page", function () {
        //validating details from json file and on activities/offcourse page
        offCoursePage.activityType().then(function (ele) {
            expect(this.data.type).to.eq(ele.text())
        })
        offCoursePage.activityTitle().then(function (ele) {
            expect(this.data.title).to.eq(ele.text())
        })
        offCoursePage.activityDesc().then(function (ele) {
            expect(this.data.description).to.eq(ele.text())
        })
        offCoursePage.activityNotes().then(function (ele) {
            expect(this.data.Notes).to.eq(ele.text())
        })
        offCoursePage.activityLocation().then(function (ele) {
            expect(this.data.location).to.eq(ele.text())
        })
        offCoursePage.activityDate().then(function (ele) {
            expect(this.data.date + " " + this.data.month + " " + this.data.year.substring(2)).to.eq(ele.text().substring(4))
        })
        offCoursePage.activityTime().then(function (ele) {
            expect(this.data.time).to.eq(ele.text().substring(4))
        })
        offCoursePage.activityDuration().then(function (ele) {
            expect(this.data.Hour + " : " + this.data.Minute).to.eq(ele.text().substring(8))
        })
    })
    it("Navigating to Edit activity popup model", function () {
        //click on Edit button
        offCoursePage.editBtn().click({ force: true })
        cy.wait(1000)
        //navigating to edit activity model
        offCoursePage.editModelLabel().then(function (ele) {
            expect(ele.text()).to.eq('Edit Activity')
        })
    })
    it("Updating Manual activity", function () {
        //Updating all the details on activity from the json file
        dashboardPage.selectActivityType(this.data.typeUpdate).click()
        dashboardPage.titleTextBox().clear().type(this.data.titleUpdate)
        dashboardPage.descTextBox().clear().type(this.data.descriptionUpdate)
        dashboardPage.locationTextBox().clear().type(this.data.locationUpdate)
        dashboardPage.selectDateAndTime(this.data.yearUpdate, this.data.monthUpdate, this.data.dateUpdate, this.data.timeUpdate)
        dashboardPage.durationHourBtn().click()
        dashboardPage.selectHourDuration(this.data.HourUpdate).click()
        dashboardPage.durationMinutesBtn().click()
        dashboardPage.selectMinuteDuration(this.data.MinuteUpdate).click()
        dashboardPage.notesField().clear().type(this.data.NotesUpdate)
        dashboardPage.saveActivityBtn().click()
        dashboardPage.successMsg().contains('was updated successfully.')
    })
    it("Validating updated activity details on activities off_course page", function () {
        //verifying updated details with json file and activity/offsource page
        offCoursePage.activityType().then(function (ele) {
            expect(this.data.typeUpdate).to.eq(ele.text())
        })
        offCoursePage.activityTitle().then(function (ele) {
            expect(this.data.titleUpdate).to.eq(ele.text())
        })
        offCoursePage.activityDesc().then(function (ele) {
            expect(this.data.descriptionUpdate).to.eq(ele.text())
        })
        offCoursePage.activityNotes().then(function (ele) {
            expect(this.data.NotesUpdate).to.eq(ele.text())
        })
        offCoursePage.activityLocation().then(function (ele) {
            expect(this.data.locationUpdate).to.eq(ele.text())
        })
        offCoursePage.activityDate().then(function (ele) {
            expect(this.data.dateUpdate + " " + this.data.monthUpdate + " " + this.data.yearUpdate.substring(2)).to.eq(ele.text().substring(4))
        })
        offCoursePage.activityTime().then(function (ele) {
            cy.log(ele.text())
            expect(this.data.timeUpdate).to.eq(ele.text().substring(4, 11))
        })
        offCoursePage.activityDuration().then(function (ele) {
            expect(this.data.HourUpdate + " : " + this.data.MinuteUpdate).to.eq(ele.text().substring(8, 22))
        })
    })
    it("Deleting the activity", function () {
        //deleting the manual activity
        offCoursePage.editBtn().click()
        cy.wait(1000)
        offCoursePage.deleteBtn().click()
        offCoursePage.yesDeleteBtn().click()
        dashboardPage.successMsg().contains('Your activity is being deleted.')
    })
})