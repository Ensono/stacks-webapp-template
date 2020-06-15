/// <reference types="cypress" />

/**
 * @type {Cypress.PluginConfig}
 **/

describe("Page robots.txt", () => {
    beforeEach(() => {
        cy.request({url: `${Cypress.config().baseUrl}/robots.txt`, failOnStatusCode: true}).as("request")
    })

    it("file should exist", () => {
        cy.get("@request")
        .its("headers")
        .its("content-type")
        .should("include", "text/plain")
    })
})
