/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/

describe("Page manifest", () => {
    const name = "Amido Stacks"

    beforeEach(() => {
        cy.request({url: `${Cypress.config().baseUrl}/manifest.json`, failOnStatusCode: true}).as("request")
    })

    it("file should exist", () => {
        cy.get("@request")
        .its("headers")
        .its("content-type")
        .should("include", "application/json")
    })

    it("should have valid fields", () => {
        cy.get("@request")
        .its("body")
        .its("name")
        .should("eq", name)
    })
})
