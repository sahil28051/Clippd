const activitiesLink = "//a[normalize-space()='Activities']";
const plusDropdown = "//div[@class='flex justify-center items-center']"
const addActivity = "(//button[@type='button'])[4]/div"
const titleBox = "//input[@placeholder='Please add title']"
const descriptionBox = "//textarea[@placeholder='Please add description']"
const location = "//input[@placeholder='Add location']"
const notes = "//textarea[@placeholder='How was it?']"
const durationHour = "//button[@id='duration.hours']"
const durationMintues = "//button[@id='duration.minutes']"
const calendar = "//div[@class='react-datepicker-wrapper']"
const yearDropdown = "//button[@id='yearOptions']"
const monthDropdown = "//button[@id='monthOptions']"
const saveActivityBtn = "//button[normalize-space()='Save Activity']"
const successMsg = '.shadow-modal > .flex'
const profileName = "//h1[@class='font-bold capitalize text-2xl truncate']/a";
const totalPlayerQuality = "//*[@class='group flex flex-col items-center']/div/div/span"
const OTTquality = "(//*[text()='OTT'])[1]/../../div[2]/span"
const APPquality = "(//*[text()='APP'])[1]/../../div[2]/span"
const ARGquality = "(//*[text()='ARG'])[1]/../../div[2]/span"
const PUTTquality = "(//*[text()='PUTT'])[1]/../../div[2]/span"
const userInfoSection = "//*[contains(@class,'pseudo-element-abs-hit-box')]/../.."
const userName = "//*[contains(@class,'pseudo-element-abs-hit-box')]"
const userCountry = "//*[contains(@class,'pseudo-element-abs-hit-box')]/../../p"
const playingAbility = "//*[contains(@class,'pseudo-element-abs-hit-box')]/../../div/div/p"
const traditionalStats = "//*[text()='Traditional Stats']/../../div"
const qualityScoreCategory = "(//*[@class='font-medium text-white'])"
const playerQualityCategory = "(//*[contains(@class,'slice-arc transition-colors')])[1]"
const ottCategory = "(//*[contains(@class,'slice-arc transition-colors')])[2]"
const appCategory = "(//*[contains(@class,'slice-arc transition-colors')])[3]"
const argCategory = "(//*[contains(@class,'slice-arc transition-colors')])[4]"
const puttCategory = "(//*[contains(@class,'slice-arc transition-colors')])[5]"
const qualityScoreGraph = "(//*[@class='highlight-text text-xs font-medium'])[2]"
const allActivityLink = "//*[text()='All Activities']"
const refreshDataBtn = "//button[normalize-space()='Refresh Data']"
const focuson = "//button[@aria-label='TO_WORK_ON']";
const whatsGoingWellBtn = "//button[@aria-label='GOING_WELL']";
const whatToWorkOnBtn = "(//*[contains(@class,'flex items-center h-full')])[2]";
const impactSections = "//div[@class='relative rounded-sm border-gray-200 bg-gray-150 h-6']//div[contains(@class,'rounded')]"

class DashboardPage {
    activityLink() {
        return cy.xpath(activitiesLink, { timeout: 10000 })
    }
    plusDropdown() {
        return cy.xpath(plusDropdown)
    }
    addActivityBtn() {
        return cy.xpath(addActivity)
    }
    refreshData() {
        return cy.xpath(refreshDataBtn)
    }
    selectActivityType(value) {
        return cy.xpath("//div[text()='" + value + "']")
    }
    isActivitySelected(text) {
        return cy.xpath("//div[@aria-label='" + text + "']")
    }
    titleTextBox() {
        return cy.xpath(titleBox)
    }
    descTextBox() {
        return cy.xpath(descriptionBox)
    }
    locationTextBox() {
        return cy.xpath(location)
    }
    notesField() {
        return cy.xpath(notes)
    }
    durationHourBtn() {
        return cy.xpath(durationHour)
    }
    durationMinutesBtn() {
        return cy.xpath(durationMintues)
    }
    selectHourDuration(value) {
        return cy.xpath("//div[text()='" + value + "']")
    }
    selectMinuteDuration(value) {
        return cy.xpath("//div[text()='" + value + "']")
    }
    //Selecting date and time for the activity
    selectDateAndTime(year, month, date, time) {
        cy.xpath(calendar).click().then(() => {
            cy.xpath(yearDropdown).click({ force: true })
        }).wait(5000).then(() => {
            cy.xpath("//div[text()='" + year + "']").filter(':last').click({ force: true })
        }).wait(5000).then(() => {
            cy.xpath(monthDropdown).click({ force: true })
        }).wait(5000).then(() => {
            cy.xpath("//div[text()='" + month + "']").filter(':last').click({ force: true })
        }).wait(5000).then(() => {
            cy.xpath("//div[text()='" + date + "']").click({ force: true })
        }).wait(5000).then(() => {
            cy.xpath("//li[text()='" + time + "']").click({ force: true })
        })

    }
    //adding image into the activity
    addMedia(path) {
        cy.xpath("//input[@type='file']").attachFile(path)
    }
    saveActivityBtn() {
        return cy.xpath(saveActivityBtn)
    }
    successMsg() {
        return cy.get(successMsg)
    }

    profileName() {
        return cy.xpath(profileName)
    }
    totalPlayerQuality() {
        return cy.xpath(totalPlayerQuality)
    }
    OTTquality() {
        return cy.xpath(OTTquality)
    }
    APPquality() {
        return cy.xpath(APPquality)
    }
    ARGquality() {
        return cy.xpath(ARGquality)
    }
    PUTTquality() {
        return cy.xpath(PUTTquality)
    }
    userInfoSection() {
        return cy.xpath(userInfoSection)
    }
    userName() {
        return cy.xpath(userName)
    }
    userCountry() {
        return cy.xpath(userCountry)
    }
    playingAbility() {
        return cy.xpath(playingAbility)
    }
    traditionalStats() {
        return cy.xpath(traditionalStats)
    }
    categoryQualityScore() {
        return cy.xpath(qualityScoreCategory)
    }
    categoryPlayerQuality() {
        return cy.xpath(playerQualityCategory)
    }
    categoryOTT() {
        return cy.xpath(ottCategory)
    }
    categoryAPP() {
        return cy.xpath(appCategory)
    }
    categoryARG() {
        return cy.xpath(argCategory)
    }
    categoryPUTT() {
        return cy.xpath(puttCategory)
    }
    qualityScoreGraph() {
        return cy.xpath(qualityScoreGraph)
    }
    navigateMenuTabs(name) {
        return cy.xpath("(//*[text()='" + name + "'])[2]")
    }
    allActivityLink() {
        return cy.xpath(allActivityLink)
    }
    whatTofocus() {
        return cy.xpath(focuson);
    }

    impactsections() {
        return cy.xpath(impactSections, { timeout: 30000 });
    } whatsGoingOnwell() {
        return cy.xpath(whatsGoingWellBtn);
    }
    whatToWorkOn() {
        return cy.xpath(whatToWorkOnBtn);
    }
}

export const dashboardPage = new DashboardPage();