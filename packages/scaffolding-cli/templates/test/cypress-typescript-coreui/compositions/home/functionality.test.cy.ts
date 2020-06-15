/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/

describe("Page functionality", () => {
    beforeEach(() => {
        cy.request({url: `${Cypress.config().baseUrl}`, failOnStatusCode: true}).as("request")
    })

    it("status code should be 200", () => {
        cy.get("@request")
            .its("status")
            .should("equal", 200)
    })

    it.skip("should have header and footer tags", () => {
        cy.get("@request")
            .its("body")
            .should("include", "header")
            .and("include", "footer")
    })

    it("title should exist", () => {
        cy.get("@request")
            .its("body")
            .should("include", "title")
    })
})
