import { utils } from '../../support/Utilities/Utils'

const playerProfileName = "//div[contains(@class,'relative border border')][3]//h1"
const roundScoreValue = "(//p[@class='flex-1 flex flex-col font-medium text-6.5xl mr-2 xl:text-8.5xl'])[2]"
const fwHitPerc = "(//p[@class='text-3xl font-medium'])[5]"
const girPerc = "(//p[@class='text-3xl font-medium'])[6]"
const up_down = "(//p[@class='text-3xl font-medium'])[7]"
const puttPerc = "(//p[@class='text-3xl font-medium'])[8]"
const avgQualityShot = "(//p[@class='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center font-medium break-normal text-5.5xl'])[2]"
const activitiesCard = "//div[contains(@class,'relative border border')][2]//h1"
const roundInsightsLink = "//a[normalize-space()='Round Insights']"
const scoreCardRoundScore = "//*[text()='Round Score']/../div/p"
const scoreCardHoles = "(//*[text()='Round Score']/../div/div/p)[2]/span"
const avgShotQuality = "(//*[text()='Avg Shot Quality'])/../div/p"
const parsescore = "//*[contains(@class,'block w-8')]"
const ottshotqualitytop =
    "(//*[@class='bar-top-value fill-current font-medium text-xs text-gray-800'])[5]"; //SC
const appshotqualitytop =
    "(//*[@class='bar-top-value fill-current font-medium text-xs text-gray-800'])[6]"; //SC
const argshotqualitytop =
    "(//*[@class='bar-top-value fill-current font-medium text-xs text-gray-800'])[7]"; //SC
const puttshotqualitytop =
    "(//*[@class='bar-top-value fill-current font-medium text-xs text-gray-800'])[4]"; //SC

const calendar = "//div[@class='react-datepicker-wrapper']"
const yearDropdown = "//button[@id='yearOptions']"
const monthDropdown = "//button[@id='monthOptions']"

class ActivitiesPage {

    keyword = "//input[@id='keywords']";
    gridCardView = "//button[@data-index='2']";
    noActivitiesAvailable = "//div[contains(@class,'text-base') and text()='Sorry, no activities available']";
    sortingIcon = "(//button[text()='Quality']//span//*//*)[2]";
    sortingOrder = "//button[text()='Quality']/.."
    qualityColumn = "//td[6]";
    firstActivityLink = "(//a[@class='text-primary hover:underline']//p)[1]";
    editActivityIcon = '.right-4 > .text-3xl';
    deleteActivityBtn = 'button[name="Delete"]';
    yesDeleteBtn = "//button[normalize-space()='Yes, delete']";
    acitivitybeingDeletedToastMsg = "//div[contains(@class,'shadow-modal')]//div[contains(text(),'Your activity is being deleted.')]";
    activityTitleUpdatedSuccesfullyToast = "//div[contains(@class,'shadow-modal')]//div[contains(text(),'was updated successfully.')]";
    roundScorevalue = "//p[@class='flex-1 flex flex-col font-medium text-6.5xl mr-2 xl:text-8.5xl']";

    saveDetailsBtn = "//button[@type='submit']";

    activiityIsBeingUpdated = "//div[contains(@class,'shadow-modal')]//div[contains(text(),'The activity data is being updated')]"

    activityHasBeenUpdated = "//div[contains(@class,'shadow-modal')]//div[contains(text(),'has been updated.')]"
    dateOnFirstActivitylink = "(//p[@class='text-xs text-secondary truncate'])[1]";

    selectTeeDropdown = "(//label[normalize-space()='Select Tee'])[1]";
    selectedTeeValue = "//label[text()='Select Tee']/..//div";
    selectTeeAutosuggestion = "//div[contains(@class,'md:py-2 py-3')]//div";
    teeColourOnFirstActiviyRow = "(//p[contains(text(),'Tee')]//span)[1]";
    selectedDateOnCalendar = "//input[@placeholder]";

    gameTypePractice = "//div[normalize-space()='Practice']";
    gameTypeTournament = "//div[normalize-space()='Tournament']";

    //Weather and course conditions (optional)
    windDropdown = "(//label[normalize-space()='Wind'])[1]";
    rainDropdown = "(//label[normalize-space()='Rain'])[1]";
    fairWayDropdown = "(//label[normalize-space()='Fairway Conditions'])[1]";
    roughDropdown = "(//label[normalize-space()='Rough'])[1]";
    greenSpeed = "(//label[normalize-space()='Green Speed'])[1]";
    tooltipOnFirstRow = '.flex > path:first';
    closeToastMessage = ".ml-auto > .text-3xl";

    closeCourseNameSearch = "//button[@aria-label='Clear search keyword']//*[name()='svg']";
    searchCourseNameInput = '#course-search-input';
    courseNameAutosuggestions = "//li[@role='option']";

    courseNameOnFirstRow = "(//p[@class='text-xs text-secondary truncate'])[1]";
    refreshDataSource = "//input[@name='refreshFromSource']";
    searchCourseName(input) {
        utils.clickOn(this.closeCourseNameSearch);
        utils.clearAndType(this.searchCourseNameInput, input);
        cy.wait(3000);
    }

    selectOptionFromDropdown(option) {
        return cy.xpath("//div[text()='" + option + "' and @class='flex-1']");
    }

    selectRandomAutoSuggestion() {
        return cy.xpath(this.selectTeeAutosuggestion);
    }

    editFirstActivityicon() {
        return cy.get(this.editActivityIcon).filter(':first').invoke('show');
    }

    editActivityTitleWithSomeRandomText() {
        //creating a random title for activity
        let randomTitle = (Math.random() + 1).toString(36).substring(7);
        //removing old title and putting new title 
        utils.clearAndType(this.editTitleTextBox, randomTitle);
        return randomTitle;
    }

    //Selecting date and time for the activity
    selectDateAndTime(year, month, date, time) {
        cy.xpath(calendar).click()
        cy.xpath(yearDropdown).click()
        cy.xpath("//div[text()='" + year + "']").filter(':last').click()
        cy.xpath(monthDropdown).click()
        cy.xpath("//div[text()='" + month + "']").click()
        cy.xpath("//div[text()='" + date + "']").click()
        cy.xpath("//li[text()='" + time + "']").click()
    }


    getAvailableRows(keyword) {
        return cy.xpath("//td[text()='" + keyword + "']");
    }

    toggleSortOrderOfcolumn(columnName) {
        cy.xpath("//button[text()='" + columnName + "']").click();
    }

    getDataFromColumnQuality() {
        return utils.getTextOfAllElements(this.qualityColumn);
    }

    playerProfileName() {
        return cy.xpath(playerProfileName)
    }
    roundScoreValue() {
        return cy.xpath(roundScoreValue)
    }
    fwHitPercentage() {
        return cy.xpath(fwHitPerc)
    }
    girPercentage() {
        return cy.xpath(girPerc)
    }
    up_downPercentage() {
        return cy.xpath(up_down)
    }
    puttPercentage() {
        return cy.xpath(puttPerc)
    }
    avgQualityShot() {
        return cy.xpath(avgQualityShot)
    }
    activityCard() {
        return cy.xpath(activitiesCard)
    }
    roundInsightsTab() {
        return cy.xpath(roundInsightsLink)
    }
    scoreCardRoundScore() {
        return cy.xpath(scoreCardRoundScore)
    }
    scoreCardHoles() {
        return cy.xpath(scoreCardHoles)
    }
    avgQualityShotScorecard() {
        return cy.xpath(avgShotQuality)
    }
    parsescore() {
        return cy.xpath(parsescore)
    }
    ottshotqualitytop() {
        return cy.xpath(ottshotqualitytop);
    }//NTS
    appshotqualitytop() {
        return cy.xpath(appshotqualitytop);
    }//NTS
    argshotqualitytop() {
        return cy.xpath(argshotqualitytop);
    }
    puttshotqualitytop() {
        return cy.xpath(puttshotqualitytop);
    }
}
export const activitiesPage = new ActivitiesPage();