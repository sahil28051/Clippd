import { utils } from "../Utilities/Utils"

class OffTheTeePage
{
    playerFirstNameLastName = "//a[@href='/profile/my-profile']";
    playerCountry           = "//p[@class='text-base h-5']";
    playingability          = "//p[@class='text-base text-bold']"

    ottPlayerQuality        = "(//span[contains(@class,'text-6.5xl')])[1]";
    pgaTourTop25            = "(//span[contains(@class,'text-6.5xl')])[2]";
    whatToFocusOnLabel      = "//h2[text()='What to Focus on']";
    whatsGoingWellLabel     = "//h2[text()='Whatʼs Going Well']";
    ottParLabels            = "//p[contains(text(),'OTT Par')]";
    ottShotQualityLabels    = "//p[text()='Shot Quality']"
    ottShotQualityValues    = "//p[text()='Shot Quality']/..//div//p"
    fwHitlabels             = "//p[text()='FW Hit']" 
    fwHitValues             = "//p[text()='FW Hit']/..//div//p"
    positiveImpact          = "//p[normalize-space()='Positive Impact']/..//div//div//div[contains(@class,'h-full')]";
    negativeImpact          = "//p[normalize-space()='Negative Impact']/..//div//div//div[contains(@class,'h-full')]";

    roundScoreValue         = "//div[@class='text-7.25xl font-medium']";
    roundScoreInformation   = "//span[@class='bg-secondary rounded-sm px-2.5']";
    dateUnderLatestRound    = "//p[@class='text-gray-700 opacity-50']";
    HolesLabel              = "//div[@class='text-white  font-medium ']//following-sibling::div";
    missLeft                =       "//div[contains(@class,'full left-0')]//span"    
    fwHit                   =      "//span[contains(@class,'md:text-3xl')]"   
    missRight               =    "//div[contains(@class,'y-full right-0')]//span"     

    latestRoundLink         = "//p[normalize-space()='Latest Round']";
    last5Rounds             = "//a[@class='pseudo-element-abs-hit-box']/following-sibling::p";
    last5RoundsScores        = "//span[@class='mr-3 group-hover:underline']";
    OttShotQuality          = "(//p[contains(@class,'text-5.5xl')])";

    latestRoundScoreUnderBar()
    {
        return cy.xpath(this.last5RoundsScores,{timeout:30000})
                 .should('be.visible')
                 .should('have.length',5)
                 .filter(':last')
                 .then(($latestroundScore) =>
                    {
                        return $latestroundScore.text();
                    })
                 .then((text)=>
                    {
                        var regex            = /^(.*) ?\((.*)/;
                        var matches          = regex.exec(text);
                        var latestroundScore = matches[1];

                        return parseInt(latestroundScore.trim());
                    })
    }

    latestRoundScoreInfoUnderBar()
    {

         return cy.xpath(this.last5RoundsScores,{timeout:30000})
                 .should('be.visible')
                 .should('have.length',5)
                 .filter(':last')
                 .then(($latestroundScore) =>
                    {
                        return $latestroundScore.text();
                    })
                 .then((text)=>
                    {
                        var regex                =  /\((.*)\)/i;
                        var matches              = regex.exec(text);
                        var latestroundScoreInfo = matches[1];

                        return parseInt(latestroundScoreInfo.trim());
                    })
    }
}

export const offTheTeePage = new OffTheTeePage();