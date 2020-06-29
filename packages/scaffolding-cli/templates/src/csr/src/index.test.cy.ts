/* eslint-disable jest/expect-expect */
/**
Every test you write will include selectors for elements. Write selectors that are resilient to changes.
❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/
/// <reference types="cypress"/>

/**
 @type {Cypress.PluginConfig}
 */

describe("/ (index)", () => {
    beforeEach(() => {
        // Loads the page and start listening for XHR requests
        cy.fixture("get-menu-response.json").as("menuResponse")
        cy.server()
        cy.route({
            method: "GET", // Route all GET requests
            url: new RegExp(".*\/menu.*"), // that have a URL that matches '/menu'
            response: "@menuResponse", // and force the response to be: []
        }).as("getStubbedMenu")

        cy.route({
            method: "POST", // Route all GET requests
            url: new RegExp(".*\/track.*"), // that have a URL that matches '/menu'
        }).as("stubTracking")

        cy.visit("")
    })

    it("fetches menu on load", () => {
        const menuName = "Breakfast Menu"

        cy.wait("@getStubbedMenu").then(xhr => {
            cy.wrap(xhr.responseBody)
                .should("have.property", "results")
                .and("be.an", "array")
                .its(0)
                .should("have.property", "name")
                .and("be.eq", menuName)
        })

        cy.get("[data-testid=results]").should("contain", menuName)
    })

    it("cannot enter text in disabled search", () => {
        cy.wait("@getStubbedMenu") // Resolve the stub first

        cy.get("#search-bar").should("be.disabled")
    })
})

