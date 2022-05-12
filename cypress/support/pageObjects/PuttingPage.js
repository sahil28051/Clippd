const puttingquality = "//*[text()='PUTT Player Quality']/../div/div/span";
const latestRoundLink = "//*[text()='Latest Round']";
const WhatsGoingWell_putt_percentage =
  "(//*[contains(@class,'text-4.5xl font-medium text-white')])[1]";
const putt_scoring_zones_percentage =
  "(//*[@class='text-xs text-gray-500 text-gray-999 text-base font-medium'])[1]";
const putt_scoring_zones_percentage_bottom_3 =
  "(//*[@class='text-xs text-gray-500 text-gray-999 text-base font-medium'])[3]";
const What_to_focus_on_putt_percentage =
  "(//*[contains(@class,'text-4.5xl font-medium text-white')])[2]";

const latest_playing_date = "//p[@class='text-gray-700 opacity-50']";

const latest_play_graph_date = "(//p[@class='text-secondary'])[5]";

const latest_round_score = "//div[@class='text-7.25xl font-medium']";
const latest_round_score_graph =
  "(//span[@class='mr-3 group-hover:underline'])[5]";
const latest_par_score = "//div[@class='text-base flex flex-col']//div[1]";
const latest_holes =
  "//div[contains(@class,'text-base flex flex-col')]//div[2]";
const holes_scorecard_page =
  "//p[@class='text-base text-gray-999 flex leading-none']";
const parscrore_scorecard_page =
  "//*[contains(@class,'block w-8 h-4.5 bg-secondary font')]";
const roundscorescorecard = "//*[contains(@class,'flex-1 flex flex-col font')]";
const puttshotquality_in_graph = "//div[5]//div[1]//div[2]//span[2]";
const latest_putt_shot_quality = "(//*[contains(@class,'absolute top-1')])[5]";
const top_3 = "//*[contains(@class,'border-r-0 rounded-r-none bg-white')]";
const bottom_3 = "//span[normalize-space()='Bottom 3']";
class PuttingPage {
  puttingqualitycheck() {
    return cy.xpath(puttingquality);
  }
  latestRoundLink() {
    return cy.xpath(latestRoundLink);
  }
  whatsgoingwell_putt_percentage() {
    return cy.xpath(WhatsGoingWell_putt_percentage);
  }
  What_to_focus_on_putt_percentage() {
    return cy.xpath(What_to_focus_on_putt_percentage);
  }

  puttscoringzones_top_3() {
    return cy.xpath(putt_scoring_zones_percentage);
  }

  puttscoringzones_bottom_3() {
    return cy.xpath(putt_scoring_zones_percentage_bottom_3);
  }
  latest_playing_date() {
    return cy.xpath(latest_playing_date);
  }
  latest_playing_date_graph() {
    return cy.xpath(latest_play_graph_date);
  }
  roundscore() {
    return cy.xpath(latest_round_score);
  }
  latestroundscoreingraph() {
    return cy.xpath(latest_round_score_graph);
  }
  latestparscore() {
    return cy.xpath(latest_par_score);
  }
  latestholes() {
    return cy.xpath(latest_holes);
  }
  holesscorecardpage() {
    return cy.xpath(holes_scorecard_page);
  }
  par_score_scorecard() {
    return cy.xpath(parscrore_scorecard_page);
  }
  roundscoreinscorecard() {
    return cy.xpath(roundscorescorecard);
  }
  putt_shot_quality_graph() {
    return cy.xpath(puttshotquality_in_graph);
  }
  latest_putt_shot_quality() {
    return cy.xpath(latest_putt_shot_quality);
  }
  top_3() {
    return cy.xpath(top_3);
  }
  bottom_3() {
    return cy.xpath(bottom_3);
  }
}

export const puttingPage = new PuttingPage();
