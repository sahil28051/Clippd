import {
    utils
}
    from '../../support/Utilities/Utils';
const Performance_choices = "//*[contains(@class,'inline-block w-full pl-4 pr-8 py-3 ')]"
const Performance = "//button[@class='h-full transition-colors rounded-none px-4']//span[@class='flex items-center']"
const Dashboard = "(" + Performance_choices + ")" + "[2]"
const Off_the_Tee = "(" + Performance_choices + ")" + "[3]"
const Approach = "(" + Performance_choices + ")" + "[4]"
const Around_the_green = "(" + Performance_choices + ")" + "[5]"
const Putting = "(" + Performance_choices + ")" + "[6]"
const Scoring = "(" + Performance_choices + ")" + "[7]"
const Activities = "(//*[contains(@class,'flex justify-center items-center h-s')])[2]"
class HomePage {
    playerProfileLink = "(//a[@href='/profile/my-profile'])[2]";
    Performance() {
        return cy.xpath(Performance)
    }
    Dashboard() {
        return cy.xpath(Dashboard)
    }
    OfftheTee() {
        return cy.xpath(Off_the_Tee)
    }
    Approach() {
        return cy.xpath(Approach)
    }
    Around_the_green() {
        return cy.xpath(Around_the_green)
    }
    Putting() {
        return cy.xpath(Putting)
    }
    Scoring() {
        return cy.xpath(Scoring)
    }
    Activities() {
        return cy.xpath(Activities)
    }

}

export const homePage = new HomePage();