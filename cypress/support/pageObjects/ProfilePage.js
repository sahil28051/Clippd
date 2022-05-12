const userName = "//div[@class='w-full']/h1";
const editIcon =
  "//body/div[@id='root']/div[@aria-hidden='false']/main/div/div/div/div/div/div/button[1]";
const popupLabel = "#edit-profile-heading";
const cancelBtn = "button[data-variant=text]";
const crossIcon = "//button[@aria-label='Close the dialog']";
const firstName = "//input[@name='firstName']";
const lastName = "//input[@name='lastName']";
const username =
  "//input[@placeholder='Enter a username, minimum 3 characters']";
const dateOfBirth = "//div[@class='react-datepicker-wrapper']";
const yearDropdown = "//button[@id='yearOptions']";
const monthDropdown = "//button[@id='monthOptions']";
const genderDropdown = "//button[@value='MALE']";
const genderText = "//button[@value='MALE']/div";
const playingAbilityDropdown = "//*[text()='Your playing ability']//following-sibling::button";
const playingAbilityText = "//button[@value='SCRATCH']/div";
const countryDropdown = "//div[7]//button[1]";
const countryText = "//div[7]//button[1]/div";
// const saveBtn = "//button[normalize-space()='Save']";
const saveBtn = "(//div[@class='flex flex-col sm:flex-row-reverse sm:justify-between sm:items-center']//button)[1]";
const deleteProfilePic = "//button[@aria-label='Remove Avatar']";
const totalPlayerQuality =
  "//*[@class='group flex flex-col items-center']/div/span";
const OTTquality = "(//*[text()='OTT'])[1]/../../div[2]/span";
const APPquality = "(//*[text()='APP'])[1]/../../div[2]/span";
const ARGquality = "(//*[text()='ARG'])[1]/../../div[2]/span";
const PUTTquality = "(//*[text()='PUTT'])[1]/../../div[2]/span";
const myPerformanceDashboardLink = "//*[text()='My Performance Dashboard']/..";
const settingLink = "(//*[text()='Settings'])[2]";
const myBagLink = "//*[text()='My Bag']";
const myBag_driver = "(//*[contains(@class,'w-full flex r')])[1]";
const myBag_checkbox = "//*[contains(@class,'appearance')]";
const myBag_fairway_woods = "(//*[contains(@class,'w-full flex r')])[2]";
const myGolfBagdynamicxpath= "//*[contains(@class,'flex relative it')]"

const myBag_Hybrids = "(//*[contains(@class,'w-full flex r')])[3]";
const myBag_Irons = "(//*[contains(@class,'w-full flex r')])[4]";
const myBag_Wedges = "(//*[contains(@class,'w-full flex r')])[5]";
const myBag_Putters = "(//*[contains(@class,'w-full flex r')])[6]";
const myBag_save_button = "//*[contains(@class,'mb-6')]";

class ProfilePage {
  // myBag_fairway_checkbox01 = "//*[contains(@class,'flex relative i')][1]";
  userName() {
    return cy.xpath(userName);
  }
  editIcon() {
    return cy.xpath(editIcon);
  }
  popupLabel() {
    return cy.get(popupLabel);
  }
  cancelBtn() {
    return cy.get(cancelBtn);
  }
  crossIconBtn() {
    return cy.xpath(crossIcon);
  }
  firstname() {
    return cy.xpath(firstName);
  }
  lastname() {
    return cy.xpath(lastName);
  }
  username() {
    return cy.xpath(username);
  }
  selectDateOfBirth(year, month, date) {
    cy.xpath(dateOfBirth).click();
    cy.xpath(yearDropdown).click();
    cy.xpath("//div[text()='" + year + "']")
      .eq(1)
      .click();
    cy.xpath(monthDropdown).click();
    cy.xpath("//div[text()='" + month + "']")
      .eq(1)
      .click();
    cy.xpath("//div[text()='" + date + "']").click();
  }
  selectGender(gender) {
    cy.xpath(genderDropdown).click();
    cy.xpath("(//*[text()='" + gender + "'])[2]").click();
  }
  genderText() {
    return cy.xpath(genderText);
  }
  selectYourPlayingAbility(ability) {
    cy.xpath(playingAbilityDropdown).click();
   // cy.xpath("(//*[text()='" + ability + "'])[2]").click();
    cy.xpath("//div[normalize-space()='" + ability + "']//div[1]").click()
  }
  playingAbilityText() {
    return cy.xpath(playingAbilityText);
  }
  selectYourCountry(country) {
    cy.xpath(countryDropdown).click();
  cy.xpath("(//*[text()='" + country + "'])[2]").click();
 //   cy.xpath("//div[normalize-space()='" + country + "']//div[1]").click()
  }
  countryText() {
    return cy.xpath(countryText);
  }
  saveBtn() {
    return cy.xpath(saveBtn);
  }
  addMedia(path) {
    cy.xpath("//input[@type='file']").attachFile(path);
  }
  deleteProfilePicBtn() {
    return cy.xpath(deleteProfilePic);
  }
  totalPlayerQualityText() {
    return cy.xpath(totalPlayerQuality);
  }
  OTTqualityText() {
    return cy.xpath(OTTquality);
  }
  APPqualityText() {
    return cy.xpath(APPquality);
  }
  ARGqualityText() {
    return cy.xpath(ARGquality);
  }
  PUTTqualityText() {
    return cy.xpath(PUTTquality);
  }
  myPerformanceDashboardLink() {
    return cy.xpath(myPerformanceDashboardLink);
  }
  navigation(text) {
    return cy.xpath("(//*[text()='" + text + "'])[1]/..");
  }
  settingsLink() {
    return cy.xpath(settingLink);
  }

  myBagLink() {
    return cy.xpath(myBagLink);
  }

  myBag_driver() {
    return cy.xpath(myBag_driver);
  }
  myBag_checkbox() {
    return cy.xpath(myBag_checkbox);
  }
  myBag_fairway_woods() {
    return cy.xpath(myBag_fairway_woods);
  }
  myBag_Hybrids() {
    return cy.xpath(myBag_Hybrids);
  }
  myBag_Irons() {
    return cy.xpath(myBag_Irons);
  }
  myBag_Wedges() {
    return cy.xpath(myBag_Wedges);
  }
  myBag_Putters() {
    return cy.xpath(myBag_Putters);
  }
  myBag_savebutton() {
    return cy.xpath(myBag_save_button);
  }
  
  myGolfBagdynamicxpath(){
     return  cy.xpath(myGolfBagdynamicxpath)
  }
  selectDriver() {}
}
export const profilePage = new ProfilePage();
