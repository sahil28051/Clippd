import { utils } from "../../support/Utilities/Utils";

import { homePage } from "../../support/pageObjects/HomePage";

import { myProfilePage } from "../../support/pageObjects/MyProfilePage";

const { _ } = Cypress;
// Get the credentials
const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();
const filename = "gdltest.xlsx";

describe("Uploading a GDL file ", () => {
  it.skip("Upload GDL file and verify the file My", () => {
    cy.login(email, password);
    utils.waitFor(5000);
    utils.clickOn(homePage.playerProfileLink);
    utils.clickOn(myProfilePage.uploadFilesBtn);
    utils.clickOn(myProfilePage.continueBtn);
    cy.findByLabelText(/Add File/).attachFile(filename);
    utils.clickOn(myProfilePage.uploadBtn);
    utils.waitFor(20000);
    utils
      .getElement(myProfilePage.fileSentForProcessingMsg)
      .should("be.visible");
    utils.clickOn(myProfilePage.closeDialogueBtn);
    utils.waitFor(5000);
    //   utils.getElement(myProfilePage.noActivitiesToLoadToastMsg).should('be.visible');
  });
});
