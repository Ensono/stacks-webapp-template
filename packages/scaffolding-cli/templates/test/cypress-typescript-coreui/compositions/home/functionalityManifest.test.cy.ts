/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/

describe("Page", () => {
    const csrUrl = "https://csr-app.nonprod.amidostacks.com"
    const name = "Amido Stacks"

    beforeEach(() => {
        cy.request({url: `${csrUrl}/manifest.json`, failOnStatusCode: true}).as("request")
    })

    it("manifest file should exist", () => {
        cy.get("@request")
        .its("headers")
        .its("content-type")
        .should("include", "application/json")
    })

    it("manifest should have valid fields", () => {
        cy.get("@request")
        .its("body")
        .its("name")
        .should("eq", name)
    })
})
