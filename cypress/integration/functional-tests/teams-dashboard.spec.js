/// <reference types="Cypress" />


import { utils } from "../../support/Utilities/Utils";
import { teamsPage, TeamsPage } from "../../support/pageObjects/TeamsPage";
import { homePage } from "../../support/pageObjects/HomePage"
import { roundInsightsPage } from "../../support/pageObjects/RoundInsightsPage";
const { _ } = Cypress;
// Get the credentials
const { DEFAULT_COACH_EMAIL: email, DEFAULT_COACH_PASSWORD: password } =
    Cypress.env();
var numberofplayers, Players_list;


before(() => {
    cy.login(email, password);
    cy.wait(5000);
});

describe("Validating Teams Dashboard functional testcases", () => {
    it("Verify if Dashboard page loads successfullly ", { tags: ['@smoke'] }, () => {
        cy.url().should("include", "/teams");
    });
    it("Validating the label for profiles count", { tags: ['@smoke'] }, () => {
        utils.waitTillPageLoad()
        cy.xpath(teamsPage.all_cards).then(function ($arr) {
            cy.wrap($arr.length).as("Cards")
        }).then(function () {
            cy.xpath(teamsPage.number_of_players).then(function (ele) {
                numberofplayers = ele.text();
            }).then(function () {
                expect(this.Cards).to.eq(Number(numberofplayers))
            })
        })
    })
    it("Validating the list of player cards", { tags: ['@smoke'] }, () => {
        utils.waitTillPageLoad()
        var teamsPagecards = utils.getTextOfAllElements(teamsPage.all_cards)
        cy.wrap(teamsPagecards).then(() => {
            return teamsPagecards
        }).then(function ($arr) {
            cy.wrap($arr).as("Cards")
        }).then(function () {
            Players_list = this.Cards.sort()
            cy.log(Players_list)
            if (Players_list == this.Cards) {
                cy.log("list of player cards is in alphabetical order")
                expect(true).to.be.true
            }
            else {
                cy.log("list of player cards is not in alphabetical order")
                expect(false).to.be.false

            }
        })
    })

    it("Validating the dropdown ", { tags: ['@smoke'] }, () => {
        utils.waitTillPageLoad()
        utils.clickOn(teamsPage.drop_down)
        var elements = ["Player Activity", "Quality Score Trend", "None"]
        // var alldropdownelements = utils.getTextOfAllElements("//*[contains(@class,'md:py-2 py-3 flex items-center')]")
        utils.waitFor(3000)
        teamsPage.dropdownelements().then($options => {
            return Cypress._.sampleSize($options.toArray(), 1)
        }).click().then(function (ele) {
            var v = ele.text()
            expect(elements).to.contain(v)
        })
    })

    it("validate clicking a performance metric ", { tags: ['@smoke'] }, () => {
        utils.waitTillPageLoad()
        //Clicking on performance button
        homePage.Performance().click({ force: true })
        // utils.clickOn(homePage.Performance)
        utils.waitFor(3000)
        utils.waitTillPageLoad()
        // Selecting Dashboard option 
        homePage.Dashboard().click({ force: true })
        // verifying if on Dashboard page
        cy.url().should("include", "/dashboard");
        // reverting to Teams Page
        cy.go('back')
		cy.wait(3000)
        homePage.OfftheTee().click({ force: true })
        cy.url().should("include", "/off-the-tee");
        cy.go('back')
		cy.wait(3000)
        homePage.Approach().click({ force: true })
        cy.url().should("include", "/approach");
        cy.go('back')
		cy.wait(3000)
        homePage.Around_the_green().click({ force: true })
        cy.url().should("include", "/around-the-green");
        cy.go('back')
		cy.wait(3000)
        homePage.Putting().click({ force: true })
        cy.url().should("include", "/putting");
        cy.go('back')
		cy.wait(3000)
        homePage.Scoring().click({ force: true })
        cy.url().should("include", "/scoring");
        cy.go('back')
		cy.wait(3000)
        utils.waitTillPageLoad()
    })

    it("Validating clicking the player name", { tags: ['@smoke'] }, () => {
        var H;
        teamsPage.card().should('not.be.disabled').click().then(function (ele) {
            H = ele.text()
        })
        utils.waitTillPageLoad()
        utils.waitFor(6000)
        teamsPage.playername_on_dashboard().then(function ($ele) {
            expect(H).to.eq($ele.text())
        })

    })

    it("Validate clicking the latest activity", { tags: ['@smoke'] }, () => {
        var player
        homePage.Activities().click()
        utils.waitTillPageLoad()
		utils.waitFor(5000)
        teamsPage.player_name_on_activities().click().then(function (ele) {
            player = ele.text()
        })
        utils.waitFor(5000)
        roundInsightsPage.playerName().then(function (ele) {
            expect(player).to.eq(ele.text())
        })
    })

    it("Validate selecting “Quality Score Trend” from the dropdown", { tags: ['@smoke'] }, () => {
        teamsPage.teams_dropdown().click({force:true})//
		cy.wait(5000)
        teamsPage.teams_selection().click({force:true})//navigating to teams page
        utils.waitTillPageLoad()
        //Varifying if Quality Score trend is getting selected
        utils.clickOn(teamsPage.drop_down)
        cy.wait(3000)
        utils.clickOn(teamsPage.Qualty_score_trend)
		cy.wait(4000)
        teamsPage.player_quality_score().should('be.visible')
    })


    it("Validate clicking a player after clicking on heatmap icon", { tags: ['@smoke'] }, () => {
        //Clicking on heatmap on heatmap icon
        var H
        utils.waitFor(4000)
        teamsPage.cards_icon_team_01().click()//Clicking cards section icon 
        teamsPage.heat_map_icon().click()//clicking heatmap icon
        teamsPage.Player_name_on_heatmap().click().then(function (ele) {
            H = ele.text()
        })
        utils.waitFor(4000)
        //Validating clicking the player
        teamsPage.Player_name_on_dashboard().then(function (ele) {
            expect(H).to.eq(ele.text())
        })
    })


    it("Validate clicking a player performance metric", { tags: ['@smoke'] }, () => {
        homePage.Performance().click({ force: true })
        //Selecting all the options in performance 
        //verifying if all  the options lead to the correct pages 
        utils.waitFor(3000)
        utils.waitTillPageLoad()
        // Selecting Dashboard option 
        homePage.Dashboard().click({ force: true })
        // verifying if on Dashboard page
        cy.url().should("include", "/dashboard");
        // reverting to Teams Page
        cy.go('back')
		cy.wait(3000)
        // / Selecting OfftheTee option
        homePage.OfftheTee().click({ force: true })
        cy.url().should("include", "/off-the-tee");
        cy.go('back')
		cy.wait(3000)
        homePage.Approach().click({ force: true })
        cy.url().should("include", "/approach");
        cy.go('back')
		cy.wait(3000)
        homePage.Around_the_green().click({ force: true })
        cy.url().should("include", "/around-the-green");
        cy.go('back')
		cy.wait(3000)
        homePage.Putting().click({ force: true })
        cy.url().should("include", "/putting");
        cy.go('back')
		cy.wait(3000)
        homePage.Scoring().click({ force: true })
        cy.url().should("include", "/scoring");
        cy.go('back')
		cy.wait(3000)
        utils.waitTillPageLoad()
    })

    it("Validate the player dropdown on any dashboard page", { tags: ['@smoke'] }, () => {
        var v
        teamsPage.teams_dropdown().click()//Clicking on team dropdown
        teamsPage.teams_selection().click({ force: true })//navigating to teams page
        utils.waitTillPageLoad()
        utils.waitFor(7000)
        teamsPage.cards_icon_team_02().click()//clicking on player cards icon
        //obtaning the names of the players and storing them in "teamsPageCards"
        var teamsPagecards = utils.getTextOfAllElements(teamsPage.card__player_name)
        teamsPage.card().click()//Clicking on a player 
        cy.go('back')
        teamsPage.card().click()//Clicking on a player to open player dashboard
        utils.waitTillPageLoad()
        teamsPage.player_dropdown_on_dashboard().click()//opening player dropdown
        //obtaining text of all the  active player in the dropdown 
        var x = utils.getTextOfAllElements(teamsPage.players_dropdown_on_dashboard)
        cy.wrap(x).then(() => {
            return x
        }).then((temp) => {
            cy.log(temp)
            cy.wrap(temp).each(($ele, index, list) => {
                expect(teamsPagecards).to.contain($ele)
            })//Verifying if the active players list id same as the one "team dashboard"
        })
    })

    it("Validate selecting any player from the dropdown", { tags: ['@smoke'] }, () => {
        var v
        //clicking on player dropdown on dashboard
		utils.waitFor(5000)
        teamsPage.player_dropdown_on_dashboard().click({ force: true })
        //Selecting a player randomly and obtaining player's name(text)
        cy.xpath(teamsPage.players_dropdown_on_dashboard).then($checkboxes => {
            return Cypress._.sampleSize($checkboxes.toArray(), 1)
        }).click().then(function (ele) {
            v = ele.text()
        })
        //Clicking on Off the tee option
        teamsPage.OTT_selection_on_dashboard().click({ force: true })
        utils.waitTillPageLoad()
        utils.waitFor(5000)
        //Verifying player name on Off the teee dashboard
        teamsPage.Player_name_on_dashboard().then(function (ele) {
            expect(v).to.eq(ele.text())
        })
        //Verifying of Off the tee shot quality is visible
        teamsPage.OTT_shotquality().should("be.visible")

    })

});
