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

describe("/Blog", () => {
    beforeEach(() => {
        cy.fixture("get-menu-response.json").as("menuResponse")
        cy.server()
        cy.route({
            method: "GET", // Route all GET requests
            url: "/menu*", // that have a URL that matches '/menu'
            response: "@menuResponse", // and force the response to be: []
        }).as("getStubbedMenu")
        cy.visit("")
    })

    it("can navigate to /blog page when clicking on the blog button on header", () => {
        cy.wait("@getStubbedMenu")
        cy.get("[data-testid=blogs_button]").should("exist").click()

        cy.location().should(loc => {
            expect(loc.pathname).to.eq("/blog")
        })
        cy.get("[data-testid=blog_title]")
            .should("exist")
            .contains("Yumido Blog")

        cy.get("[data-testid=blog_preview_block]").should(
            "have.length.greaterThan",
            0,
        )
    })
})
