const clippdLogo = ".text-xl > .w-full";
const loginPageHeading = ".text-xl > p";
const emailField = "//input[@name='email']";
const password = "//input[@type='password']";
const loginBtn = "//button[@type='submit']";
const forgotPassord = ".underline";
const alertMsg = "//p[@role='alert']";

class LoginPage {

    forgotYourPasswordlink = "//a[@href='/forgotten-password']";
    
    ClippdLogo() {
    //Clippd logo
    return cy.get(clippdLogo)
    }

    //Login Form heading
    loginFormHeading() {
       return cy.get(loginPageHeading)
    }

    //Email Address field
    emailAddressField() {
        return cy.xpath(emailField)
    }

    //Password field
    passwordField() {
        return cy.xpath(password)
    }

    //Login button
    loginButton() {
        return cy.xpath(loginBtn)
    }

    //Forgotton password link
    forgotPasswordlink() {
        return cy.get(forgotPassord)
    }

    //Alert message
    alertMessage() {
        return cy.xpath(alertMsg)
    }

}

export const loginPage = new LoginPage();