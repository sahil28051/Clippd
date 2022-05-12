import { registrationPage } from "../../support/pageObjects/RegistrationPage";
import { utils } from "../../support/Utilities/Utils";

describe('Player specific tests ', () => {
    beforeEach(() => {
        cy.visit("/register-interest", { timeout: 6000 });
    });

    it('Validate if page loads successfully under 3 seconds', () => {
        cy.url(
            {
                timeout: 3000
            }).should('contain', '/register-interest');
    });

    it('Validate Welcome Screen objects', () => {
        utils.waitFor(5000)
        cy.contains('Welcome!',
            {
                timeout: 30000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        cy.contains('Continue',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        cy.contains('Back',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

    });

    it('Validate Continue button behaviour.', () => {
        utils.clickOn(registrationPage.continueBtn);
        utils.getElement(registrationPage.joinOurWaitListLabel).should('be.visible');
    });

    it('Validate Back button behaviour.', () => {
        utils.clickOn(registrationPage.backBtn);
        cy.url(
            {
                timeout: 3000
            }).should('contain', 'clippd.com/');
    });

    it('Validate progress bar', () => {
        utils.clickOn(registrationPage.continueBtn);
        //verifying if progress bar is visible
        utils.getElement(registrationPage.progressBar).should('be.visible');
        //verifying if at first the progress bar is loaded 0%
        utils.getText(registrationPage.progressBar).should('eq', '0% Complete');
        //verifying if the progress bar is having pink color and is rounded
        utils.getAttribute(registrationPage.progressBarLoader, 'class').should('contain', 'bg-primary rounded-full');
    });

    it('Validate objects on next Screen', () => {
        utils.clickOn(registrationPage.continueBtn);
        cy.wait(3000);
        cy.contains('How would you describe yourself?',
            {
                timeout: 8000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        // cy.contains('Where are you based?',
        //     {
        //         timeout: 8000
        //     }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Continue').then(ele => utils.highLight(ele)).should('be.visible');
        cy.contains('Back').then(ele => utils.highLight(ele)).should('be.visible');

        utils.getElement(registrationPage.imCoachBtn).should('be.visible');
        utils.getElement(registrationPage.imPlayerBtn).should('be.visible');
        // utils.getElement(registrationPage.selectCountryDropDown).should('be.visible');
    });

    it('Validate required fields', () => {
        utils.clickOn(registrationPage.continueBtn);
        //validating if on clicking continue button directly reuired field related message is shown 
        utils.clickOn(registrationPage.continueBtn);
        utils.getElement(registrationPage.oneOrMoreOptionsErrorMsg).should('be.visible');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // utils.getElement(registrationPage.pleaseSelectALocationErrorMsg).should('be.visible');
    });

    it('Validate Continue button after filling info as Player', () => {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        //utils.clickOn(registrationPage.selectCountryDropDown);
        //registrationPage.Where_are_you_based('Germany');
        utils.clickOn(registrationPage.continueBtn);
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele))
    });

    it('Validate back button after filling info as Player', () => {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('Germany');
        utils.clickOn(registrationPage.backBtn);
        cy.wait(5000)
        cy.contains('Welcome!',
            {
                timeout: 8000
            }).then(ele => utils.highLight(ele)).should('be.visible');
    });


    /////////////////////

    it('Validating if progress bar loads upto 25%', () => {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('Germany');
        utils.clickOn(registrationPage.continueBtn);
        cy.wait(5000)
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('25% Complete',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it('Validating Performance Tech options', () => {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('Germany');
        utils.clickOn(registrationPage.continueBtn);
        cy.wait(5000)
        cy.contains('Which performance tech do you use?',
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

    it('Validating required filed missing related message', () => {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('Germany');
        utils.clickOn(registrationPage.continueBtn);
        cy.wait(5000)
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        utils.clickOn(registrationPage.continueBtn);
        cy.wait(5000)
        cy.contains('Please select one or more options',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it('validate back button behaviour Page-3', () => {
		utils.waitFor(3000)
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        // cy.xpath(registrationPage.perforManceTechOptions).random().click();
        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function () {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected => {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true') {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else {
                    cy.log('***Other is not selected***')
                }
            });
        });
        utils.clickOn(registrationPage.backBtn);
        cy.contains('How would you describe yourself?',
            {
                timeout: 8000
            }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it('validate continue button behaviour Page-3', () => {
		utils.waitFor(4000)
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        // cy.xpath(registrationPage.perforManceTechOptions).random().click();
        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function () {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected => {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true') {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else {
                    cy.log('***Other is not selected***')
                }
            });
        });
        utils.clickOn(registrationPage.continueBtn);
        cy.contains('How often do you play?',
            {
                timeout: 8000
            }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it('Validate progress bar Page-4', () => {
		utils.waitFor(3000)
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        // cy.xpath(registrationPage.perforManceTechOptions).random().click();
        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function () {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected => {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true') {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else {
                    cy.log('***Other is not selected***')
                }
            });
        });

        utils.clickOn(registrationPage.continueBtn);

        cy.contains('50% Complete',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.xpath(registrationPage.progressBarLoader).then(function ($element) {
            var styleObj = $element.attr('style');
            cy.wrap(styleObj).should('include', '50%')
        })

    });

    it('Validate labels Page-4', () => {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);
        cy.wait(5000)
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        cy.wait(5000)
        cy.xpath(registrationPage.perforManceTechOptions)
            .filter(":contains('Other')")
            .then(ele => utils.highLight(ele))
            .click();

        utils.clickOn(registrationPage.continueBtn);
        cy.wait(5000)
        cy.contains('What other golf performance tech do you use?').then(ele => utils.highLight(ele)).should('be.visible');
        cy.contains('Continue').then(ele => utils.highLight(ele)).should('be.visible');
        cy.contains('Back').then(ele => utils.highLight(ele)).should('be.visible');

    });

    it('Validate required field related message Page-4', () => {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        // utils.clickOn(registrationPage.selectCountryDropDown);
        // registrationPage.Where_are_you_based('France');
        utils.clickOn(registrationPage.continueBtn);

        cy.xpath(registrationPage.perforManceTechOptions,
            {
                timeout: 8000
            })
            .filter(":contains('Other')")
            .then(ele => utils.highLight(ele))
            .click();

        utils.clickOn(registrationPage.continueBtn);
        utils.clickOn(registrationPage.continueBtn);

        cy.contains('Please enter a golf performance brand',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.getElement(registrationPage.golfAppOrTechNameInput).should('be.visible');
    });

    it('Validate button behaviour on page-4', () => {
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
        utils.clickOn(registrationPage.continueBtn);

        cy.xpath(registrationPage.perforManceTechOptions,
            {
                timeout: 8000
            })
            .filter(":contains('Other')")
            .then(ele => utils.highLight(ele))
            .click();

        utils.clickOn(registrationPage.continueBtn);
        utils.clickOn(registrationPage.continueBtn);

        utils.typeKeys(registrationPage.golfAppOrTechNameInput, 'slytherin')

        utils.clickOn(registrationPage.backBtn);

        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.clickOn(registrationPage.continueBtn);

        utils.typeKeys(registrationPage.golfAppOrTechNameInput, 'slytherin')
        utils.clickOn(registrationPage.continueBtn);

        cy.contains('How often do you play?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

    });

    it('Validations on page-5', () => {
		utils.waitFor(2000)
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
    
        utils.clickOn(registrationPage.continueBtn);
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        // cy.xpath(registrationPage.perforManceTechOptions).random().click();
        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function () {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected => {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true') {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else {
                    cy.log('***Other is not selected***')
                }
            });
        });

        utils.clickOn(registrationPage.continueBtn);

        cy.contains('How often do you play?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('50% Complete',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.xpath(registrationPage.progressBarLoader).then(function ($element) {
            var styleObj = $element.attr('style');
            cy.wrap(styleObj).should('include', '50%')
        })

        var radioButtons = utils.getTextOfAllElements(registrationPage.frquencyOfPlaying);
        cy.wrap(radioButtons).should('have.length', 4).should("deep.eq", ['Less than 4 times a month', '1 - 2 times a week', '3 - 4 times a week', 'Full time']);

        cy.contains('Continue',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        cy.contains('Back',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Continue',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).click();

        cy.contains('Please select an option',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

    });

    it(`validating button behaviour page-5`, () => {
		utils.waitFor(3000)
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
  
        utils.clickOn(registrationPage.continueBtn);
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function () {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected => {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true') {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else {
                    cy.log('***Other is not selected***')
                }
            });
        });

        utils.clickOn(registrationPage.continueBtn);

        //validating back button behaviour
        cy.contains('Back',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).click();

        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        utils.clickOn(registrationPage.continueBtn);

        cy.xpath(registrationPage.frquencyOfPlaying).random().click()

        utils.clickOn(registrationPage.continueBtn);

        cy.contains('Do you have lessons/coaching?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

    });

    it('validating page objects page-6', () => {
		utils.waitFor(3000)
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');

        utils.clickOn(registrationPage.continueBtn);
        cy.contains('Which performance tech do you use?',
            {
                timeout: 30000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        // cy.xpath(registrationPage.perforManceTechOptions).random().click();
        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function () {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected => {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true') {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else {
                    cy.log('***Other is not selected***')
                }
            });
        });

        utils.clickOn(registrationPage.continueBtn);

        cy.xpath(registrationPage.frquencyOfPlaying).random().click()

        utils.clickOn(registrationPage.continueBtn);

        utils.getElement(registrationPage.progressBar).should('be.visible');
        //verifying if at first the progress bar is loaded 0%
        utils.getText(registrationPage.progressBar).should('eq', '75% Complete');
        //verifying if the progress bar is having pink color and is rounded
        utils.getAttribute(registrationPage.progressBarLoader, 'class').should('contain', 'bg-primary rounded-full');

        cy.contains('Do you have lessons/coaching?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Yes',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('No',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Continue',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Back',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Continue',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).click();

        cy.contains('Please select an option',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');


    });

    it('Validations on page-6', () => {
		utils.waitFor(3000)
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
    
        utils.clickOn(registrationPage.continueBtn);
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        //cy.xpath(registrationPage.perforManceTechOptions).random().click();
        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function () {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected => {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true') {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else {
                    cy.log('***Other is not selected***')
                }
            });
        });

        utils.clickOn(registrationPage.continueBtn);

        cy.xpath(registrationPage.frquencyOfPlaying).random().click()

        utils.clickOn(registrationPage.continueBtn);

        //selecting yes 
        cy.contains('Yes',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.getElement(registrationPage.enterCoachName).should('be.visible');
        //verifying if coach name textfield accepts multiple coach names separated by comma

        utils.clearAndType(registrationPage.enterCoachName, 'abcd,def,ghi');

        utils.clickOn(registrationPage.continueBtn);

        cy.contains('Thanks!',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Back',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        //selecting No 
        cy.contains('No',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.validateIfElementExistsInDom(registrationPage.enterCoachName).should('eq', false)

        cy.contains('Back',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        cy.contains('How often do you play?',
            {
                timeout: 8000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Continue',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.clearTextField(registrationPage.enterCoachName);

        cy.contains('Continue',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        cy.contains('Thanks!',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

    });

    it('Validating components on Page-7', () => {
		utils.waitFor(3000)
        utils.clickOn(registrationPage.continueBtn);
        registrationPage.describe_yourself_as('Player');
    
        utils.clickOn(registrationPage.continueBtn);
        cy.contains('Which performance tech do you use?',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        //cy.xpath(registrationPage.perforManceTechOptions).random().click();
        //problem when other is selected randomly
        cy.xpath(registrationPage.perforManceTechOptions).random().click().then(function () {
            cy.xpath("//div[@data-value='Other']").invoke('prop', 'ariaSelected').then(isSelected => {
                //is selected is not boolean its string dont use === 
                //if (isSelected) not allowed always be false
                if (isSelected == 'true') {
                    cy.log('***Other is selected***')
                    cy.log('***Deselecting Other option')
                    cy.xpath("//div[@data-value='Other']").click();
                    cy.xpath(registrationPage.perforManceTechOptions).filter(':first').click();
                }
                else {
                    cy.log('***Other is not selected***')
                }
            });
        });

        utils.clickOn(registrationPage.continueBtn);

        cy.xpath(registrationPage.frquencyOfPlaying).random().click()

        utils.clickOn(registrationPage.continueBtn);

        //selecting yes 
        cy.contains('Yes',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.getElement(registrationPage.enterCoachName).should('be.visible');
        //verifying if coach name textfield accepts multiple coach names separated by comma

        utils.clearAndType(registrationPage.enterCoachName, 'abcd,def,ghi');

        utils.clickOn(registrationPage.continueBtn);

        cy.contains('Thanks!',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Back',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        //selecting No 
        cy.contains('No',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.validateIfElementExistsInDom(registrationPage.enterCoachName).should('eq', false)

        cy.contains('Back',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        cy.contains('How often do you play?',
            {
                timeout: 8000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Continue',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.clearTextField(registrationPage.enterCoachName);

        cy.contains('Continue',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        cy.contains('Thanks!',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');
        cy.contains('Thanks! How do you want to proceed?',
            {
                timeout: 20000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('100% Complete',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Join our waitlist',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Continue to join waitlist',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Join the Clippd Community and waitlist',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Create account and join waitlist',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Continue to join waitlist',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        cy.contains('Now all we need are your contact details',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        registrationPage.placeHoldersContactDetails('First Name').should('be.visible');
        registrationPage.placeHoldersContactDetails('Last Name').should('be.visible');
        registrationPage.placeHoldersContactDetails('example@email.com').should('be.visible');

        //verifying error messages 
        registrationPage.placeHoldersContactDetails('First Name').should('be.visible').click();
        cy.contains('Now').click();
        cy.contains('First name is required').should('be.visible');

        registrationPage.placeHoldersContactDetails('Last Name').should('be.visible').click();
        cy.contains('Now').click();
        cy.contains('Last name is required').should('be.visible');

        registrationPage.placeHoldersContactDetails('example@email.com').should('be.visible').click();
        cy.contains('Now').click();
        cy.contains('Please enter a valid email address').should('be.visible');


		utils.clickOn(registrationPage.selectCountryDropDown);
        registrationPage.Where_are_you_based('Germany');

		


        registrationPage.placeHoldersContactDetails('First Name').type('Rushikesh' + Cypress._.random(11, 99));
        registrationPage.placeHoldersContactDetails('Last Name').type('E' + Cypress._.random(11, 99)).then(function () {
            var randomEmail = 'Rushikesh' + Cypress._.random(999, 9999) + '@mailinator.com';
            return randomEmail;
        }).then(function (randomMail) {
            registrationPage.placeHoldersContactDetails('example@email.com').type(randomMail);
        })

        cy.contains('I agree',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        utils.clickOn("//input[@name='agreeTOS']");

        cy.contains('Join Waitlist',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible').click();

        //thank you message validation 
        cy.contains('Thank you!',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('You’ve joined the Clippd waitlist',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('Please check your inbox.',
            {
                timeout: 10000
            }).then(ele => utils.highLight(ele)).should('be.visible');
    });

    it('Validating header components ', () => {

        cy.wait(4000)
        cy.title().should('eq', 'Clippd')
        cy.contains('Join our waitlist and we’ll let you know when we’re ready',
            {
                timeout: 50000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.contains('We will process your data in accordance with our ',
            {
                timeout: 50000
            }).then(ele => utils.highLight(ele)).should('be.visible');

        cy.xpath(registrationPage.termsOfService).invoke('removeAttr', 'target').click();
        cy.url().should('contains', '/terms-of-service')

    });

    it('validating footer components ', () => {
        cy.wait(4000)
        cy.title().should('eq', 'Clippd')
        cy.xpath(registrationPage.privacyPolicy).invoke('removeAttr', 'target').click();
        cy.url().should('contains', '/privacy-policy')
    });


});

