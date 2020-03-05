/*
Every test you write will include selectors for elements. Write selectors that are resilient to changes.
❌NEVER target elements based on CSS attributes such as: id, class, tag (e.g. cy.get('button').click(), cy.get('.btn.btn-large').click())
❕SPARINGLY target elements on textContent if it won't change (e.g. cy.contains('Submit').click())
✅ALWAYS add data-* attributes to make it easier to target elements
*/
/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/


describe("Given we open the Yumido webapp", () => {
    beforeEach(() => {
        cy.visit("")
        cy.server()
    })
    it("should call the Yumido API", () => {
        cy.route("GET", "/menu").as("getMenu")
        cy.get("[data-testid=apiPaneBtn]").click()

        cy.wait("@getMenu").then(xhr => {
            cy.wrap(xhr.status).should("eq", 200)
            cy.wrap(xhr.responseBody).should("have.property", "results")
        })
    })

    it("should display stubbed menu name", () => {
        let menuName: String = "Breakfast Menu"

        cy.fixture("get-menu-response.json").as("menuResponse")
        cy.route({
            method: "GET", // Route all GET requests
            url: "/menu", // that have a URL that matches '/menu'
            response: "@menuResponse", // and force the response to be: []
        }).as("getStubbedMenu")

        cy.get("[data-testid=apiPaneBtn]").click()

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
})

export default {}
