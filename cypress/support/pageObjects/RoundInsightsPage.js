const playerName = ".font-medium.capitalize.text-base.truncate";
const roundScore =
  "//p[@class='flex-1 flex flex-col font-medium text-6.5xl mr-2 xl:text-8.5xl']";
const fwHitPerc = "(//p[@class='text-3xl font-medium'])[1]";
const girPerc = "(//p[@class='text-3xl font-medium'])[2]";
const up_downPerc = "(//p[@class='text-3xl font-medium'])[3]";
const puttPerc = "(//p[@class='text-3xl font-medium'])[4]";
const avgQualityShot = "//h2[text()='Avg Shot Quality']/../div/p";
const ottShotQualityTop =
  "(//*[@class='bar-top-value fill-current font-medium text-xs text-gray-800'])[1]";
const appShotQualityTop =
  "(//*[@class='bar-top-value fill-current font-medium text-xs text-gray-800'])[2]";
const argShotQualityTop =
  "(//*[@class='bar-top-value fill-current font-medium text-xs text-gray-800'])[3]";
const puttShotQualityTop =
  "(//*[@class='bar-top-value fill-current font-medium text-xs text-gray-800'])[4]";
const ottShotQualityTracker = "(//button/span[text()='OTT'])[1]";
const appShotQualityTracker = "(//button/span[text()='APP'])[1]";
const argShotQualityTracker = "(//button/span[text()='ARG'])[1]";
const puttShotQualityTracker = "(//button/span[text()='PUTT'])[1]";
const shotQualityValue =
  "(//*[@class='highlight-text text-xs font-medium'])[1]";
const shotQualitySummary = "(//div[@class='relative inline-block'])[2]/p";
const appBottomBtn = "(//button/span[text()='APP'])[2]";
const argBottomBtn = "(//button/span[text()='ARG'])[2]";
const puttBottomBtn = "(//button/span[text()='PUTT'])[2]";
const editIconBtn = "button:nth-child(2)";
const titleValue = "//div[@class='h-13 mb-4']/p";
const courseName = "//p[@class='text-xs text-secondary truncate']";
const teeText = "(//p[@class='mt-auto text-xs text-secondary'])[1]";
const bestShotsBtn = "(//button[@type='button'])[8]";
const worstShotsBtn = "(//button[@type='button'])[9]";
const shotsSection =
  "//div[@class='flex flex-col items-center select-none w-full h-full pt-3']";
const bestWorstShotQuality = "//p[@class='font-medium text-center text-6xl']";
const shotByShotTab = ".w-full > :nth-child(4) > .flex";
const sgTotalValue = "//div[text()='SG TOTAL']/P";
const bottomSGValue = "//h3[@class='text-base']/../h2";
const scorecardTab = ".ml-4 > .font-normal";

//From Edit module
const titleTextBox = "//input[@name='title']";
const courseTextValue = "#course-search-input";
const teeValue = "(//div[@class='relative ']/button)[1]";
const cancelBtn = "button[data-variant=text]";
const totalpar = "//span[@class='font-medium ml-1']";
const totalscore = "//span[@class='font-medium text-4.5xl lg:text-5.5xl ml-1']";
const hole = "(//div[@class='flex flex-col min-w-table-cell md:w-auto flex-1 bg-gray-50 ']//div)[1]";
const par_score = "(//div[@class='flex flex-col min-w-table-cell md:w-auto flex-1 bg-gray-50 ']//div)[2]"
const yards =
  "(//div[@class='flex flex-col min-w-table-cell md:w-auto flex-1 bg-white ']//div)[8]";
const scores =
  "(//*[contains(@class,'text-3xl')])[9]";
const shotbyshotholeandpar = "//*[contains(@class,'flex')]//h2//span[1]";
const shotbyshotyards = "//span[normalize-space()='360 yds']";
const shotbyshotscore = "(//*[contains(@class,'flex w-full j')])[12]";
//
const ottshotquality = "//h3[normalize-space()='93']";
const appshotquality = "//h3[normalize-space()='54']";
const argshotquality = "//h3[normalize-space()='132']";
const puttscorequality = "//h3[normalize-space()='102']";
// shot by shot comparing to above 4 quality shot from table
const ottshotqualitytable = "//tbody/tr[1]/td[12]/span[1]";
const appshotqualitytable = "//span[normalize-space()='54']";
const argshotqualitytable = "//span[normalize-space()='132']";
const puttshotqualitytable = "//span[normalize-space()='132']";
const first_round_selection = "(//div[contains(@class,'flex justify-center items-center bor')])[1]"
const round_one_shot_1 = "//*[contains(@class,'py-6')][1]//div//p//span[@class='font-medium']"
const shotbyshotbutton = "//*[@id='section-links-navigation']/div/div/ul/li[4]/a"
const first_shot_in_scorecard_table = "(//*[contains(@class,'relative bg')])[1]//td//span"
const scorecard_button = "(//*[contains(@class,'flex justify-center items-center h')])[1]"

class RoundInsightsPage {
  playerName() {
    return cy.get(playerName);
  }
  roundScore() {
    return cy.xpath(roundScore);
  }
  fwHitPercentage() {
    return cy.xpath(fwHitPerc);
  }
  girPercentage() {
    return cy.xpath(girPerc);
  }
  up_downPercentage() {
    return cy.xpath(up_downPerc);
  }
  puttPercentage() {
    return cy.xpath(puttPerc);
  }
  avgQualityShot() {
    return cy.xpath(avgQualityShot);
  }
  ottShotQualityTopSection() {
    return cy.xpath(ottShotQualityTop);
  }
  appShotQualityTopSection() {
    return cy.xpath(appShotQualityTop);
  }
  argShotQualityTopSection() {
    return cy.xpath(argShotQualityTop);
  }
  puttShotQualityTopSection() {
    return cy.xpath(puttShotQualityTop);
  }
  ottShotQualityTracker() {
    return cy.xpath(ottShotQualityTracker);
  }
  appShotQualityTracker() {
    return cy.xpath(appShotQualityTracker);
  }
  argShotQualityTracker() {
    return cy.xpath(argShotQualityTracker);
  }
  puttShotQualityTracker() {
    return cy.xpath(puttShotQualityTracker);
  }
  shotQualityTrackerValue() {
    return cy.xpath(shotQualityValue);
  }
  shotQualitySummary() {
    return cy.xpath(shotQualitySummary);
  }
  appBottomBtn() {
    return cy.xpath(appBottomBtn);
  }
  argBottomBtn() {
    return cy.xpath(argBottomBtn);
  }
  puttBottomBtn() {
    return cy.xpath(puttBottomBtn);
  }
  editBtn() {
    return cy.get(editIconBtn).eq(0);
  }
  titleValue() {
    return cy.xpath(titleValue);
  }
  courseName() {
    return cy.xpath(courseName);
  }
  titleTextBox() {
    return cy.xpath(titleTextBox);
  }
  teeText() {
    return cy.xpath(teeText);
  }
  courseTextValue() {
    return cy.get(courseTextValue);
  }
  teeValue() {
    return cy.xpath(teeValue);
  }
  cancelBtn() {
    return cy.get(cancelBtn);
  }
  bestShotsBtn() {
    return cy.xpath(bestShotsBtn);
  }
  worstShotsBtn() {
    return cy.xpath(worstShotsBtn);
  }
  Best_WorstShotsSection() {
    return cy.xpath(shotsSection);
  }
  bestworstShotQuality() {
    return cy.xpath(bestWorstShotQuality);
  }
  shotByShotTab() {
    return cy.get(shotByShotTab);
  }
  sgValueTop(value) {
    return cy.xpath("//div[text()='" + value + "']/../div[2]");
  }
  sgTotalValue() {
    return cy.xpath(sgTotalValue);
  }
  bottomBtn(value) {
    return cy.xpath(
      "(//button[@data-variant='secondary-group']/span[text()='" +
      value +
      "'])[2]"
    );
  }
  sgValueBottom() {
    return cy.xpath(bottomSGValue);
  }
  scorecardTab() {
    return cy.get(scorecardTab);
  }
  totalpar() {
    return cy.xpath(totalpar);
  }
  totalscore() {
    return cy.xpath(totalscore);
  }
  hole() {
    return cy.xpath(hole);
  }
  parscore() {
    return cy.xpath(par_score);
  }
  yards() {
    return cy.xpath(yards);
  }
  scores() {
    return cy.xpath(scores);
  }
  ottshotquality() {
    return cy.xpath(ottshotquality);
  }
  appshotquality() {
    return cy.xpath(appshotquality);
  }
  argshotquality() {
    return cy.xpath(argshotquality);
  }
  puttscorequality() {
    return cy.xpath(puttscorequality);
  }
  shotbyshotholeandpar() {
    return cy.xpath(shotbyshotholeandpar);
  }
  shotbyshotyards() {
    return cy.xpath(shotbyshotyards);
  }
  shotbyshotscore() {
    return cy.xpath(shotbyshotscore);
  }
  ottshotqualitytable() {
    return cy.xpath(ottshotqualitytable);
  }
  appshotqualitytable() {
    return cy.xpath(appshotqualitytable);
  }
  argshotqualitytable() {
    return cy.xpath(argshotqualitytable);
  }
  puttshotqualitytable() {
    return cy.xpath(puttshotqualitytable);
  }
  firstroundselection() {
    return cy.xpath(first_round_selection);
  }
  roundoneshot1() {
    return round_one_shot_1;
  }
  shotbyshotbutton() {
    return cy.xpath(shotbyshotbutton)
  }
  firstshotinscorecardtable() {
    return first_shot_in_scorecard_table;
  }
  scorecarebutton() {
    return cy.xpath(scorecard_button)
  }
}
export const roundInsightsPage = new RoundInsightsPage();
