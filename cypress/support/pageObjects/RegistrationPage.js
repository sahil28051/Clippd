import { utils } from "../Utilities/Utils"

class RegistrationPage
{
    clippedLogo          = "(//*[name()='svg'][@role='none'])[1]";
    welcomeLabel         = "Welcome!";
    continueBtn          = "//button[text()='Continue']";
    backBtn              = "//button[text()='Back']";
    joinOurWaitListLabel = "//h2[contains(text(),'Join our waitlist')]";
    progressBar          = "//h3[@class='uppercase text-3xs text-gray-550 mb-1']";
    progressBarLoader    = "(//div)[9]";
    //button[contains(text(),'I’m a Player')]
    imCoachBtn                    = "//button[contains(text(),'I"+"’"+"m a Coach')]";
    imPlayerBtn                   = "//button[contains(text(),'I"+"’"+"m a Player')]";
    selectCountryDropDown         = "//*[contains(@class,'relative pl')]";
    oneOrMoreOptionsErrorMsg      = "//p[@id='playerType']"
    pleaseSelectALocationErrorMsg = "//p[@id='location']";
    perforManceTechOptions        = "//button[@data-variant='soft']";
    golfAppOrTechNameInput        = "//input[@placeholder='Enter name of golf app or tech']"

    //page5
    frquencyOfPlaying = "//input[@name='frequency']/..";
    
    //page 6
    enterCoachName = "//input[@placeholder='Enter Coach(s) name']";

    termsOfService = "//a[normalize-space()='Terms of Service']";
    privacyPolicy =  "//a[normalize-space()='Privacy Policy']"
    

    placeHoldersContactDetails(placeHolder)
    {
        return utils.getElement("//input[@placeholder='"+placeHolder+"']")
    }

	selectCountryDropDown(){
		return 
	}

    describe_yourself_as(coach_or_player)
    {
        if (coach_or_player === 'Coach')
        {
            utils.clickOn(this.imCoachBtn)
        }
        else
        {
            utils.clickOn(this.imPlayerBtn)
        }
    }

    Where_are_you_based(country)
    {
        cy.xpath("//div[contains(text(),'" + country + "')]",
        {
            timeout: 8000
        }).then(ele => utils.highLight(ele)).click();
    }
}

export const registrationPage = new RegistrationPage();