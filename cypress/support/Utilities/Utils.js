/// <reference types="cypress" />
/// <reference types="cypress-xpath" />
///

var insidetext, textInside;

class Utils {
  highightWebElement(element, its_type) {
    if (its_type == "xpath") {
      cy.xpath(element, { timeout: 90000 }).then(($ele) => {
        $ele.attr("style", "background: yellow; border: 2px solid red;");
        var millisecondsToWait = 250;
        setTimeout(function () {
          $ele.removeAttr(
            "style",
            "background: yellow; border: 2px solid red;"
          );
        }, millisecondsToWait);

        $ele.css({
          border: "3px solid red",
        });
      });
    } else if (its_type == "css") {
      cy.get(element, { timeout: 90000 }).then(($ele) => {
        $ele.attr("style", "background: yellow; border: 2px solid red;");
        var millisecondsToWait = 200;
        setTimeout(function () {
          $ele.removeAttr(
            "style",
            "background: yellow; border: 2px solid red;"
          );
        }, millisecondsToWait);

        $ele.css({
          border: "3px solid red",
        });
      });
    }
  }

  highLight($ele) {
    $ele.attr("style", "background: yellow; border: 2px solid red;");
    var millisecondsToWait = 250;
    setTimeout(function () {
      $ele.removeAttr("style", "background: yellow; border: 2px solid red;");
    }, millisecondsToWait);

    $ele.css({
      border: "3px solid red",
    });
  }

  clickOn(element_xpath_or_css) {
    if (
      element_xpath_or_css.startsWith("/") ||
      element_xpath_or_css.startsWith("(")
    ) {
      this.highightWebElement(element_xpath_or_css, "xpath");
      return this.clickXpath(element_xpath_or_css);
    } else {
      this.highightWebElement(element_xpath_or_css, "css");
      return this.clickCss(element_xpath_or_css);
    }
  }

  /* returns chainable instance of 
    cypress element based on its type
    i.e. xpath or css */
  getElement(xpath_or_css) {
    if (xpath_or_css.startsWith("/") || xpath_or_css.startsWith("(")) {
      this.highightWebElement(xpath_or_css, "xpath");
      return cy.xpath(xpath_or_css, {
        timeout: "90000",
      });
    } else {
      this.highightWebElement(xpath_or_css, "css");
      return cy.get(xpath_or_css, {
        timeout: "90000",
      });
    }
  }

  clickXpath(element_xpath) {
    return cy
      .xpath(element_xpath, {
        timeout: "30000",
      })
      .click({ force: true });
  }

  clickCss(element_css) {
    return cy
      .get(element_css, {
        timeout: "30000",
      })
      .click({ force: true });
  }

  clearTextField(element) {
    if (element.startsWith("/") || element.startsWith("(")) {
      this.highightWebElement(element, "xpath");
      return cy
        .xpath(element, {
          timeout: "3000",
        })
        .clear();
    } else {
      this.highightWebElement(element, "css");
      return cy
        .get(element, {
          timeout: "3000",
        })
        .clear();
    }
  }

  typeKeys(element, keywords) {
    if (element.startsWith("/") || element.startsWith("(")) {
      return cy
        .xpath(element, {
          timeout: "3000",
        })
        .type(keywords);
    } else {
      return cy
        .get(element, {
          timeout: "3000",
        })
        .type(keywords);
    }
  }

  clearAndType(element, keywords) {
    if (element.startsWith("/") || element.startsWith("(")) {
      this.highightWebElement(element, "xpath");
      this.clearTextField(element);
      return this.typeKeys(element, keywords);
    } else {
      this.highightWebElement(element, "css");
      this.clearTextField(element);
      return this.typeKeys(element, keywords);
    }
  }

  scrollToElement(element) {
    if (element.startsWith("/") || element.startsWith("(")) {
      return cy.xpath(element).scrollIntoView();
    } else {
      return cy.get(element).scrollIntoView();
    }
  }

  waitFor(waitInSeconds) {
    cy.wait(waitInSeconds);
  }

  /**
   * accepts an element and
   * returns an array of texts present inside multiple elements
   */
  getTextOfAllElements(element) {
    var textList = new Array();

    this.getElement(element).each(($ele) => {
      cy.wrap($ele)
        .invoke("text")
        .then((text) => {
          textList.push(text);
        });
    });

    return textList;
  }

  /**
   * accepts an element and
   * returns texts present inside element
   */
  getText(element) {
    return this.getElement(element).invoke("text");
  }

  /**
   * accepts an element and
   * returns attribute of an element
   */
  getAttribute(element, property) {
    return this.getElement(element).invoke("prop", property);
  }

  waitTillPageLoad() {
    cy.window()
      .then((win) => {
        expect(win.document.readyState).to.be.eq("complete");
      })
      .then(() => {
        cy.xpath("//div[contains(@class,'typing-loader')]", {
          timeout: 60000,
        }).should("not.exist");
        // cy.xpath("//div[contains(@class,'typing-loader')]",{timeout:60000}).should('not.exist');
      })
      .then(() => {
        cy.xpath(
          "//button[@type='submit' and text()='Log in']",
          { timeout: 60000 },
          { log: false }
        ).should("not.exist");
      });
  }
  upload_video(fileName) {
    cy.fixture(fileName, "binary")
      .then(Cypress.Blob.binaryStringToBlob)
      .then((fileContent) => {
        cy.get("input[type=file]").attachFile({
          fileContent,
          fileName,
          mimeType: "video/mp4",
          encoding: "utf8",
          lastModified: new Date().getTime(),
        });
      });
  }

  validateIfElementExistsInDom(xpath_or_css) {
    if (xpath_or_css.startsWith("/") || xpath_or_css.startsWith("(")) {
      return cy.xpath("count(" + xpath_or_css + ")").then((count) => {
        if (count) {
          var temp = true;
          return cy.wrap(temp);
        } else {
          var temp2 = false;
          return cy.wrap(temp2);
        }
      });
    } else {
      var temp3 = Cypress.$(xpath_or_css).is(":visible");
      return cy.wrap(temp3);
    }
  }

  extractnumber(input) {
    var regex = /[+-]?\d+(\.\d+)?/g;
    var str = input;
    var finalans = str.match(regex).map(function (v) {
      return parseFloat(v);
    });
    console.log(finalans[0]);
    return finalans[0];
  }
}

export const utils = new Utils();
