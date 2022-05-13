/// <reference types = "cypress-grep"/>

import { loginPage } from "../../support/pageObjects/LoginPage";
const {
  DEFAULT_COACH_EMAIL: coachemail,
  DEFAULT_COACH_PASSWORD: coachpassword,
} = Cypress.env();
const {
  DEFAULT_USER_EMAIL: playeremail,
  DEFAULT_USER_PASSWORD: playerpassword,
} = Cypress.env();

before(() => {
  cy.visit("/login");
});

describe("Validate Logo", () => {
  // Assert Clippd logo is Visiblesse
  it("verify Clippd logo is Visible", () => {
    loginPage.ClippdLogo().should("be.visible");
    cy.screenshot();
  });
});
describe("Validate elements on login page", () => {
  // Assert heading
  it("Verify Login Form heading", () => {
    loginPage
      .loginFormHeading()
      .contains("Golfʼs data-driven performance platform");
  });
  // Assert Email Field is visible and placeholder
  it("Verify Email address field is visible and placeholder", () => {
    loginPage
      .emailAddressField()
      .should("be.visible", "have.attr", "placeholder", "Email address");
  });
  // Assert Email Field is visible and placeholder
  it("Verify Password field is visible and placeholder", () => {
    loginPage
      .passwordField()
      .should("be.visible", "have.attr", "placeholder", "Password");
  });
  // Assert label of Login Button
  it("Verify Log In button is visible and it's label", () => {
    loginPage.loginButton().should("be.visible", "contain", "Log in");
  });
  //Assert Text of Forgotten your password?
  it("Verify Forgotten your password? link is visible", () => {
    loginPage
      .forgotPasswordlink()
      .should("be.visible", "contain", "Forgotten your password?");
  });
});
describe("Verify Error Messages", () => {
  it("Verify error message if user leaves Email and Password field blank and click on sign in", () => {
    loginPage.loginButton().click();
    loginPage
      .alertMessage()
      .should(
        "contain",
        "You need to add your email and password. Please try again."
      );
    cy.screenshot();
  });
  it(
    "Verify error message if user enters Email but leaves Password field blank and click on sign in",
    { tags: ["@smoke", "@regression"] },
    () => {
      loginPage.emailAddressField().type("test@test.com");
      loginPage.loginButton().click();
      loginPage.alertMessage().should("contain", "Please enter your password");
      cy.screenshot();
    }
  );
  it("Please enter a valid email address.", { tags: ["@smoke"] }, () => {
    loginPage.emailAddressField().clear();
    loginPage.passwordField().type("Test@@123");
    loginPage.loginButton().click();
    loginPage
      .alertMessage()
      .should("contain", "Please enter a valid email address.");
    cy.screenshot();
  });
  it("Login Attempt with valid email address and invalid password", () => {
    loginPage.emailAddressField().type("somanath+coach1@clippd.io");
    loginPage.passwordField().type("Test@@123");
    loginPage.loginButton().click();
    loginPage.alertMessage().contains("Your email and password do not match.");
    cy.screenshot();
    //clearing email and password
    loginPage.emailAddressField().clear();
    loginPage.passwordField().clear();
  });
});
describe("Verify Coach and Player Login", () => {
  it("Verify Coach is able to login with valid email and password", () => {
    // cy.login("somanath+coach@clippd.io", "ClippdUser2021")
    cy.login(coachemail, coachpassword);
    cy.url().should("contains", "/teams");
    cy.screenshot();
  });
  it(
    "Verify player is able to login with valid email and password",
    { tags: ["@smoke", "@regression"] },
    () => {
      cy.login(playeremail, playerpassword);
      cy.url().should("contains", "/dashboard");
      cy.screenshot();
    }
  );
});
