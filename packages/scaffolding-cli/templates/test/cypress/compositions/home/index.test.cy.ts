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

        cy.visit("")
    })

    it("fetches menu on load", () => {
        let menuName: String = "Breakfast Menu"

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

    it("fetches menu from API on reload", () => {
        cy.wait("@getStubbedMenu") //resolve the stub first

        cy.route("GET", new RegExp(".*\/menu.*")).as("getMenu") //listen to XHR requests without stub
        cy.reload(true) //force the reload without cache

        cy.wait("@getMenu").then(xhr => {
            cy.wrap(xhr.status).should("eq", 200)
            cy.wrap(xhr.responseBody).should("have.property", "results")
        })
    })

    it("search textField change fires api requests", () => {
        const searchTerm = "T"
        cy.wait("@getStubbedMenu") //resolve the stub first

        cy.get("#search-bar").should("be.visible").type(searchTerm)
        cy.wait("@getStubbedMenu").should((xhr) => {
            expect(xhr.url).to.match(RegExp(".*\/menu\?(.*)=T.*"))
        })
    })
})

export default {}
