import { utils } from "../../support/Utilities/Utils";

class MyProfilePage {
  uploadFilesBtn = "//span[text()='Upload Files']";
  continueBtn = "//button[text()='Continue']";
  uploadBtn = "//button[text()='Upload']";
  addFileBtn = "//label";
  fileSentForProcessingMsg = "//p[text()='File sent for processing']";
  closeDialogueBtn = "//button[@aria-label='Close the dialog']";
  noActivitiesToLoadToastMsg =
    "//div[contains(@class,'shadow-modal')]//div[contains(text(),'There are no new activities to load.')]";
  addLinkBtn = "//span[normalize-space()='Add Link']";
  linkInput = "//input[@name='targetUrl']";
  submitBtn = "//button[@type='submit']";
  trackmanSocialShareLink = "//img[@alt='Trackman Link social share']";
  linkSentForProcessingToast =
    "//div//*[text()='The link is sent for processing. We will alert you here once it’s ready.']";
  arccossConnectBtn =
    "//span[text()='Arccos']/..//following-sibling::div//button[text()='Connect']";
  arccossdisconnectBtn =
    "//span[text()='Arccos']/..//following-sibling::div//button[text()='Disconnect']";
  gflConnectBtn =
    "//span[text()='GolfStatLab']/..//following-sibling::div//button";
  emailTextField = "//input[@placeholder='Email address']";
  passwordTextField = "//input[@placeholder='Password']";
  arcossConnectedMessaage = "//h2[normalize-space()='Arccos is connected.']";
  retrievingDataToast =
    "//div[contains(text(),'We are retrieving your data. We will alert back he')]";
  arcossGreenTick = "(//*[name()='svg'][@stroke='currentColor'])[10]";
}

export const myProfilePage = new MyProfilePage();
