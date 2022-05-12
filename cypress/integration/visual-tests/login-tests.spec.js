describe("The login Page", () => {
  it("Login page successfully loads", () => {
    cy.visit("/login");
    cy.wait(5000);
    cy.screenshot();
  });

  it("Login Attempt no email address and no password", () => {
    cy.xpath('//button[@type="submit"]').click();
    cy.xpath('//p[@role="alert"]').contains(
      "You need to add your email and password. Please try again."
    );
    cy.screenshot();
  });

  it("Login Attempt Only Email Address", () => {
    cy.get(":nth-child(1) > .px-4").first().type("gazal+coach1@clippd.io");
    cy.xpath('//button[@type="submit"]').click();
    cy.xpath('//p[@role="alert"]').contains("Please enter your password");
    cy.screenshot();
    //clearing username
    cy.get(":nth-child(1) > .px-4").clear();
  });

  it("Login Attempt Only Password", () => {
    cy.xpath('//input[@type="password"]').type("password");
    cy.xpath('//button[@type="submit"]').click();
    cy.xpath('//p[@role="alert"]').contains(
      "Please enter a valid email address."
    );
    cy.screenshot();

    //clearing password
    cy.xpath('//input[@type="password"]').clear();
  });

  it("Login Attempt Success", () => {
    cy.get(":nth-child(1) > .px-4").first().type("somanath+coach@clippd.io");
    cy.xpath('//input[@type="password"]').type("Test@@123");
    cy.xpath('//button[@type="submit"]').click();
    cy.wait(5000);
    cy.screenshot();
  });
});
