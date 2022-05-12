// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "@percy/cypress";
import "cypress-file-upload";
import "@testing-library/cypress/add-commands";

context("Login", function()
{
    Cypress.Commands.add("login", (email, password) =>
    {
        Cypress.log(
        {
            name: "login",
            message: `${email} | ${password}`,
        });

        cy.visit("/login");
        cy.wait(3000);
        cy.xpath('//input[@type="password"]').clear();
        cy.get(":nth-child(1) > .px-4").first().type(email);
        cy.xpath('//input[@type="password"]').type(password);
        cy.xpath('//button[@type="submit"]').click();
        cy.wait(5000);
    });
});

Cypress.Commands.add('sum',
{
    prevSubject: true
}, subject =>
{
    let yielded = Cypress._.reduce(subject, Cypress._.add, 0)

    Cypress.log(
    {
        name: 'sum',
        message: [subject, yielded],
        consoleProps: () => (
        {
            subject: subject,
            result: yielded
        })
    })

    return yielded
})

Cypress.Commands.add('map',
{
    prevSubject: true
}, (subject, iteratee) =>
{
    let yielded = Cypress._.map(subject, iteratee)

    Cypress.log(
    {
        name: 'map',
        message: [subject],
        consoleProps: () => (
        {
            subject,
            iteratee,
            yielded
        })
    })

    return yielded
})

Cypress.Commands.add('random',
{
    prevSubject: true
}, (subject, lower = 0, upper = null) =>
{
    if (!lower && !upper)
    {
        lower = 0
        upper = subject.length - 1
    }
    else if (!upper)
    {
        upper = lower
        lower = 0
    }

    const index = Cypress._.random(lower, upper)
    const yielded = index in subject ? subject[index] : null

    Cypress.log(
    {
        name: 'random',
        message: [`[${index}] => ${yielded}`],
        consoleProps: () => (
        {
            lower,
            upper,
            subject,
            index,
            yielded
        })
    })

    return yielded
})

