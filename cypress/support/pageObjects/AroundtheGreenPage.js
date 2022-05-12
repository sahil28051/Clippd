import {utils} from "../Utilities/Utils"
const playerQuality  ="//*[text()='ARG Player Quality']/../div/div/span";
const upanddown = "//*[text()='Up & Down']/../div/p";
const shotQualityzone= "//*[@class='text-xs text-gray-500 text-gray-999 text-base font-medium']";
const bottom3Btn = "//*[text()='Bottom 3']";
const top3Btn = "//*[text()='Top 3']"
const latestRoundLink = "//p[text()='Latest Round']"
const roundscore = "//div[contains(@class,'text-7.25xl font-medium')]"
const holes = "//div[contains(@class,'text-base flex flex-col')]//div[2]"
const shotscore ="//*[@id='root']/div/main/div/div[2]/div/div/div[2]/div/div/section/section[1]/div[1]/div[2]/div[2]/div[1]/span"
const avgShotQuality = "(//*[@class='flex items-center'])[8]/p"
const testplayer = "//*[contains(@class,'pb-4 sm:p')]"
const argplayerqualitysection = "//*[contains(@class,'border-gray-700 f')]"
const PGATourTopsection = "//*[@id='root']/div/main/div/div[1]/div/div[1]/section[2]/div[2]"
const whatsgoingwellsection = "//*[@id='root']/div/main/div/div[1]/div/div[1]/section[3]/div[1]/div"
const whatsfocuson = "//*[@id='root']/div/main/div/div[1]/div/div[1]/section[3]/div[2]/div"
const faiwayroughsand = "//*[contains(@class,'border-gray-700 lg:')]"
const ARGoverviewsection = "//body//div//section//section[1]"
const ARgscoringzone = "//body//div//section//section[3]"
const ARGshotquality = "//body//div//section//section[2]"
const ARGclubusage = "//body//div//section//section[4]"
const ARGdna = "//body//div//section//section[5]"


class AroundtheGreenPage{
	argPlayerquality(){
		return cy.xpath(playerQuality);
	}

	upanddownValues() {
		return cy.xpath(upanddown);
	}

	shotqualityzone(){
		return cy.xpath(shotQualityzone)
	}
	bottom3Btn() {
		return cy.xpath(bottom3Btn)
	}
	top3Btn(){
		return cy.xpath(top3Btn)
	}

	latestRoundLink(){
		return cy.xpath(latestRoundLink)
	}

	roundscorevalue(){
		return cy.xpath(roundscore)
	}

	holesvalues(){
		return cy.xpath(holes)
	}

	shotscore(){
		return cy.xpath(shotscore)
	}

	avgShotQuality(){
		return cy.xpath(avgShotQuality)
	}
	testplayer(){
		return cy.xpath(testplayer)
	}
	ARGplayerqualitysection(){
		return cy.xpath(argplayerqualitysection)
	}
	PGATourTopsection(){
		return cy.xpath(PGATourTopsection)
	}
	whatsgoingwellsection(){
		return cy.xpath(whatsgoingwellsection)
	}
	whatsfocuson(){
		return cy.xpath(whatsfocuson)
	}
	fairwayroughsand(){
		return cy.xpath(faiwayroughsand)
	}
	ARGoverviewsection(){
		return cy.xpath(ARGoverviewsection)
	}
	ARgscoringzone(){
		return cy.xpath(ARgscoringzone)
	}
	Argsshotquality(){
		return cy.xpath(ARGshotquality)
	}
	Argclubusage(){
		return cy.xpath(ARGclubusage)
	}
	ArgDna(){
		return cy.xpath(ARGdna)
	}



}

export const aroundthegreeen = new AroundtheGreenPage();

