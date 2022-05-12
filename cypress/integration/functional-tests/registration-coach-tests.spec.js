import
{
    registrationPage
}
from "../../support/pageObjects/RegistrationPage";
import
{
    utils
}
from "../../support/Utilities/Utils";

describe('Coach specific Tests', () =>
{
    beforeEach(() =>
    {
        cy.visit("/register-interest",
        {
            timeout: 60000
        });
    });

    it.only('Validate Continue button behaviour after filling info as Coach Page-2', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        //utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('Germany');
        utils.clickOn(registrationPage.continueBtn);
        cy.wait(5000)
        cy.contains('Which golf performance tech do you use?',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it.only('Validate back button behaviour after filling info as Coach Page-2', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('Germany');
        utils.clickOn(registrationPage.backBtn);
        cy.wait(10000)
        cy.contains('Welcome!',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it.only('Validating if progress bar loads upto 20% Page-2', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('Germany');
        utils.clickOn(registrationPage.continueBtn);
        cy.wait(5000)
        cy.contains('Which golf performance tech do you use?',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('20% Complete',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it.only('Validate performance tech options Page-2', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');

        utils.clickOn(registrationPage.continueBtn);
        var options = utils.getTextOfAllElements(registrationPage.perforManceTechOptions);

        cy.wrap(options).should('deep.equal', [

            'Trackman',
            'FlightScope',
            'Foresight',
            'Garmin',
            'BodiTrak',
            'Swing Catalyst',
            'SAM PuttLab',
            'Capto',
            'Decade',
            'Game Forge',
            'GolfStatLab',
            'Other',
            'Nothing'
        ])
    });

    it.only('Validating required filed missing related message Page-2', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('Germany');
        utils.clickOn(registrationPage.continueBtn);
        cy.wait(5000)
        utils.clickOn(registrationPage.continueBtn);
        cy.wait(5000)
        cy.contains('Please select one or more options',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it.only('validate back button behaviour Page-3', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);
        cy.xpath(registrationPage.perforManceTechOptions).random().click();
        utils.clickOn(registrationPage.backBtn);
        cy.wait(5000)
        cy.contains('How would you describe yourself?',
        {
            timeout: 8000
        }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it.only('Validating if progress bar loads upto 40% Page-3', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)
        cy.xpath(registrationPage.perforManceTechOptions).random().click();
        utils.clickOn(registrationPage.continueBtn);
         utils.waitFor(5000)
        cy.contains('40% Complete',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it.only('validate Continue button behaviour Page-3', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)
        cy.xpath(registrationPage.perforManceTechOptions).random().click();
        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)
        cy.contains('Do your players collect on-course data?',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Yes',
        {
            timeout: 20000
        }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)
        cy.contains('Which performance tech do they use?',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

    });

    it.only('verifying if progress bar loads upto 60% Page-4', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);

        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function()
        {
            if (utils.getAttribute("//div[@data-value='Other']", 'aria-selected') === 'true')
            {
                cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
            }
            else
            {
                cy.log('***Other is not selected***')
            }
        });

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        cy.contains('Yes',
        {
            timeout: 20000
        }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.clickOn(registrationPage.continueBtn);

        cy.contains('60% Complete',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

    });

    it.only('Verifying performance tech options Page-5', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function()
        {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected =>
            {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true')
                {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else
                {
                    cy.log('***Other is not selected***')
                }
            });
        });

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        cy.contains('Yes',
        {
            timeout: 20000
        }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.clickOn(registrationPage.continueBtn);

        utils.waitFor(5000)

        cy.contains('Which performance tech do they use?',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        var options = utils.getTextOfAllElements(registrationPage.perforManceTechOptions);

        cy.wrap(options).should('deep.equal', ['Arccos',
            'Garmin',
            'ShotScope',
            'UpGame',
            'Decade',
            'Golf Data Lab',
            'GolfStatLab',
            'Golfmetrics',
            'TheGrint',
            'GameForge',
            'Trackman',
            'FlightScope',
            'Foresight',
            'Rapsodo',
            'V1',
            'Other'
        ])

    });

    it.only('Verifying page objects Page-6', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function()
        {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected =>
            {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true')
                {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else
                {
                    cy.log('***Other is not selected***')
                }
            });
        });

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        cy.contains('Yes',
        {
            timeout: 20000
        }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        cy.xpath(registrationPage.perforManceTechOptions).random().click();

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        cy.contains('How many players do you coach per month?',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        var radioButtons = utils.getTextOfAllElements("//input[@name='playersCoached']/..");
        cy.wrap(radioButtons).should('have.length', 4).should("deep.eq", ['Less than 10', '11 - 20', '21 - 50', 'More than 50']);

        cy.xpath("//input[@name='playersCoached']/..").random().click();

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

    });

    it.only('Validating Page-7', () =>
    {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Coach');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function()
        {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected =>
            {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true')
                {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else
                {
                    cy.log('***Other is not selected***')
                }
            });
        });

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        cy.contains('Yes',
        {
            timeout: 20000
        }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        cy.xpath(registrationPage.perforManceTechOptions).random().click();

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        cy.contains('How many players do you coach per month?',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        var radioButtons = utils.getTextOfAllElements("//input[@name='playersCoached']/..");
        cy.wrap(radioButtons).should('have.length', 4).should("deep.eq", ['Less than 10', '11 - 20', '21 - 50', 'More than 50']);

        cy.xpath("//input[@name='playersCoached']/..").random().click();

        utils.clickOn(registrationPage.continueBtn);
        utils.waitFor(5000)

        cy.contains('Thanks! How do you want to proceed?',
        {
            timeout: 20000
        }).then(ele => utils.highLight(ele)).should('be.visible');
        
        utils.waitFor(5000)

        cy.contains('100% Complete',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.waitFor(5000)

        cy.contains('Join our waitlist',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.waitFor(5000)

        cy.contains('Continue to join waitlist',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.waitFor(5000)

        cy.contains('Join the Clippd Community and waitlist',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.waitFor(5000)

        cy.contains('Create account and join waitlist',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.waitFor(5000)

        cy.contains('Continue to join waitlist',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible').click();
        utils.waitFor(5000)

        cy.contains('Now all we need are your contact details',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.waitFor(5000)

        registrationPage.placeHoldersContactDetails('First Name').should('be.visible');
        registrationPage.placeHoldersContactDetails('Last Name').should('be.visible');
        registrationPage.placeHoldersContactDetails('example@email.com').should('be.visible');

        //verifying error messages 
        registrationPage.placeHoldersContactDetails('First Name').should('be.visible').click();
        cy.contains('Now').click();
        cy.contains('First name is required').should('be.visible');

        utils.waitFor(5000)

        registrationPage.placeHoldersContactDetails('Last Name').should('be.visible').click();
        cy.contains('Now').click();
        cy.contains('Last name is required').should('be.visible');

        utils.waitFor(5000)

		registrationPage.selectCountryDropDown('Country').should('be.visible').click();
		cy.contains('Now').click();
		cy.contains('Please select a country').should('be.visible')

        registrationPage.placeHoldersContactDetails('example@email.com').should('be.visible').click();
        cy.contains('Now').click();
        cy.contains('Please enter a valid email address').should('be.visible');

        utils.waitFor(5000)



        registrationPage.placeHoldersContactDetails('First Name').type('Rushikesh' + Cypress._.random(11, 99));
        registrationPage.placeHoldersContactDetails('Last Name').type('E' + Cypress._.random(11, 99)).then(function()
        {
            var randomEmail = 'Rushikesh' + Cypress._.random(999, 9999) + '@mailinator.com';
            return randomEmail;
        }).then(function(randomMail)
        {
            registrationPage.placeHoldersContactDetails('example@email.com').type(randomMail);
        })
        utils.waitFor(5000)

        cy.contains('I agree',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.clickOn("//input[@name='agreeTOS']");

        utils.waitFor(5000)

        cy.contains('Join Waitlist',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.waitFor(5000)

        //thank you message validation 
        cy.contains('Thank you!',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.waitFor(5000)

        cy.contains('You’ve joined the Clippd waitlist',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.waitFor(5000)

        cy.contains('Please check your inbox.',
        {
            timeout: 10000
        }).then(ele => utils.highLight(ele)).should('be.visible');

    });

    it.only('Validating header components ', () =>
    {

        cy.wait(4000)
        cy.title().should('eq', 'Clippd')
        cy.contains('Join our waitlist and we’ll let you know when we’re ready',
        {
            timeout: 50000
        }).then(ele => utils.highLight(ele)).should('be.visible');

		cy.wait(5000)

        cy.contains('We will process your data in accordance with our ',
        {
            timeout: 50000
        }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.xpath(registrationPage.termsOfService).invoke('removeAttr', 'target').click();
        cy.url().should('contains', '/terms-of-service')

    });

    it('validating footer components ', () =>
    {
        cy.wait(4000)
        cy.title().should('eq', 'Clippd')
        cy.xpath(registrationPage.privacyPolicy).invoke('removeAttr', 'target').click();
        cy.url().should('contains', '/privacy-policy')
    });

});