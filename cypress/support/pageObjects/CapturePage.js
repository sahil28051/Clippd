const capturehome = "(//*[contains(@class,'MuiButtonBase-root Mui')])[1]";
const favourites = "(//*[contains(@class,'MuiButtonBase-root Mui')])[2]";
const offthetee = "(//*[contains(@class,'MuiButtonBase-root Mui')])[3]";
const approach = "(//*[contains(@class,'MuiButtonBase-root Mui')])[4]";
const aroundthegreen = "(//*[contains(@class,'MuiButtonBase-root Mui')])[5]";
const putting = "(//*[contains(@class,'MuiButtonBase-root Mui')])[6]";
const backtoclippd = "(//*[contains(@class,'MuiButtonBase-root Mui')])[7]";
const wedgeladder =
  "(//*[contains(@class,'MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-padding MuiListItem-button jss35')])[1]";
const emailadderss = "(//*[contains(@class,'MuiSelect-se')])";
const emailaddress2 = "//input[@placeholder='Add email']";
const addemailaddress = "(//*[contains(@class,'MuiMenuIt')])";
const calendaricon = "(//*[contains(@class,'MuiSvgIcon-ro')])[7]";
const dateandtime = "(//*[contains(@class,'MuiOutlinedInput-i')])[2]";
const target1 = "(//*[contains(@class,'MuiOutlinedInput-i')])[3]";
const target2 = "(//*[contains(@class,'MuiOutlinedInput-i')])[4]";
const target3 = "(//*[contains(@class,'MuiOutlinedInput-i')])[5]";
const target4 = "(//*[contains(@class,'MuiOutlinedInput-i')])[6]";
const target5 = "(//*[contains(@class,'MuiOutlinedInput-i')])[7]";
const target6 = "(//*[contains(@class,'MuiOutlinedInput-i')])[8]";
const target7 = "(//*[contains(@class,'MuiOutlinedInput-i')])[9]";
const target8 = "(//*[contains(@class,'MuiOutlinedInput-i')])[10]";
const target9 = "(//*[contains(@class,'MuiOutlinedInput-i')])[11]";
const clearbutton = "(//*[contains(@class,'MuiButton-root MuiButton-c')])[1]";
const savebutton = "(//*[contains(@class,'MuiButton-root MuiButton-c')])[2]";
const message = "//*[contains(text(),'Your activity has been updated.')]";

class capturepage {
  capturehome() {
    return cy.xpath(capturehome);
  }
  favourites() {
    return cy.xpath(favourites);
  }
  offthetee() {
    return cy.xpath(offthetee);
  }
  approach() {
    return cy.xpath(approach);
  }
  aroundthegreen() {
    return cy.xpath(aroundthegreen);
  }
  putting() {
    return cy.xpath(putting);
  }
  backtoclippd() {
    return cy.xpath(backtoclippd);
  }
  wedgeladder() {
    return cy.xpath(wedgeladder);
  }
  emailadderss() {
    return cy.xpath(emailadderss);
  }
  addemailaddress() {
    return cy.xpath(addemailaddress);
  }
  emailaddress2() {
    return cy.xpath(emailaddress2).invoke("show");
  }
  calendaricon() {
    return cy.xpath(calendaricon);
  }
  dateandtime() {
    return cy.xpath(dateandtime);
  }
  target1() {
    return cy.xpath(target1);
  }
  target2() {
    return cy.xpath(target2);
  }
  target3() {
    return cy.xpath(target3);
  }
  target4() {
    return cy.xpath(target4);
  }
  target5() {
    return cy.xpath(target5);
  }

  target6() {
    return cy.xpath(target6);
  }
  target7() {
    return cy.xpath(target7);
  }
  target8() {
    return cy.xpath(target8);
  }
  target9() {
    return cy.xpath(target9);
  }
  clearbutton() {
    return cy.xpath(clearbutton);
  }
  savebutton() {
    return cy.xpath(savebutton);
  }
  message() {
    return cy.xpath(message);
  }
}

export const capture = new capturepage();
