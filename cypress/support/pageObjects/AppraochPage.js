import { utils } from "../Utilities/Utils"

const playerQuality = "//*[text()='APP Player Quality']/../div/div/span"
const proximity = "//*[text()='Proximity']/../div/p"
const shotQualityZone = "//*[@class='text-xs text-gray-500 text-gray-999 text-base font-medium']"
const bottom3Btn = "//*[text()='Bottom 3']"
const top3Btn = "//*[text()='Top 3']"
const latestRoundLink = "//*[text()='Latest Round']"
const roundScore = "(//*[@class='text-base'])[1]/../../div[2]/div[1]"
const holes = "(//*[@class='text-base flex flex-col'])/div[2]"
const avgShotQuality = "(//*[@class='flex items-center'])[8]/p"

class ApproachPage{
    appPlayerQuality(){
       return cy.xpath(playerQuality)
    }
    proximityValues(){
        return cy.xpath(proximity)
    }
    shotQualityZone(){
        return cy.xpath(shotQualityZone)
    }
    bottom3Btn(){
        return cy.xpath(bottom3Btn)
    }
    top3Btn(){
        return cy.xpath(top3Btn)
    }
    latestRoundLink(){
        return cy.xpath(latestRoundLink)
    }
    roundScoreValue(){
        return cy.xpath(roundScore)
    }
    holesValue(){
        return cy.xpath(holes)
    }
    avgShotQuality(){
        return cy.xpath(avgShotQuality)
    }
}
export const approachPage = new ApproachPage()