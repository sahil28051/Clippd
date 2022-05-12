import { utils } from "../Utilities/Utils"

class ScoringPage
{
    avgShotQValue                      = "(//p[text()='Shot Quality']/..//div)";
    parValue                           = "//p[@class='text-base font-medium text-white']";

    shotQualityOflastFiveRounds        = "//div[@class='relative w-4 h-4 mr-1.5']/following-sibling::span";
    totalShotQualityUnderScoreoverview = "(//p[contains(@class,'text-5.5xl')])[5]"
    shotQualitiesUnderScoreOverview    = "//p[contains(@class,'font-medium break-normal text-2xl')]";
    sgValuesOfLatestRound              = "//h2[contains(@class,'text-3xl font-medium md:h-full')]";
    sgTotal                            = "//h2[contains(@class,'text-4.5xl font-medium md:h-full')]";
    relativeImportanceValues           = "//button[contains(@class,'text-white h-7')]"
    scoreToParTrendLast20Rounds        = "//div[@class='h-24']//div[@class='relative h-full w-full']//*[name()='svg']//*[name()='g' and contains(@class,'chart')]//*[name()='g' and contains(@class,'tooltip-tr')]//*[name()='rect']";
    avgOttShotQualityLast20Rounds ="//div[@class='relative w-full h-full']//*[name()='svg']//*[name()='g' and contains(@class,'chart')]//*[name()='g' and contains(@class,'tooltip-tr')]//*[name()='rect']";
    
}

export const scoringPage = new ScoringPage();