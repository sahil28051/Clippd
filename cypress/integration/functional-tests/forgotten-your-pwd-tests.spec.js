import { loginPage } from '../../support/pageObjects/LoginPage'
import { forgottenPasswordPage } from '../../support/pageObjects/ForgottenPasswordPage';
import { utils } from '../../support/Utilities/Utils'

const { host } = Cypress.env();

// Get the credentials
const
    {
        DEFAULT_USER_EMAIL: email,
        DEFAULT_USER_PASSWORD: password
    } = Cypress.env();

before(() => {
    cy.visit("/login");
    utils.clickOn(loginPage.forgotYourPasswordlink);
    cy.wait(5000);
});


describe("Validate forgot your password page", () => {
    it("Verify the error message if user does not enter email address and click on submit button", () => {
        //Click on submit button
        utils.clickOn(forgottenPasswordPage.submitBtn);

        //Verify the error message
        utils.getElement(forgottenPasswordPage.errorMessage).should(
            "contain",
            "Please enter a valid email address."
        );
    });

    it("Verify the error message if user enters an invalid email", () => {
        //Enter invalid data in email field
        utils.clearAndType(forgottenPasswordPage.emailField, 'test');

        //Click on submit button
        utils.clickOn(forgottenPasswordPage.submitBtn);

        //Verify the error message
        utils.getElement(forgottenPasswordPage.errorMessage).should(
            "contain",
            "Please enter a valid email address."
        );
    });


    it("Verify the success message if user enter valid email address", () => {
        //Enter valid email address in email field
        utils.clearAndType(forgottenPasswordPage.emailField, "test@test.com");

        //Click on submit button
        utils.clickOn(forgottenPasswordPage.submitBtn);
        utils.waitFor(6000);

        //Verify the success message
        utils.getElement(forgottenPasswordPage.helpIsOnTheWayMesssage).contains(
            "Help is on the way. Weʼve sent an email to test@test.com. Please check your inbox for a password reset link."
        );
    });

});

describe("Verify navigating back to password reset link", () => {
    it("Verify password reset link", () => {
        //Visit login page
        cy.visit("/login");

        //Click on forget password link
        utils.clickOn(loginPage.forgotYourPasswordlink);

        //Verify user lands on forgooten password page 
        cy.url().should("contains", "/forgotten-password");
    });
});

describe("Verify Log-in link", () => {
    it("Validate clicking on log-in link", () => {
        //Visit login page
        cy.visit("/login");

        //  cy.login(email,password);
        cy.url().should("contains", "/login");
    });

});

