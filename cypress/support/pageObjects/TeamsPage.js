const card = "(//*[contains(@class,'block mb-1 font-medium text-2xl leadi')])[1]"
const player_name_on_dashboard = "//*[contains(@class,'font-bold capitalize text-2xl truncate')]"

const player_name_on_activities = "//div[contains(@class,'relative border border')][1]//h1"
const activity_name = "(//*[contains(@class,'w-1/2 md:w-auto')])[1]"

const teams_dropdown = "//*[contains(@class,'h-full transition-colors rounded-none text-gray-400 px-4')]"
const player_dropdown_on_dashboard = "//*[contains(@class,'h-full transition-colors rounded-none text-gray-999')]"
const cards_icon_team_02 = "//div[contains(@class,'flex space-x-4 items-cent')]//button[1]//div[1]"
const teams_selection = "(//*[contains(@class,'inline-block w-full pl-4 pr-8 p')])[1]"

const OTT_selection_on_dashboard = "(//*[contains(@class,'text-transparent transition')])[1]"
const Player_name_on_OTT_dashboard = "//*[contains(@class,'font-bold capitalize text-2xl truncate')]"
const OTT_shotquality = "(//*[contains(@class,'border rounded p-3.5 ')])[2]"
const cards_icon_team_01 = "(//*[contains(@class,'mx-1.5 w-6')])[1]"
const heat_map_icon = "(//*[contains(@class,'mx-1.5 w-6')])[2]"
const Player_name_on_heatmap = "(//*[contains(@class,'block mb-1')])[1]"
const show_dropdown = "//*[contains(@class,'flex-grow ml-2 inline-block relative pl-4 ')]"
const player_quality_score = "(//*[contains(@class,'text-xs')])[6]"
const dropdownelements = "//*[(@id='downshift-0-menu')]/li"
class TeamsPage {
    all_cards = "//*[contains(@class,'p-4 flex items-start group hover:bg-gray-50')]"
    number_of_players = "//body//div//strong[1]"
    drop_down = "//*[contains(@class,'flex-grow ml-2 inline-block relative pl-4 ')]"
    Qualty_score_trend = "//*[(text()='Quality Score Trend')]"
    card__player_name = "(//*[contains(@class,'block mb-1 font-medium text-2xl leading-no')])"
    players_dropdown_on_dashboard = "//*[contains(@class,'absolute right-0 max-h-72')]//li"
    card() {
        return cy.xpath(card)
    }
    playername_on_dashboard() {
        return cy.xpath(player_name_on_dashboard)
    }
    player_name_on_activities() {
        return cy.xpath(player_name_on_activities)
    }
    ActivityName() {
        return cy.xpath(activity_name)
    }
    teams_dropdown() {
        return cy.xpath(teams_dropdown)
    }
    teams_selection() {
        return cy.xpath(teams_selection)
    }
    player_dropdown_on_dashboard() {
        return cy.xpath(player_dropdown_on_dashboard)
    }
    cards_icon_team_02() {
        return cy.xpath(cards_icon_team_02)
    }
    OTT_selection_on_dashboard() {
        return cy.xpath(OTT_selection_on_dashboard)
    }
    Player_name_on_dashboard() {
        return cy.xpath(Player_name_on_OTT_dashboard)
    }
    OTT_shotquality() {
        return cy.xpath(OTT_shotquality)
    }
    cards_icon_team_01() {
        return cy.xpath(cards_icon_team_01)
    }
    heat_map_icon() {
        return cy.xpath(heat_map_icon)
    }
    Player_name_on_heatmap() {

        return cy.xpath(Player_name_on_heatmap)
    }
    show_dropdown() {
        return cy.xpath(show_dropdown)
    }
    Qualty_score_trend() {
        return cy.xpath(Qualty_score_trend)
    }
    player_quality_score() {
        return cy.xpath(player_quality_score)
    }
    dropdownelements() {
        return cy.xpath(dropdownelements)
    }
}

export const teamsPage = new TeamsPage();
