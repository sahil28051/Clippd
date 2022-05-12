/// <reference types="Cypress" />

import { dashboardPage } from "../../support/pageObjects/DashboardPage";
import{ utils } from '../../support/Utilities/Utils'
import{ activitiesPage } from '../../support/pageObjects/ActivitiesPage'
import{ homePage } from '../../support/pageObjects/HomePage'
import{ myProfilePage } from '../../support/pageObjects/MyProfilePage'
// Get the credentials
const
{
    DEFAULT_USER_EMAIL: email,
    DEFAULT_USER_PASSWORD: password
} = Cypress.env();

describe('Data Integration Tests', function()
{

    beforeEach(function()
    {
        cy.login(email, password);
        utils.waitTillPageLoad();
        //Getting integration details from the json file
        cy.fixture('dataintegration').then(function(data)
        {
            this.data = data;
        })
    });

    it('Verifying Trackman Link', function()
    {
        utils.clickOn(homePage.playerProfileLink)
        utils.waitTillPageLoad();
        utils.clickOn(myProfilePage.addLinkBtn);
        utils.getElement(myProfilePage.trackmanSocialShareLink).should('be.visible');
        utils.clickOn(myProfilePage.continueBtn);
        utils.clearAndType(myProfilePage.linkInput, this.data.trackManLink);
        utils.clickOn(myProfilePage.submitBtn);
        cy.contains("Submitting link...").should('be.visible').wait(2000).then(function()
        {
            cy.contains("Report sent for processing").should('be.visible');
        })
        utils.getElement(myProfilePage.linkSentForProcessingToast).should('be.visible');
        utils.getElement(myProfilePage.noActivitiesToLoadToastMsg).should('be.visible');
    });

    it.skip('GolfStatLab data integration tests', function()
    {
        // cy.log(this.data.trackManLink)
        utils.clickOn(homePage.playerProfileLink)
        utils.waitTillPageLoad();


        cy.window().then(function(win)
        {
            const stub = cy.stub(win, 'open').as('openedWindow')
        }).then(function()
        {
            cy.window().then(function(win)
            {
                cy.log('**RedirectUrl**' +" "+ this.openedWindow)
                utils.clickOn(myProfilePage.gflConnectBtn);
                win.location.href = "https://api.golfstatlab.com/v1.1/auth/";
                cy.get('#email',
                {
                    timeout: 10000
                }).type("khukgfjyfyhfk");
            })

        })






        // Do the action in your app like cy.get('.open-window-btn').click()

        // cy.window().its('open').should('be.called')
        // 
        // 



        // cy.wait(5000);
        // // cy.get('@windowOpen',{timeout:10000}).should('be.calledWith',"https://api.golfstatlab.com/v1.1/auth/");
        // cy.get('.font-bold.text-2xl').should('be.visible');
        // //Cypress.$('input[placeholder="Email address"]')
        // // cy.get('input[placeholder="Email address"]').type('hiii');
        // cy.xpath("//input[@placeholder='Email address']").type('hiii');
        // cy.window().then(function(win2)
        // {
        //     expect(4).to.not.eq(5)
        //     expect(this.oldWindow).to.not.eq(win2)
        //     cy.get('#loginId').type('zjvgygjyfg');
        //     // cy.log(win)
        //     // cy.log(win.HTMLTitleElement);
        //     // cy.wait(15000);
        //     // win.location.href = "https://api.golfstatlab.com/v1.1/auth/";
        //     // cy.get('#email',
        //     // {
        //     //     timeout: 10000
        //     // }).type("khukgfjyfyhfk");
        // })

    })

    it('Arccoss data integration tests', function()
    {
        utils.clickOn(homePage.playerProfileLink).then(function()
        {
            utils.waitTillPageLoad();
        })

        cy.wait(5000).then(function()
        {
            utils.validateIfElementExistsInDom(myProfilePage.arccossConnectBtn).then(function(isExist)
            {
                if (isExist)
                {
                    utils.clickOn(myProfilePage.arccossConnectBtn);
                }
                else
                {
                    utils.clickOn(myProfilePage.arccossdisconnectBtn);
                    utils.clickOn(myProfilePage.arccossConnectBtn);
                }

            })
        });
        cy.contains('Connect to Arccos').should('be.visible');
        utils.typeKeys(myProfilePage.emailTextField, this.data.Arccos.userName);
        utils.typeKeys(myProfilePage.passwordTextField, this.data.Arccos.password);
        utils.clickOn(myProfilePage.continueBtn);
        utils.getElement(myProfilePage.arcossConnectedMessaage).should('be.visible')
        utils.getElement(myProfilePage.retrievingDataToast).should('be.visible')
		utils.waitFor(100000)
        utils.getElement(myProfilePage.noActivitiesToLoadToastMsg).should('be.visible')
        utils.getElement(myProfilePage.arcossGreenTick).should('be.visible')
    });

});

