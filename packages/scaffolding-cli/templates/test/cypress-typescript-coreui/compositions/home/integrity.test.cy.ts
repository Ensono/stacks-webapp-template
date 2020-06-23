/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/

describe("Page integrity", () => {
    beforeEach(() => {
        cy.visit("")
    })

    // Choose to enable if the page under test has external links
    it.skip("external links should be valid", () => {
        cy.get("a")
            .should("exist")
            .invoke("attr", "href")
            .then(href => {
                cy.request(href || " ")
                    .its("status")
                    .should("equal", 200)
            })
    })
})
