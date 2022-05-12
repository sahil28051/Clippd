/// <reference types="cypress" />

import { dashboardPage } from "../../support/pageObjects/DashBoardPage";

import { utils } from "../../support/Utilities/Utils";

import { activitiesPage } from "../../support/pageObjects/ActivitiesPage";

const {} = Cypress;

// Get the credentials
const { DEFAULT_USER_EMAIL: email, DEFAULT_USER_PASSWORD: password } =
  Cypress.env();

function loadBefore() {
  before(() => {
    cy.login(email, password);
  });
}
let allValues = "";

describe("Validating Sorting for Activity data-grid", () => {
  loadBefore();
  it("Verify ascending sorting order", () => {
    //Click on Activities tab
    dashboardPage.activityLink().click();
    //Clicking on grid view tab
    utils.clickOn(activitiesPage.gridCardView);
    utils.waitFor(5000);

    //Getting data from quality column
    var ascArray = activitiesPage.getDataFromColumnQuality("Quality");

    //Verifying data having 12 fields only
    cy.wrap(ascArray).should("have.length", 12);

    //Verifying if the data is in sorted orde --> ASCENDINGr
    cy.wrap(ascArray).should("deep.eq", ascArray.sort());
  });

  it("Verify descending sorting order", () => {
    //When clicked on column name the column will get sorted in descending order
    activitiesPage.toggleSortOrderOfcolumn("Quality");

    //Waiting till the page gets loaded
    utils.waitFor(5000);

    //Verifying if ↓ sorting icon is visible
    utils.getElement(activitiesPage.sortingIcon).should("be.visible");

    //Verifying if sorting order of quality column has changed to descending
    cy.xpath(activitiesPage.sortingOrder).then(function ($ele) {
      var temp = $ele.attr("aria-sort");
      cy.wrap(temp).should("eq", "descending");
    });

    //Getting all data of quality column in array
    var descArray = activitiesPage.getDataFromColumnQuality();

    //Verifying if all the data got from quality column is in descending order
    cy.wrap(descArray).should("have.length", 12);

    //Verifying if all the data got from quality column is in descending order
    cy.wrap(descArray).should("deep.eq", descArray.reverse());
  });
});

describe("Validating search for Activity Data-grid", () => {
  loadBefore();
  it("Searching and validating search results", () => {
    //Click on Activities tab
    dashboardPage.activityLink().click();

    //Clicking on grid view tab
    utils.clickOn(activitiesPage.gridCardView);

    //Enter "Round" in search bar
    utils.clearAndType(activitiesPage.keyword, "Round").type("{enter}");

    //Verify the search result
    activitiesPage.getAvailableRows("Round").should("have.length", 12);

    //Enter invalid search data
    utils.clearAndType(activitiesPage.keyword, "love").type("{enter}");

    //Verify the message if no activites available
    utils.getElement(activitiesPage.noActivitiesAvailable).should("be.visible");
  });
});

describe("Validating deleting an activity", () => {
  loadBefore();
  it.skip("Delete an activity and verifying the success message", () => {
    //Navigating to activities page
    dashboardPage.activityLink().click();

    //Clicking on grid card view
    utils.clickOn(activitiesPage.gridCardView);

    //Waiting for page to reload
    utils.waitFor(5000);

    //Selecting first activity
    utils.clickOn(activitiesPage.firstActivityLink);

    //Clicking on edit button
    utils.clickOn(activitiesPage.editActivityIcon);

    //Deleting the activity
    utils.clickOn(activitiesPage.deleteActivityBtn);

    //Click on "Yes"
    utils.clickOn(activitiesPage.yesDeleteBtn);

    //Verifying if activity being deleted toast message is available
    utils
      .getElement(activitiesPage.acitivitybeingDeletedToastMsg)
      .should("be.visible");

    //Verifying if activity was deleted succesfully toast message is visible
    utils
      .getElement(activitiesPage.activityWasDeletedSuccesFullyToastMsg)
      .should("be.visible");
  });
});

describe("Validating editing an activity", () => {
  // loadBefore();
  beforeEach(function () {
    cy.login(email, password);
    utils.waitTillPageLoad();
  });

  it.skip("Edting an activity and verifying the success message", () => {
    //Navigating to activities page
    dashboardPage.activityLink().click();

    //Waiting for page to load
    utils.waitFor(5000);

    //Selecting first activity
    utils.clickOn(activitiesPage.firstActivityLink);

    //Clicking on edit button
    utils.clickOn(activitiesPage.editActivityIcon);

    //Editing the title of activity with some random text
    var randomActivityName =
      activitiesPage.editActivityTitleWithSomeRandomText();

    //Saving the activity
    utils.clickOn(activitiesPage.saveActivityBtn);

    //Verifying if tilte updated succesfully text toast is displayed
    utils
      .getElement(activitiesPage.activityTitleUpdatedSuccesfullyToast)
      .should("be.visible");

    //Verifying if the activity name has been changed to random activity name
    utils
      .getText(activitiesPage.activityTitlelabel)
      .should("eq", randomActivityName);
  });

  it("Edit Select Tee on Edit Activity Screen", () => {
    //Navigating to activities page
    dashboardPage.activityLink().click();

    utils.waitTillPageLoad();

    activitiesPage
      .editFirstActivityicon()
      .click({
        force: true,
      })
      .then(function () {
        utils.waitTillPageLoad();
      });

    cy.wait(10000).then(function () {
      utils.clickOn(activitiesPage.selectTeeDropdown);
    });

    activitiesPage
      .selectRandomAutoSuggestion()
      .then(($suggestions) => {
        cy.wrap(Cypress._.sampleSize($suggestions.toArray(), 1)).click();
      })
      .wait(5000)
      .then(function () {
        utils
          .getText(activitiesPage.selectedTeeValue)
          .as("teeColorAfterSelecting");

        utils.clickOn(activitiesPage.saveDetailsBtn);

        utils
          .getElement(activitiesPage.activiityIsBeingUpdated)
          .should("not.be.visible");

        cy.xpath(activitiesPage.activityHasBeenUpdated, {
          timeout: "90000",
        }).should("be.visible");
      });

    //Waiting for page to load
    cy.wait(20000).then(function () {
      utils
        .getText(activitiesPage.teeColourOnFirstActiviyRow)
        .then(function (teeColorOnFirstActiviyRow) {
          expect(this.teeColorAfterSelecting).to.contain(
            teeColorOnFirstActiviyRow
          );
        });
    });
  });

  it("Edit Date and Time on Edit Activity Screen", () => {
    //Navigating to activities page
    dashboardPage.activityLink().click();

    utils.waitTillPageLoad();

    activitiesPage.editFirstActivityicon().click({
      force: true,
    });

    cy.wait(5000)
      .then(() => {
        var year = Cypress._.sampleSize(["2022"], 1);
        cy.wrap(year).as("randomYear");

        var month = Cypress._.sampleSize(["Jan", "Feb", "Mar"], 1);
        cy.wrap(month).as("randomMonth");

        var day = Cypress._.random(16, 23);
        cy.wrap(day).as("randomDay");

        var time = Cypress._.sampleSize(
          ["12:30 PM", "11:30 AM", "4:30 PM", "5:30 PM", "3:00 PM", "7:00 PM"],
          1
        );
        cy.wrap(time).as("randomTime");
      })
      .then(function () {
        utils.waitTillPageLoad();

        dashboardPage.selectDateAndTime(
          this.randomYear,

          this.randomMonth,

          this.randomDay,

          this.randomTime
        );

        cy.wait(5000).then(() => {
          cy.xpath(activitiesPage.selectedDateOnCalendar).each(
            (item, index, list) => {
              allValues = allValues + " " + Cypress.$(item).attr("value");
              cy.log("-----" + allValues);
            }
          );
        });
      })
      .then(function () {
        utils.clickOn(activitiesPage.saveDetailsBtn);

        utils
          .getElement(activitiesPage.activiityIsBeingUpdated)
          .should("not.be.visible");

        cy.xpath(activitiesPage.activityHasBeenUpdated, {
          timeout: "90000",
        }).should("be.visible");
      })
      .then(function () {
        utils.waitFor(30000);
        utils
          .getText(activitiesPage.dateOnFirstActivitylink)
          .then(function (DateOnFirstRow) {
            var SelectedDateOnCal =
              this.randomDay + " " + this.randomMonth + " " + this.randomYear;

            expect(DateOnFirstRow).to.contain(SelectedDateOnCal);
          });
      });
  });

  it("Edit Weather and course conditions on Edit Activity Screen", function () {
    //Navigating to activities page
    dashboardPage.activityLink().click();

    utils.waitTillPageLoad();

    activitiesPage.editFirstActivityicon().click({
      force: true,
    });

    utils.clickOn(activitiesPage.gameTypePractice);

    var windvalue = Cypress._.sampleSize(["Light", "Strong"], 1);
    var rainvalue = Cypress._.sampleSize(["Light", "Heavy"], 1);
    var fairwayValue = Cypress._.sampleSize(["Soft", "Hard"], 1); //
    var roughValue = Cypress._.sampleSize(["Short", "Long"], 1); //
    var greenSpeed = Cypress._.sampleSize(["Fast", "Slow"], 1); //

    cy.wrap(windvalue).as("selectedwindvalue");
    cy.wrap(rainvalue).as("selectedrainvalue");
    cy.wrap(fairwayValue).as("selectedfairwayValue");
    cy.wrap(roughValue).as("selectedroughValue");
    cy.wrap(greenSpeed).as("selectedgreenSpeed");

    cy.wait(5000);
    utils.clickOn(activitiesPage.windDropdown);
    activitiesPage
      .selectOptionFromDropdown(windvalue)
      .should("be.visible")
      .click({
        force: true,
      });
    cy.wait(2000);
    utils.clickOn(activitiesPage.rainDropdown);
    activitiesPage
      .selectOptionFromDropdown(rainvalue)
      .should("be.visible")
      .click({
        force: true,
      });
    cy.wait(2000);
    utils.clickOn(activitiesPage.fairWayDropdown);
    activitiesPage
      .selectOptionFromDropdown(fairwayValue)
      .should("be.visible")
      .click({
        force: true,
      });
    cy.wait(2000);
    utils.clickOn(activitiesPage.roughDropdown);
    activitiesPage
      .selectOptionFromDropdown(roughValue)
      .should("be.visible")
      .click({
        force: true,
      });
    cy.wait(2000);
    utils.clickOn(activitiesPage.greenSpeed);
    activitiesPage
      .selectOptionFromDropdown(greenSpeed)
      .should("be.visible")
      .click({
        force: true,
      });
    cy.wait(5000);

    utils.clickOn(activitiesPage.saveDetailsBtn);

    utils
      .getElement(activitiesPage.activiityIsBeingUpdated)
      .should("not.be.visible");

    cy.xpath(activitiesPage.activityHasBeenUpdated, {
      timeout: "90000",
    })
      .should("be.visible")

      .then(function () {
        utils.clickOn(activitiesPage.closeToastMessage).wait(10000);
        cy.get(".flex > path").filter(":first").trigger("focus", {
          force: true,
        });
        cy.wait(5000);
        var arr = utils.getTextOfAllElements(
          "//*[contains(@id,'tippy')]/div/div/p"
        );
        cy.wrap(arr).then(function (tooltipArray) {
          let selectedOptionsArray = [
            "Rain:" + " " + this.selectedrainvalue,
            "Wind:" + " " + this.selectedwindvalue,
            "Fairway:" + " " + this.selectedfairwayValue,
            "Rough:" + " " + this.selectedroughValue,
            "Greens:" + " " + this.selectedgreenSpeed,
          ];
          cy.wrap(selectedOptionsArray).should("deep.eq", tooltipArray);
        });
      });
  });

  //closeCourseNameSearch
  it("Verify Course search on Edit Activity Screen", function () {
    //Navigating to activities page
    dashboardPage.activityLink().click({
      multiple: true,
    });

    utils.waitTillPageLoad();

    activitiesPage.editFirstActivityicon().click({
      force: true,
    });

    activitiesPage.searchCourseName("green");

    var autoSuggestions = utils.getTextOfAllElements(
      activitiesPage.courseNameAutosuggestions
    );

    cy.wrap(autoSuggestions).each(function ($ele, index, list) {
      cy.wrap($ele).should("include", "green");
    });

    cy.xpath("//button[@aria-label='Close the dialog']//*[name()='svg']").click(
      {
        force: true,
      }
    );
  });

  it("verifying if after changing course name the deatils are updated", function () {
    dashboardPage.activityLink().click();

    utils.waitTillPageLoad();

    activitiesPage.editFirstActivityicon().click({
      force: true,
    });

    var selectedCourseNameVal = Cypress._.sampleSize(
      [
        "Sunningdale GC - Old",
        "Frilford Heath GC - Blue",
        "Gog Magog GC - Wandlebury",
        "Birkdale GC, Huntersville",
        "New York CC, New Hempstead",
      ],
      1
    );

    cy.wrap(selectedCourseNameVal)
      .as("selectedCourseName")
      .then(function () {
        activitiesPage.searchCourseName(this.selectedCourseName + "");
        cy.get(activitiesPage.searchCourseNameInput)
          .type("{downArrow}")
          .type("{enter}");

        cy.wait(5000);

        utils.clickOn(activitiesPage.selectTeeDropdown).then(function () {
          activitiesPage
            .selectRandomAutoSuggestion()
            .then(($suggestions) => {
              cy.wrap(Cypress._.sampleSize($suggestions.toArray(), 1)).click({force:true});
            })
            .wait(5000);
        });
      })
      .then(function () {
        utils.clickOn(activitiesPage.saveDetailsBtn);

        utils
          .getElement(activitiesPage.activiityIsBeingUpdated)
          .should("not.be.visible");

        cy.xpath(activitiesPage.activityHasBeenUpdated, {
          timeout: "90000",
        }).should("be.visible");

        utils.clickOn(activitiesPage.closeToastMessage);

        cy.wait(5000);

        utils
          .getText(activitiesPage.courseNameOnFirstRow)
          .then(function (courseNameOn1stRow) {
            cy.log(courseNameOn1stRow);

            expect(this.selectedCourseName + "".trim()).to.include(
              courseNameOn1stRow.split("-").pop().trim()
            );
          });
      });
  });

  it("Verifting Refresh shots from data source feature", function () {
    dashboardPage.activityLink().click();

    utils.waitTillPageLoad();

    activitiesPage.editFirstActivityicon().click({
      force: true,
    });

    utils.clickOn(activitiesPage.refreshDataSource).then(function () {
      utils.clickOn(activitiesPage.saveDetailsBtn);
    });

    utils
      .getElement(activitiesPage.activiityIsBeingUpdated)
      .should("be.visible");
  });
});
